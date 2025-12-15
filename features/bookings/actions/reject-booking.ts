'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Rejects a booking -> sets status to CANCELLED with notes
 */
export async function rejectBooking(bookingId: string, reason?: string) {
  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        notes: reason,
      },
    });

    revalidatePath('/bookings');
    revalidatePath(`/bookings/${bookingId}`);
    return { success: true, data: booking };
  } catch (error) {
    console.error('Failed to reject booking:', error);
    return { success: false, message: 'Failed to reject booking' };
  }
}
