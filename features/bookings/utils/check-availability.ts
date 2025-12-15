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
              // Case 1: New booking overlaps with start of existing
              startDate: { lte: endDate },
              endDate: { gte: startDate },
            },
            // Note: The above condition is sufficient to catch all overlaps (Wait, let's verify)
            // A overlaps B if (A.start < B.end) AND (B.start < A.end)
            // My condition: Start <= B.End AND End >= B.Start
            // Simplified: (NewStart <= ExistingEnd) AND (NewEnd >= ExistingStart)
            // This covers:
            // 1. New inside Existing
            // 2. Existing inside New
            // 3. Partial overlap start
            // 4. Partial overlap end
            // 5. Exact match
          ],
        },
      ],
      // Exclude the current booking if updating
      ...(excludeBookingId ? { NOT: { id: excludeBookingId } } : {}),
    },
  });

  return overlappingBookings.length === 0;
}
