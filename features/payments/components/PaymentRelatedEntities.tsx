import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  bookingDetailsPath,
  propertyDetailsPath,
  tenantDetailsPath,
} from '@/paths';
import { Booking, Property, Tenant } from '@prisma/client';
import { format } from 'date-fns';
import { Building2, ExternalLink, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PaymentRelatedEntitiesProps {
  tenant: Tenant;
  booking: Booking & {
    property: Property;
  };
}

export function PaymentRelatedEntities({
  tenant,
  booking,
}: PaymentRelatedEntitiesProps) {
  return (
    <div className='space-y-6'>
      {/* Payer / Tenant */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            Billed To
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <Avatar className='h-12 w-12'>
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${tenant.firstName}+${tenant.lastName}&background=random`}
              />
              <AvatarFallback>
                {tenant.firstName[0]}
                {tenant.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <Link
                href={tenantDetailsPath(tenant.id)}
                className='font-semibold hover:underline flex items-center gap-1'
              >
                {tenant.firstName} {tenant.lastName}
                <ExternalLink className='h-3 w-3 text-muted-foreground' />
              </Link>
              <span className='text-sm text-muted-foreground'>
                {tenant.email}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Context */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Building2 className='h-5 w-5' />
            For Booking
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-3'>
            {booking.property.image ? (
              <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-md border'>
                <Image
                  src={booking.property.image}
                  alt={booking.property.name}
                  fill
                  className='object-cover'
                />
              </div>
            ) : (
              <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-md border bg-muted'>
                <Building2 className='h-6 w-6 text-muted-foreground' />
              </div>
            )}

            <div className='flex flex-col justify-center text-sm'>
              <Link
                href={propertyDetailsPath(booking.property.id)}
                className='font-medium hover:underline'
              >
                {booking.property.name}
              </Link>
              <Link
                href={bookingDetailsPath(booking.id)}
                className='text-muted-foreground hover:text-primary flex items-center gap-1 text-xs mt-1'
              >
                View Booking #{booking.id.slice(-6)}
                <ExternalLink className='h-3 w-3' />
              </Link>
            </div>
          </div>

          <div className='rounded-md bg-muted/30 p-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Dates</span>
              <span className='font-medium'>
                {format(new Date(booking.startDate), 'MMM d')} -{' '}
                {format(new Date(booking.endDate), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
