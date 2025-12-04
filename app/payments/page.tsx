import { PaymentTable } from '@/components/payments/PaymentTable';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { KPICard } from '@/components/ui/KPICard';
import { PageHeader } from '@/components/ui/PageHeader';
import prisma from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import {
  PaymentMethod,
  PaymentStatus,
  PaymentType,
  Prisma,
} from '@prisma/client';
import { Clock, DollarSign, TrendingUp, XCircle } from 'lucide-react';

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

  // Build where clause
  const where: Prisma.PaymentWhereInput = {
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
                reference: { contains: query, mode: 'insensitive' },
              },
            ],
          }
        : {},
      status && status !== 'ALL' ? { status: status as PaymentStatus } : {},
      method && method !== 'ALL' ? { method: method as PaymentMethod } : {},
      type && type !== 'ALL' ? { type: type as PaymentType } : {},
    ],
  };

  // Build orderBy clause
  let orderBy: Prisma.PaymentOrderByWithRelationInput = { date: 'desc' };
  if (sort === 'oldest') orderBy = { date: 'asc' };
  if (sort === 'amount_asc') orderBy = { amount: 'asc' };
  if (sort === 'amount_desc') orderBy = { amount: 'desc' };

  const payments = await prisma.payment.findMany({
    where,
    orderBy,
    include: {
      booking: {
        include: {
          property: true,
        },
      },
      tenant: true,
    },
  });

  // Calculate KPIs
  const allPayments = await prisma.payment.findMany();

  const totalRevenue = allPayments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingPayments = allPayments
    .filter((p) => p.status === 'PENDING')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const failedPaymentsCount = allPayments.filter(
    (p) => p.status === 'FAILED'
  ).length;

  const completedCount = allPayments.filter(
    (p) => p.status === 'COMPLETED'
  ).length;
  const totalCount = allPayments.length;
  const successRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <KPICard
          title='Total Revenue'
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          description='From completed payments'
        />
        <KPICard
          title='Pending Payments'
          value={formatCurrency(pendingPayments)}
          icon={Clock}
          description='Awaiting confirmation'
        />
        <KPICard
          title='Failed Payments'
          value={failedPaymentsCount}
          icon={XCircle}
          description='Unsuccessful transactions'
        />
        <KPICard
          title='Success Rate'
          value={`${successRate.toFixed(1)}%`}
          icon={TrendingUp}
          description={`${completedCount} of ${totalCount} payments`}
        />
      </div>

      <DataTableToolbar
        searchPlaceholder='Search payments...'
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />

      <PaymentTable payments={payments} />
    </div>
  );
}
