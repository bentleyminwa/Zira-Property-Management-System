import { TableSkeleton } from '@/components/skeletons';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { MaintenanceList } from '@/features/maintenance/components/MaintenanceList';
import { Suspense } from 'react';

interface MaintenanceProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    priority?: string;
    sort?: string;
  }>;
}

export default async function Maintenance({ searchParams }: MaintenanceProps) {
  const params = await searchParams;
  const query = params.query;
  const status = params.status;
  const priority = params.priority;
  const sort = params.sort;

  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Resolved', value: 'RESOLVED' },
        { label: 'Closed', value: 'CLOSED' },
      ],
    },
    {
      key: 'priority',
      label: 'Priority',
      options: [
        { label: 'Low', value: 'LOW' },
        { label: 'Medium', value: 'MEDIUM' },
        { label: 'High', value: 'HIGH' },
      ],
    },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Priority: High to Low', value: 'priority_high' },
  ];

  return (
    <div className='p-6 space-y-6'>
      <PageHeader
        title='Maintenance'
        description='Track and manage property maintenance requests.'
      />

      <DataTableToolbar
        searchPlaceholder='Search requests...'
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />

      <Suspense fallback={<TableSkeleton />}>
        <MaintenanceList
          query={query}
          status={status}
          priority={priority}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}
