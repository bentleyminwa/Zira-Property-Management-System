import { TableSkeleton } from '@/components/skeletons';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { BookingList } from '@/features/bookings/components/BookingList';
import { Suspense } from 'react';

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

      <Suspense fallback={<TableSkeleton />}>
        <BookingList query={query} status={status} sort={sort} />
      </Suspense>
    </div>
  );
}
