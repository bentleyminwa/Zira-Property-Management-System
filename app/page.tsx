import { PropertyStatusChart } from '@/components/dashboard/PropertyStatusChart';
import { RecentBookings } from '@/components/dashboard/RecentBookings';
import { RecentPayments } from '@/components/dashboard/RecentPayments';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { KPICard } from '@/components/ui/KPICard';
import { PageHeader } from '@/components/ui/PageHeader';
import prisma from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import {
  Activity,
  CalendarDays,
  CreditCard,
  DollarSign,
  Home,
  Users,
  Wrench,
} from 'lucide-react';

export default async function Dashboard() {
  // Fetch data in parallel
  const [
    properties,
    bookings,
    maintenance,
    payments,
    recentBookings,
    recentPayments,
  ] = await Promise.all([
    prisma.property.findMany(),
    prisma.booking.findMany(),
    prisma.maintenance.findMany(),
    prisma.payment.findMany(),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { property: true, tenant: true },
    }),
    prisma.payment.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: { tenant: true },
    }),
  ]);

  // Calculate KPIs
  const totalRevenue = payments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalProperties = properties.length;
  const rentedProperties = properties.filter(
    (p) => p.status === 'RENTED'
  ).length;
  const occupancyRate =
    totalProperties > 0 ? (rentedProperties / totalProperties) * 100 : 0;

  const activeBookings = bookings.filter(
    (b) => b.status === 'CONFIRMED'
  ).length;

  const openMaintenance = maintenance.filter((m) =>
    ['OPEN', 'IN_PROGRESS'].includes(m.status)
  ).length;

  // Prepare Chart Data
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
    <div className='p-6 space-y-6'>
      <PageHeader
        title='Dashboard'
        description='Overview of your property management system.'
      />

      {/* KPIs */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <KPICard
          title='Total Revenue'
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          description='Total earnings'
        />
        <KPICard
          title='Occupancy Rate'
          value={`${occupancyRate.toFixed(1)}%`}
          icon={Home}
          description={`${rentedProperties} of ${totalProperties} properties rented`}
        />
        <KPICard
          title='Active Bookings'
          value={activeBookings}
          icon={CalendarDays}
          description='Confirmed bookings'
        />
        <KPICard
          title='Open Maintenance'
          value={openMaintenance}
          icon={Wrench}
          description='Active requests'
        />
      </div>

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <RevenueChart data={revenueByMonth} />
        <PropertyStatusChart data={propertyStatusData} />
      </div>

      {/* Recent Activity */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <RecentBookings bookings={recentBookings} />
        <div className='col-span-4 lg:col-span-4'>
          <RecentPayments payments={recentPayments} />
        </div>
      </div>
    </div>
  );
}
