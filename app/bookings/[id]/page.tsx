import { PropertyDetailsSkeleton } from '@/components/skeletons';
import { BookingDetails } from '@/features/bookings/components/BookingDetails';
import prisma from '@/lib/prisma';
import { serializeDecimal } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function BookingDetailsFetcher({ id }: { id: string }) {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      property: true,
      tenant: true,
      payments: {
        orderBy: { date: 'desc' },
      },
    },
  });

  if (!booking) {
    notFound();
  }

  return <BookingDetails booking={serializeDecimal(booking)} />;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { id } = await params;

  return (
    <div className='p-6'>
      <Suspense fallback={<PropertyDetailsSkeleton />}>
        <BookingDetailsFetcher id={id} />
      </Suspense>
    </div>
  );
}
