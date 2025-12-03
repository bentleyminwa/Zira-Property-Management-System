import { BookingTable } from '@/components/bookings/BookingTable';
import { BookingToolbar } from '@/components/bookings/BookingToolbar';
import prisma from '@/lib/prisma';
import { BookingStatus, Prisma } from '@prisma/client';

interface BookingsProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    sort?: string;
  }>;
}

export default async function Bookings({ searchParams }: BookingsProps) {
  const params = await searchParams;
  const query = params.query;
  const status = params.status;
  const sort = params.sort;

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

  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Bookings</h1>
        <p className='text-muted-foreground'>
          Manage bookings, view details, and track status.
        </p>
      </div>

      <BookingToolbar />

      <BookingTable bookings={bookings} />
    </div>
  );
}
