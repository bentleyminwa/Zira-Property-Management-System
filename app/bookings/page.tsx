import { BookingTable } from '@/components/bookings/BookingTable';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
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

  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Confirmed', value: 'CONFIRMED' },
        { label: 'Cancelled', value: 'CANCELLED' },
        { label: 'Completed', value: 'COMPLETED' },
      ],
    },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

  return (
    <div className='p-6 space-y-6'>
      <PageHeader
        title='Bookings'
        description='Manage bookings, view details, and track status.'
      />

      <DataTableToolbar
        searchPlaceholder='Search bookings...'
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />

      <BookingTable bookings={bookings} />
    </div>
  );
}
