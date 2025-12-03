import { TenantTable } from '@/components/tenants/TenantTable';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface TenantsProps {
  searchParams: Promise<{
    query?: string;
    sort?: string;
  }>;
}

export default async function Tenants({ searchParams }: TenantsProps) {
  const params = await searchParams;
  const query = params.query;
  const sort = params.sort;

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

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Name: A-Z', value: 'name_asc' },
    { label: 'Name: Z-A', value: 'name_desc' },
  ];

  return (
    <div className='p-6 space-y-6'>
      <PageHeader
        title='Tenants'
        description='Manage your tenants, view contact details, and track history.'
      />

      <DataTableToolbar
        searchPlaceholder='Search tenants...'
        sortOptions={sortOptions}
      />

      <TenantTable tenants={tenants} />
    </div>
  );
}
