import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { bookingDetailsPath } from '@/paths';
import { Booking, Payment, Property } from '@prisma/client';
import { format } from 'date-fns';
import { CreditCard, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type PaymentWithRelations = Payment & {
  booking: Booking & {
    property: Property;
  };
};

interface TenantPaymentHistoryProps {
  payments: PaymentWithRelations[];
}

export function TenantPaymentHistory({ payments }: TenantPaymentHistoryProps) {
  const totalPaid = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CreditCard className='h-5 w-5' />
          Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            No payments recorded yet.
          </p>
        ) : (
          <div className='space-y-6'>
            {/* Summary */}
            <div className='rounded-lg border bg-muted/50 p-4'>
              <div className='text-center'>
                <p className='text-xs text-muted-foreground'>
                  Total Lifetime Payments
                </p>
                <p className='text-2xl font-bold text-green-600'>
                  {formatCurrency(totalPaid)}
                </p>
              </div>
            </div>

            {/* Payment List */}
            <div className='space-y-4'>
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className='flex flex-col gap-2 rounded-lg border p-3 text-sm sm:flex-row sm:items-center sm:justify-between'
                >
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold'>
                        {formatCurrency(Number(payment.amount))}
                      </span>
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
                        className='text-[10px]'
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground'>
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
                  </div>

                  <div className='flex flex-col gap-1 text-xs text-muted-foreground sm:items-end'>
                    <div className='flex items-center gap-1'>
                      For booking:
                      <Link
                        href={bookingDetailsPath(payment.bookingId)}
                        className='flex items-center gap-1 font-medium text-foreground hover:underline'
                      >
                        {payment.booking.property.name}
                        <ExternalLink className='h-3 w-3' />
                      </Link>
                    </div>
                    {payment.reference && (
                      <span className='font-mono'>
                        Ref: {payment.reference}
                      </span>
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
