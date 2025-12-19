import {
  ChartSkeleton,
  KPISkeleton,
  RecentActivitySkeleton,
} from '@/components/skeletons';
import { PageHeader } from '@/components/ui/PageHeader';
import { DashboardCharts } from '@/features/dashboard/components/DashboardCharts';
import { DashboardRecent } from '@/features/dashboard/components/DashboardRecent';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div className='p-6 space-y-6'>
      <PageHeader
        title='Dashboard'
        description='Overview of your property management system.'
      />

      {/* KPIs */}
      <Suspense fallback={<KPISkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Charts */}
      <Suspense fallback={<ChartSkeleton />}>
        <DashboardCharts />
      </Suspense>

      {/* Recent Activity */}
      <Suspense fallback={<RecentActivitySkeleton />}>
        <DashboardRecent />
      </Suspense>
    </div>
  );
}
