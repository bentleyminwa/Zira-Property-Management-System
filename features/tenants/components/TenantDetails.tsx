import { BookingTable } from '@/features/bookings/components/BookingTable';
import { TenantInfo } from '@/features/tenants/components/TenantInfo';
import { TenantPaymentHistory } from '@/features/tenants/components/TenantPaymentHistory';
import { Booking, Payment, Property, Tenant } from '@prisma/client';
import { CalendarDays } from 'lucide-react';

type TenantWithRelations = Tenant & {
  bookings: (Booking & {
    property: Property;
    tenant: Tenant;
  })[];
  payments: (Payment & {
    booking: Booking & {
      property: Property;
    };
  })[];
};

interface TenantDetailsProps {
  tenant: TenantWithRelations;
}

export function TenantDetails({ tenant }: TenantDetailsProps) {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Tenant Details</h1>
      </div>

      <div className='grid gap-8 md:grid-cols-[350px_1fr]'>
        <div className='space-y-8'>
          <TenantInfo tenant={tenant} />
        </div>

        <div className='space-y-8'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <CalendarDays className='h-5 w-5 text-muted-foreground' />
              <h2 className='text-xl font-semibold'>Booking History</h2>
            </div>
            {tenant.bookings.length > 0 ? (
              <BookingTable bookings={tenant.bookings} />
            ) : (
              <p className='text-sm text-muted-foreground'>
                No bookings found for this tenant.
              </p>
            )}
          </div>

          <div className='space-y-4'>
            <TenantPaymentHistory payments={tenant.payments} />
          </div>
        </div>
      </div>
    </div>
  );
}
