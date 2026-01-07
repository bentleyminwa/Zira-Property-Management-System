import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';

export async function checkAvailability(
  propertyId: string,
  startDate: Date,
  endDate: Date,
  excludeBookingId?: string
): Promise<boolean> {
  const overlappingBookings = await prisma.booking.findMany({
    where: {
      propertyId,
      AND: [
        {
          status: {
            in: [
              BookingStatus.PENDING,
              BookingStatus.CONFIRMED,
              BookingStatus.ACTIVE,
            ],
          },
        },
        {
          OR: [
            {
              startDate: { lte: endDate },
              endDate: { gte: startDate },
            },
          ],
        },
      ],
      ...(excludeBookingId ? { NOT: { id: excludeBookingId } } : {}),
    },
  });

  return overlappingBookings.length === 0;
}
