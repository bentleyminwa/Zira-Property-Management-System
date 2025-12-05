'use client';

import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { Booking, Payment, Property, Tenant } from '@prisma/client';
import { useEffect } from 'react';
import { BookingHeader } from './BookingHeader';
import { BookingKeyInfo } from './BookingKeyInfo';
import { BookingPaymentHistory } from './BookingPaymentHistory';
import { BookingPropertyCard } from './BookingPropertyCard';
import { BookingQuickActions } from './BookingQuickActions';
import { BookingSummary } from './BookingSummary';
import { BookingTenantCard } from './BookingTenantCard';

interface BookingDetailsProps {
  booking: Booking & {
    property: Property;
    tenant: Tenant;
    payments: Payment[];
  };
}

export function BookingDetails({ booking }: BookingDetailsProps) {
  const { setBreadcrumbOverride, clearBreadcrumbOverride } = useBreadcrumb();

  // Set breadcrumb override
  useEffect(() => {
    setBreadcrumbOverride(booking.id, `Booking #${booking.id.slice(-6)}`);

    return () => {
      clearBreadcrumbOverride(booking.id);
    };
  }, [booking.id, setBreadcrumbOverride, clearBreadcrumbOverride]);

  return (
    <div className='space-y-6'>
      <BookingHeader booking={booking} />

      <BookingKeyInfo booking={booking} />

      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          <BookingPropertyCard property={booking.property} />
          <BookingTenantCard tenant={booking.tenant} />
          <BookingPaymentHistory booking={booking} />
        </div>

        <div className='space-y-6'>
          <BookingQuickActions />
          <BookingSummary booking={booking} />
        </div>
      </div>
    </div>
  );
}
