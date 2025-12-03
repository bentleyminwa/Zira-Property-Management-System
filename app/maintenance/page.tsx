import { MaintenanceTable } from '@/components/maintenance/MaintenanceTable';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import prisma from '@/lib/prisma';
import { MaintenancePriority, MaintenanceStatus, Prisma } from '@prisma/client';

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

  // Build where clause
  const where: Prisma.MaintenanceWhereInput = {
    AND: [
      query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              {
                property: {
                  name: { contains: query, mode: 'insensitive' },
                },
              },
            ],
          }
        : {},
      status && status !== 'ALL' ? { status: status as MaintenanceStatus } : {},
      priority && priority !== 'ALL'
        ? { priority: priority as MaintenancePriority }
        : {},
    ],
  };

  // Build orderBy clause
  let orderBy: Prisma.MaintenanceOrderByWithRelationInput = {
    createdAt: 'desc',
  };
  if (sort === 'oldest') orderBy = { createdAt: 'asc' };
  if (sort === 'priority_high') orderBy = { priority: 'desc' };

  const maintenanceRequests = await prisma.maintenance.findMany({
    where,
    orderBy,
    include: {
      property: true,
    },
  });

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

      <MaintenanceTable maintenanceRequests={maintenanceRequests} />
    </div>
  );
}
