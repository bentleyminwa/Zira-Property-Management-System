'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Completes a booking -> sets status to COMPLETED with notes
 */
export async function completeBooking(bookingId: string, notes?: string) {
  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'COMPLETED',
        notes: notes,
      },
    });

    revalidatePath('/bookings');
    revalidatePath(`/bookings/${bookingId}`);
    return { success: true, data: booking };
  } catch (error) {
    console.error('Failed to complete booking:', error);
    return { success: false, message: 'Failed to complete booking' };
  }
}
