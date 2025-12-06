'use client';

import { Button } from '@/components/ui/button';
import { PaymentInfo } from '@/features/payments/components/PaymentInfo';
import { PaymentRelatedEntities } from '@/features/payments/components/PaymentRelatedEntities';
import { Booking, Payment, Property, Tenant } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type PaymentWithRelations = Payment & {
  booking: Booking & {
    property: Property;
  };
  tenant: Tenant;
};

interface PaymentDetailsProps {
  payment: PaymentWithRelations;
}

export function PaymentDetails({ payment }: PaymentDetailsProps) {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <Button
          variant='ghost'
          className='gap-2 pl-0 hover:bg-transparent hover:text-primary mb-4'
          onClick={() => router.back()}
        >
          <ArrowLeft className='h-4 w-4' />
          Back
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Payment Details</h1>
      </div>

      <div className='grid gap-8 md:grid-cols-[1fr_350px]'>
        <div className='space-y-8'>
          <PaymentInfo payment={payment} />
        </div>

        <div className='space-y-8'>
          <PaymentRelatedEntities
            tenant={payment.tenant}
            booking={payment.booking}
          />
        </div>
      </div>
    </div>
  );
}
