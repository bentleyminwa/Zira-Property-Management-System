import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Booking } from '@prisma/client';
import { differenceInDays, format } from 'date-fns';
import { Calendar, DollarSign, FileText } from 'lucide-react';

interface BookingKeyInfoProps {
  booking: Booking;
}

export function BookingKeyInfo({ booking }: BookingKeyInfoProps) {
  const duration = differenceInDays(
    new Date(booking.endDate),
    new Date(booking.startDate)
  );

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
          <Calendar className='mb-2 h-6 w-6 text-muted-foreground' />
          <span className='text-sm font-medium text-muted-foreground'>
            Check-in
          </span>
          <span className='font-semibold'>
            {format(new Date(booking.startDate), 'MMM d, yyyy')}
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
          <Calendar className='mb-2 h-6 w-6 text-muted-foreground' />
          <span className='text-sm font-medium text-muted-foreground'>
            Check-out
          </span>
          <span className='font-semibold'>
            {format(new Date(booking.endDate), 'MMM d, yyyy')}
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
          <FileText className='mb-2 h-6 w-6 text-muted-foreground' />
          <span className='text-sm font-medium text-muted-foreground'>
            Duration
          </span>
          <span className='font-semibold'>{duration} days</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
          <DollarSign className='mb-2 h-6 w-6 text-muted-foreground' />
          <span className='text-sm font-medium text-muted-foreground'>
            Total Price
          </span>
          <span className='font-semibold'>
            {formatCurrency(Number(booking.totalPrice))}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
