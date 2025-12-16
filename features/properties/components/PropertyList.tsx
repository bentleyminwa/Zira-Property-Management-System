import { EmptyState } from '@/components/ui/empty-state';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { prisma } from '@/lib/prisma';
import { serializeDecimal } from '@/lib/utils';
import { Prisma, PropertyStatus, PropertyType } from '@prisma/client';

interface PropertyListProps {
  query?: string;
  status?: string;
  type?: string;
  sort?: string;
}

export async function PropertyList({
  query,
  status,
  type,
  sort,
}: PropertyListProps) {
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

  if (properties.length === 0) {
    return (
      <EmptyState
        title='No properties found'
        description='Try adjusting your search or filters.'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={serializeDecimal(property)} />
      ))}
    </div>
  );
}
