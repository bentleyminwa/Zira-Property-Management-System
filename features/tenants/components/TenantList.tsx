import { TenantTable } from '@/features/tenants/components/TenantTable';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface TenantListProps {
  query?: string;
  sort?: string;
}

export async function TenantList({ query, sort }: TenantListProps) {
  // Build where clause
  const where: Prisma.TenantWhereInput = query
    ? {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {};

  // Build orderBy clause
  let orderBy: Prisma.TenantOrderByWithRelationInput = { createdAt: 'desc' };
  if (sort === 'oldest') orderBy = { createdAt: 'asc' };
  if (sort === 'name_asc') orderBy = { firstName: 'asc' };
  if (sort === 'name_desc') orderBy = { firstName: 'desc' };

  const tenants = await prisma.tenant.findMany({
    where,
    orderBy,
  });

  return <TenantTable tenants={tenants} />;
}
