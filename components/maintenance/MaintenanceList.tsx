import { MaintenanceTable } from '@/components/maintenance/MaintenanceTable';
import prisma from '@/lib/prisma';
import { MaintenancePriority, MaintenanceStatus, Prisma } from '@prisma/client';

interface MaintenanceListProps {
  query?: string;
  status?: string;
  priority?: string;
  sort?: string;
}

export async function MaintenanceList({
  query,
  status,
  priority,
  sort,
}: MaintenanceListProps) {
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

  return <MaintenanceTable maintenanceRequests={maintenanceRequests} />;
}
