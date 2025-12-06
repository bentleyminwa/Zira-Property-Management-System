import { MaintenanceDetails } from '@/features/maintenance/components/MaintenanceDetails';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface MaintenancePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MaintenancePage(props: MaintenancePageProps) {
  const params = await props.params;
  const maintenance = await prisma.maintenance.findUnique({
    where: {
      id: params.id,
    },
    include: {
      property: true,
    },
  });

  if (!maintenance) {
    notFound();
  }

  return <MaintenanceDetails maintenance={maintenance} />;
}
