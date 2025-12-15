import { BookingTable } from '@/features/bookings/components/BookingTable';
import prisma from '@/lib/prisma';
import { serializeDecimal } from '@/lib/utils';
import { BookingStatus, Prisma } from '@prisma/client';

interface BookingListProps {
  query?: string;
  status?: string;
  sort?: string;
}

export async function BookingList({ query, status, sort }: BookingListProps) {
  // Build where clause
  const where: Prisma.BookingWhereInput = {
    AND: [
      query
        ? {
            OR: [
              {
                tenant: {
                  OR: [
                    { firstName: { contains: query, mode: 'insensitive' } },
                    { lastName: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                  ],
                },
              },
              {
                property: {
                  name: { contains: query, mode: 'insensitive' },
                },
              },
            ],
          }
        : {},
      status && status !== 'ALL' ? { status: status as BookingStatus } : {},
    ],
  };

  // Build orderBy clause
  let orderBy: Prisma.BookingOrderByWithRelationInput = { createdAt: 'desc' };
  if (sort === 'price_asc') orderBy = { totalPrice: 'asc' };
  if (sort === 'price_desc') orderBy = { totalPrice: 'desc' };

  const bookings = await prisma.booking.findMany({
    where,
    orderBy,
    include: {
      property: true,
      tenant: true,
    },
  });

  return <BookingTable bookings={serializeDecimal(bookings)} />;
}
