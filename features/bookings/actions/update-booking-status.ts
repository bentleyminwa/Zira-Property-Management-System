'use server';

import { prisma } from '@/lib/prisma';
import { BookingStatus, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export type UpdateBookingStatusState = {
  message?: string;
  error?: string;
};

export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  prevState?: UpdateBookingStatusState,
  additionalData?: {
    moveInDate?: Date;
    moveOutDate?: Date;
    terminatedAt?: Date;
  } // Optional payload for transitions
): Promise<UpdateBookingStatusState> {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { error: 'Booking not found' };
    }

    // State Machine Validation
    // PENDING -> CONFIRMED | CANCELLED
    // CONFIRMED -> ACTIVE | CANCELLED
    // ACTIVE -> COMPLETED | TERMINATED
    // CANCELLED -> (Make terminal for now)
    // COMPLETED -> (Make terminal)
    // TERMINATED -> (Make terminal)

    switch (newStatus) {
      case BookingStatus.CONFIRMED:
        if (booking.status !== BookingStatus.PENDING) {
          return { error: 'Only PENDING bookings can be confirmed.' };
        }
        break;
      case BookingStatus.ACTIVE:
        if (booking.status !== BookingStatus.CONFIRMED) {
          return { error: 'Only CONFIRMED bookings can be activated.' };
        }
        if (!additionalData?.moveInDate) {
          // Default to now if not provided, or strict check? Let's use provided or now.
        }
        break;
      case BookingStatus.COMPLETED:
        if (booking.status !== BookingStatus.ACTIVE) {
          return { error: 'Only ACTIVE bookings can be completed.' };
        }
        break;
      case BookingStatus.TERMINATED:
        if (booking.status !== BookingStatus.ACTIVE) {
          return { error: 'Only ACTIVE bookings can be terminated.' };
        }
        break;
      case BookingStatus.CANCELLED:
        if (
          !(
            [BookingStatus.PENDING, BookingStatus.CONFIRMED] as BookingStatus[]
          ).includes(booking.status)
        ) {
          return {
            error: 'Only PENDING or CONFIRMED bookings can be cancelled.',
          };
        }
        break;
      default:
        // PENDING is initial, no transition to it usually.
        return { error: 'Invalid status transition.' };
    }

    // Prepare update data
    const data: Prisma.BookingUpdateInput = { status: newStatus };

    if (newStatus === BookingStatus.ACTIVE) {
      data.moveInDate = additionalData?.moveInDate || new Date();
    } else if (newStatus === BookingStatus.COMPLETED) {
      data.moveOutDate = additionalData?.moveOutDate || new Date();
    } else if (newStatus === BookingStatus.TERMINATED) {
      data.terminatedAt = additionalData?.terminatedAt || new Date();
      data.moveOutDate = additionalData?.moveOutDate || new Date(); // Usually termination implies moving out
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data,
    });

    revalidatePath('/dashboard/bookings');
    revalidatePath(`/dashboard/bookings/${bookingId}`); // If detail page exists
    revalidatePath(`/dashboard/properties/${booking.propertyId}`);

    return { message: 'Booking status updated successfully.' };
  } catch (error) {
    console.error('Update Status Error:', error);
    return { error: 'Failed to update booking status.' };
  }
}
