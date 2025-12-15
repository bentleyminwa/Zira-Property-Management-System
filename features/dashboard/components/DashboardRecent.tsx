import { RecentBookings } from '@/features/dashboard/components/RecentBookings';
import { RecentPayments } from '@/features/dashboard/components/RecentPayments';
import { prisma } from '@/lib/prisma';

export async function DashboardRecent() {
  const [recentBookings, recentPayments] = await Promise.all([
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

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <RecentBookings bookings={recentBookings} />
      <div className='col-span-4 lg:col-span-4'>
        <RecentPayments payments={recentPayments} />
      </div>
    </div>
  );
}
