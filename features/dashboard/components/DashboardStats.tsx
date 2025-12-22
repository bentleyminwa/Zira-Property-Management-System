import { KPICard } from '@/components/ui/KPICard';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { CalendarDays, DollarSign, Home, Wrench } from 'lucide-react';

interface KPIStat {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
}

export async function DashboardStats() {
  const [properties, bookings, maintenance, payments] = await Promise.all([
    prisma.property.findMany(),
    prisma.booking.findMany(),
    prisma.maintenance.findMany(),
    prisma.payment.findMany(),
  ]);

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

  const stats: KPIStat[] = [
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      description: 'Total earnings',
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate.toFixed(1)}%`,
      icon: Home,
      description: `${rentedProperties} of ${totalProperties} properties rented`,
    },
    {
      title: 'Active Bookings',
      value: activeBookings,
      icon: CalendarDays,
      description: 'Confirmed bookings',
    },
    {
      title: 'Open Maintenance',
      value: openMaintenance,
      icon: Wrench,
      description: 'Active requests',
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => (
        <KPICard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  );
}
