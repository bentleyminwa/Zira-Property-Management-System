'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { checkAvailability } from '../lib/utils';

/**
 * Creates a new booking with PENDING status
 */
export async function createBooking(data: {
  propertyId: string;
  tenantId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}) {
  const { propertyId, tenantId, startDate, endDate, totalPrice } = data;

  // Double check availability before creating
  const isAvailable = await checkAvailability(propertyId, startDate, endDate);
  if (!isAvailable) {
    return {
      success: false,
      message: 'Property is not available for selected dates',
    };
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        propertyId,
        tenantId,
        startDate,
        endDate,
        totalPrice,
        status: 'PENDING',
      },
    });

    revalidatePath('/bookings');
    return { success: true, data: booking };
  } catch (error) {
    console.error('Failed to create booking:', error);
    return { success: false, message: 'Failed to create booking' };
  }
}
