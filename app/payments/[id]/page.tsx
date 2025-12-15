import { PaymentDetails } from '@/features/payments/components/PaymentDetails';
import prisma from '@/lib/prisma';
import { serializeDecimal } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface PaymentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaymentPage(props: PaymentPageProps) {
  const params = await props.params;
  const payment = await prisma.payment.findUnique({
    where: {
      id: params.id,
    },
    include: {
      booking: {
        include: {
          property: true,
        },
      },
      tenant: true,
    },
  });

  if (!payment) {
    notFound();
  }

  return <PaymentDetails payment={serializeDecimal(payment)} />;
}
