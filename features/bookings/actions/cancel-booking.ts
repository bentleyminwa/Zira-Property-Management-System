'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function cancelBooking(id: string) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });

    revalidatePath('/bookings');
    revalidatePath(`/bookings/${id}`);
    revalidatePath(`/properties/${booking.propertyId}`);

    return { success: true, data: booking };
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    return { success: false, message: 'Failed to cancel booking' };
  }
}
