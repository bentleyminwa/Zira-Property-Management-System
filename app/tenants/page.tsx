import { TableSkeleton } from '@/components/skeletons';
import { TenantList } from '@/components/tenants/TenantList';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { Suspense } from 'react';

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

      <Suspense fallback={<TableSkeleton />}>
        <TenantList query={query} sort={sort} />
      </Suspense>
    </div>
  );
}
