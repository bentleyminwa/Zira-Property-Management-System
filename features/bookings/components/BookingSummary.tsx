import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Booking, Payment } from '@prisma/client';
import { differenceInDays } from 'date-fns';

interface BookingSummaryProps {
  booking: Booking & {
    payments: Payment[];
  };
}

export function BookingSummary({ booking }: BookingSummaryProps) {
  const duration = differenceInDays(
    new Date(booking.endDate),
    new Date(booking.startDate)
  );
  const totalPaid = booking.payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );
  const balance = Number(booking.totalPrice) - totalPaid;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Status</span>
          <span className='font-medium'>{booking.status}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Duration</span>
          <span className='font-medium'>{duration} days</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Total Price</span>
          <span className='font-medium'>
            {formatCurrency(Number(booking.totalPrice))}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Amount Paid</span>
          <span className='font-medium text-green-600'>
            {formatCurrency(totalPaid)}
          </span>
        </div>
        <div className='flex justify-between border-t pt-3'>
          <span className='font-medium'>Balance Due</span>
          <span
            className={`font-semibold ${
              balance > 0 ? 'text-orange-600' : 'text-green-600'
            }`}
          >
            {formatCurrency(balance)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
