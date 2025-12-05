import { PaymentTable } from '@/features/payments/components/PaymentTable';
import prisma from '@/lib/prisma';
import {
  PaymentMethod,
  PaymentStatus,
  PaymentType,
  Prisma,
} from '@prisma/client';

interface PaymentListProps {
  query?: string;
  status?: string;
  method?: string;
  type?: string;
  sort?: string;
}

export async function PaymentList({
  query,
  status,
  method,
  type,
  sort,
}: PaymentListProps) {
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

  return <PaymentTable payments={payments} />;
}
