import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Payment } from '@prisma/client';
import { format } from 'date-fns';
import { Receipt } from 'lucide-react';

interface PaymentInfoProps {
  payment: Payment;
}

export function PaymentInfo({ payment }: PaymentInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Receipt className='h-5 w-5' />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex flex-col items-center justify-center space-y-2 rounded-lg border bg-muted/20 py-8'>
          <p className='text-sm text-muted-foreground'>Total Amount</p>
          <p className='text-4xl font-bold tracking-tight text-green-600'>
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
            className='mt-2'
          >
            {payment.status}
          </Badge>
        </div>

        <div className='grid gap-4 rounded-lg border p-4 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Payment Date</span>
            <span className='font-medium'>
              {format(new Date(payment.date), 'MMMM d, yyyy h:mm a')}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Payment Method</span>
            <span className='font-medium capitalize'>
              {payment.method.replace('_', ' ').toLowerCase()}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Payment Type</span>
            <span className='font-medium capitalize'>
              {payment.type.toLowerCase()}
            </span>
          </div>
          {payment.reference && (
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Reference No.</span>
              <span className='font-mono font-medium'>{payment.reference}</span>
            </div>
          )}
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Transaction ID</span>
            <span className='font-mono text-xs text-muted-foreground'>
              {payment.id}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
