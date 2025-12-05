import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Booking, Payment } from '@prisma/client';
import { format } from 'date-fns';
import { CreditCard } from 'lucide-react';

interface BookingPaymentHistoryProps {
  booking: Booking & {
    payments: Payment[];
  };
}

export function BookingPaymentHistory({ booking }: BookingPaymentHistoryProps) {
  const totalPaid = booking.payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );
  const balance = Number(booking.totalPrice) - totalPaid;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CreditCard className='h-5 w-5' />
          Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {booking.payments.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            No payments recorded yet.
          </p>
        ) : (
          <div className='space-y-4'>
            {/* Payment Summary */}
            <div className='rounded-lg border bg-muted/50 p-4'>
              <div className='grid grid-cols-3 gap-4 text-center'>
                <div>
                  <p className='text-xs text-muted-foreground'>Total Price</p>
                  <p className='text-lg font-semibold'>
                    {formatCurrency(Number(booking.totalPrice))}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-muted-foreground'>Total Paid</p>
                  <p className='text-lg font-semibold text-green-600'>
                    {formatCurrency(totalPaid)}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-muted-foreground'>Balance</p>
                  <p
                    className={`text-lg font-semibold ${
                      balance > 0 ? 'text-orange-600' : 'text-green-600'
                    }`}
                  >
                    {formatCurrency(balance)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment List */}
            <div className='space-y-3'>
              {booking.payments.map((payment) => (
                <div
                  key={payment.id}
                  className='flex items-center justify-between border-b pb-3 last:border-0 last:pb-0'
                >
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>
                        {formatCurrency(Number(payment.amount))}
                      </p>
                      <Badge
                        variant={
                          payment.status === 'COMPLETED'
                            ? 'default'
                            : payment.status === 'FAILED'
                            ? 'destructive'
                            : payment.status === 'REFUNDED'
                            ? 'secondary'
                            : 'outline'
                        }
                        className='text-xs'
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                      <span>
                        {format(new Date(payment.date), 'MMM d, yyyy')}
                      </span>
                      <span>•</span>
                      <span className='capitalize'>
                        {payment.method.replace('_', ' ').toLowerCase()}
                      </span>
                      <span>•</span>
                      <span className='capitalize'>
                        {payment.type.toLowerCase()}
                      </span>
                    </div>
                    {payment.reference && (
                      <p className='text-xs text-muted-foreground font-mono'>
                        Ref: {payment.reference}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
