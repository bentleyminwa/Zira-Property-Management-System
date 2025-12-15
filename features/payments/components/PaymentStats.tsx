import { KPICard } from '@/components/ui/KPICard';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { Clock, DollarSign, TrendingUp, XCircle } from 'lucide-react';

export async function PaymentStats() {
  const allPayments = await prisma.payment.findMany();

  const totalRevenue = allPayments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingPayments = allPayments
    .filter((p) => p.status === 'PENDING')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const failedPaymentsCount = allPayments.filter(
    (p) => p.status === 'FAILED'
  ).length;

  const completedCount = allPayments.filter(
    (p) => p.status === 'COMPLETED'
  ).length;
  const totalCount = allPayments.length;
  const successRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <KPICard
        title='Total Revenue'
        value={formatCurrency(totalRevenue)}
        icon={DollarSign}
        description='From completed payments'
      />
      <KPICard
        title='Pending Payments'
        value={formatCurrency(pendingPayments)}
        icon={Clock}
        description='Awaiting confirmation'
      />
      <KPICard
        title='Failed Payments'
        value={failedPaymentsCount}
        icon={XCircle}
        description='Unsuccessful transactions'
      />
      <KPICard
        title='Success Rate'
        value={`${successRate.toFixed(1)}%`}
        icon={TrendingUp}
        description={`${completedCount} of ${totalCount} payments`}
      />
    </div>
  );
}
