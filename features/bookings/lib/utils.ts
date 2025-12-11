'use server';

import prisma from '@/lib/prisma';

/**
 * Checks if a property is available for a given date range
 */
export async function checkAvailability(
  propertyId: string,
  startDate: Date,
  endDate: Date
) {
  const overlappingBookings = await prisma.booking.findMany({
    where: {
      propertyId,
      status: 'CONFIRMED',
      OR: [
        {
          startDate: {
            lte: endDate,
          },
          endDate: {
            gte: startDate,
          },
        },
      ],
    },
  });

  return overlappingBookings.length === 0;
}
