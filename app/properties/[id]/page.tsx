import { PropertyDetailsSkeleton } from '@/components/skeletons';
import { PropertyDetails } from '@/features/properties/components/PropertyDetails';
import { prisma } from '@/lib/prisma';
import { serializeDecimal } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function PropertyDetailsFetcher({ id }: { id: string }) {
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      bookings: {
        orderBy: { startDate: 'desc' },
        take: 5,
      },
      maintenance: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!property) {
    notFound();
  }

  return <PropertyDetails property={serializeDecimal(property)} />;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  return (
    <div className='p-6'>
      <Suspense fallback={<PropertyDetailsSkeleton />}>
        <PropertyDetailsFetcher id={id} />
      </Suspense>
    </div>
  );
}
