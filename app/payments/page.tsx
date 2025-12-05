import { PaymentList } from '@/components/payments/PaymentList';
import { PaymentStats } from '@/components/payments/PaymentStats';
import { KPISkeleton, TableSkeleton } from '@/components/skeletons';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { Suspense } from 'react';

interface PaymentsProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    method?: string;
    type?: string;
    sort?: string;
  }>;
}

export default async function Payments({ searchParams }: PaymentsProps) {
  const params = await searchParams;
  const query = params.query;
  const status = params.status;
  const method = params.method;
  const type = params.type;
  const sort = params.sort;

  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Failed', value: 'FAILED' },
        { label: 'Refunded', value: 'REFUNDED' },
      ],
    },
    {
      key: 'method',
      label: 'Method',
      options: [
        { label: 'Cash', value: 'CASH' },
        { label: 'Card', value: 'CARD' },
        { label: 'Bank Transfer', value: 'BANK_TRANSFER' },
      ],
    },
    {
      key: 'type',
      label: 'Type',
      options: [
        { label: 'Rent', value: 'RENT' },
        { label: 'Deposit', value: 'DEPOSIT' },
        { label: 'Fee', value: 'FEE' },
        { label: 'Utility', value: 'UTILITY' },
      ],
    },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Amount: Low to High', value: 'amount_asc' },
    { label: 'Amount: High to Low', value: 'amount_desc' },
  ];

  return (
    <div className='p-6 space-y-6'>
      <PageHeader
        title='Payments'
        description='Track payments, manage transactions, and monitor revenue.'
      />

      {/* KPIs Grid */}
      <Suspense fallback={<KPISkeleton />}>
        <PaymentStats />
      </Suspense>

      <DataTableToolbar
        searchPlaceholder='Search payments...'
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />

      <Suspense fallback={<TableSkeleton />}>
        <PaymentList
          query={query}
          status={status}
          method={method}
          type={type}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}
