import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking, Property, Tenant } from '@prisma/client';
import { format } from 'date-fns';

type BookingWithRelations = Booking & {
  property: Property;
  tenant: Tenant;
};

interface RecentBookingsProps {
  bookings: BookingWithRelations[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <Card className='col-span-4 lg:col-span-3'>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {bookings.map((booking) => (
            <div key={booking.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarFallback>
                  {booking.tenant.firstName[0]}
                  {booking.tenant.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {booking.tenant.firstName} {booking.tenant.lastName}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {booking.property.name}
                </p>
              </div>
              <div className='ml-auto font-medium'>
                <div className='flex flex-col items-end gap-1'>
                  <Badge
                    variant={
                      booking.status === 'CONFIRMED'
                        ? 'default'
                        : booking.status === 'COMPLETED'
                        ? 'secondary'
                        : booking.status === 'CANCELLED'
                        ? 'destructive'
                        : 'outline'
                    }
                    className='text-xs'
                  >
                    {booking.status}
                  </Badge>
                  <span className='text-xs text-muted-foreground'>
                    {format(new Date(booking.startDate), 'MMM d')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
