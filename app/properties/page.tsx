import { AddPropertyModal } from '@/components/properties/AddPropertyModal';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { DataTableToolbar } from '@/components/ui/DataTableToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import prisma from '@/lib/prisma';
import { Prisma, PropertyStatus, PropertyType } from '@prisma/client';

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

  // Build where clause
  const where: Prisma.PropertyWhereInput = {
    AND: [
      query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { address: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
      status && status !== 'ALL' ? { status: status as PropertyStatus } : {},
      type && type !== 'ALL' ? { type: type as PropertyType } : {},
    ],
  };

  // Build orderBy clause
  let orderBy: Prisma.PropertyOrderByWithRelationInput = { createdAt: 'desc' };
  if (sort === 'price_asc') orderBy = { price: 'asc' };
  if (sort === 'price_desc') orderBy = { price: 'desc' };

  const properties = await prisma.property.findMany({
    where,
    orderBy,
  });

  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Rented', value: 'RENTED' },
        { label: 'Maintenance', value: 'MAINTENANCE' },
      ],
    },
    {
      key: 'type',
      label: 'Type',
      options: [
        { label: 'Apartment', value: 'APARTMENT' },
        { label: 'House', value: 'HOUSE' },
        { label: 'Commercial', value: 'COMMERCIAL' },
        { label: 'Condo', value: 'CONDO' },
      ],
    },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

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

      {properties.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/10'>
          <h3 className='mt-4 text-lg font-semibold'>No properties found</h3>
          <p className='text-muted-foreground'>
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
