import { TenantDetails } from '@/features/tenants/components/TenantDetails';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface TenantPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TenantPage(props: TenantPageProps) {
  const params = await props.params;
  const tenant = await prisma.tenant.findUnique({
    where: {
      id: params.id,
    },
    include: {
      bookings: {
        include: {
          property: true,
          tenant: true,
        },
        orderBy: {
          startDate: 'desc',
        },
      },
      payments: {
        include: {
          booking: {
            include: {
              property: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      },
    },
  });

  if (!tenant) {
    notFound();
  }

  return <TenantDetails tenant={tenant} />;
}
