import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Booking } from '@prisma/client';
import { CalendarDays } from 'lucide-react';

interface PropertyBookingsTabProps {
  bookings: Booking[];
}

export function PropertyBookingsTab({ bookings }: PropertyBookingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CalendarDays className='h-5 w-5' />
          Recent Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className='text-sm text-muted-foreground'>No bookings found.</p>
        ) : (
          <div className='space-y-4'>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
              >
                <div>
                  <p className='font-medium'>
                    {formatDate(booking.startDate)} -{' '}
                    {formatDate(booking.endDate)}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {booking.status}
                  </p>
                </div>
                <div className='font-semibold'>
                  {formatCurrency(Number(booking.totalPrice))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
