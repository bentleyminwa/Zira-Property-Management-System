'use server';

import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { checkAvailability } from '../lib/utils';

export async function updateBooking(
  id: string,
  data: {
    startDate?: Date;
    endDate?: Date;
    totalPrice?: number;
    status?: BookingStatus;
    notes?: string;
  }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return { success: false, message: 'Booking not found' };
    }

    // Check availability if dates are changing
    if (
      (data.startDate &&
        data.startDate.getTime() !== booking.startDate.getTime()) ||
      (data.endDate && data.endDate.getTime() !== booking.endDate.getTime())
    ) {
      const start = data.startDate || booking.startDate;
      const end = data.endDate || booking.endDate;

      const isAvailable = await checkAvailability(
        booking.propertyId,
        start,
        end,
        id
      );

      if (!isAvailable) {
        return {
          success: false,
          message: 'Property is not available for the selected dates',
        };
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        ...data,
        totalPrice: data.totalPrice ? data.totalPrice : undefined, // Ensure not undefined if passed
      },
    });

    revalidatePath('/bookings');
    revalidatePath(`/bookings/${id}`);
    revalidatePath(`/properties/${booking.propertyId}`);

    return { success: true, data: updatedBooking };
  } catch (error) {
    console.error('Failed to update booking:', error);
    return { success: false, message: 'Failed to update booking' };
  }
}
