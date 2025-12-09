'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteProperty(id: string) {
  try {
    // Delete in correct order to handle foreign key constraints
    // 1. Delete payments related to bookings of this property
    await prisma.payment.deleteMany({
      where: {
        booking: {
          propertyId: id,
        },
      },
    });

    // 2. Delete bookings for this property
    await prisma.booking.deleteMany({
      where: {
        propertyId: id,
      },
    });

    // 3. Delete maintenance requests for this property
    await prisma.maintenance.deleteMany({
      where: {
        propertyId: id,
      },
    });

    // 4. Finally delete the property itself
    await prisma.property.delete({
      where: { id },
    });

    // Revalidate the properties list page
    revalidatePath('/properties');

    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    return {
      success: false,
      error: 'Failed to delete property. Please try again.',
    };
  }
}
