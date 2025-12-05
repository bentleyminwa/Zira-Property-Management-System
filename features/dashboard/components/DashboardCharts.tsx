import { PropertyStatusChart } from '@/features/dashboard/components/PropertyStatusChart';
import { RevenueChart } from '@/features/dashboard/components/RevenueChart';
import prisma from '@/lib/prisma';

export async function DashboardCharts() {
  const [properties, payments] = await Promise.all([
    prisma.property.findMany(),
    prisma.payment.findMany(),
  ]);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentYear = new Date().getFullYear();
  const revenueByMonth = months.map((month, index) => {
    const monthlyTotal = payments
      .filter((p) => {
        const date = new Date(p.date);
        return (
          p.status === 'COMPLETED' &&
          date.getMonth() === index &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((sum, p) => sum + Number(p.amount), 0);

    return {
      name: month,
      total: monthlyTotal,
    };
  });

  const propertyStatusData = [
    {
      name: 'Available',
      value: properties.filter((p) => p.status === 'AVAILABLE').length,
      color: '#22c55e', // green-500
    },
    {
      name: 'Rented',
      value: properties.filter((p) => p.status === 'RENTED').length,
      color: '#3b82f6', // blue-500
    },
    {
      name: 'Maintenance',
      value: properties.filter((p) => p.status === 'MAINTENANCE').length,
      color: '#f97316', // orange-500
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <RevenueChart data={revenueByMonth} />
      <PropertyStatusChart data={propertyStatusData} />
    </div>
  );
}
