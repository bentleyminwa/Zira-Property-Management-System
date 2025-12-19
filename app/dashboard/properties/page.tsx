import { CardGridSkeleton } from '@/components/skeletons';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { AddPropertyModal } from '@/features/properties/components/AddPropertyModal';
import { PropertyList } from '@/features/properties/components/PropertyList';
import { filterOptions, sortOptions } from '@/features/properties/config';
import { Suspense } from 'react';

interface PropertiesProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    type?: string;
    sort?: string;
  }>;
}

export default async function Properties({ searchParams }: PropertiesProps) {
  const params = await searchParams;
  const query = params.query;
  const status = params.status;
  const type = params.type;
  const sort = params.sort;

  return (
    <div className='p-6 space-y-6'>
      <PageHeader
        title='Properties'
        description='Manage your real estate assets, view details, and track status.'
      />

      <DataTableToolbar
        searchPlaceholder='Search properties...'
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      >
        <AddPropertyModal />
      </DataTableToolbar>

      <Suspense fallback={<CardGridSkeleton />}>
        <PropertyList query={query} status={status} type={type} sort={sort} />
      </Suspense>
    </div>
  );
}
