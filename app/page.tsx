import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { DashboardRecent } from '@/components/dashboard/DashboardRecent';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import {
  ChartSkeleton,
  KPISkeleton,
  RecentActivitySkeleton,
} from '@/components/skeletons';
import { PageHeader } from '@/components/ui/PageHeader';
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
