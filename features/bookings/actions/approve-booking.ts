'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Approves a booking -> sets status to CONFIRMED
 */
export async function approveBooking(bookingId: string) {
  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
    });

    // TODO: Trigger notification or invoice generation here

    revalidatePath('/bookings');
    revalidatePath(`/bookings/${bookingId}`);
    return { success: true, data: booking };
  } catch (error) {
    console.error('Failed to approve booking:', error);
    return { success: false, message: 'Failed to approve booking' };
  }
}
