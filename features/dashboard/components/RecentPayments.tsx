import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Payment, Tenant } from '@prisma/client';

type PaymentWithRelations = Payment & {
  tenant: Tenant;
};

interface RecentPaymentsProps {
  payments: PaymentWithRelations[];
}

export function RecentPayments({ payments }: RecentPaymentsProps) {
  return (
    <Card className='col-span-4'>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {payments.map((payment) => (
            <div key={payment.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarFallback>
                  {payment.tenant.firstName[0]}
                  {payment.tenant.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {payment.tenant.firstName} {payment.tenant.lastName}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {payment.tenant.email}
                </p>
              </div>
              <div className='ml-auto font-medium'>
                <div className='flex flex-col items-end'>
                  <span>+{formatCurrency(Number(payment.amount))}</span>
                  <span className='text-xs text-muted-foreground'>
                    {payment.method}
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
