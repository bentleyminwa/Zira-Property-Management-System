'use client';

import { Button } from '@/components/ui/button';
import { MaintenanceInfo } from '@/features/maintenance/components/MaintenanceInfo';
import { MaintenancePropertyCard } from '@/features/maintenance/components/MaintenancePropertyCard';
import { Maintenance, Property } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type MaintenanceWithProperty = Maintenance & {
  property: Property;
};

interface MaintenanceDetailsProps {
  maintenance: MaintenanceWithProperty;
}

export function MaintenanceDetails({ maintenance }: MaintenanceDetailsProps) {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <Button
          variant='ghost'
          className='gap-2 pl-0 hover:bg-transparent hover:text-primary mb-4'
          onClick={() => router.back()}
        >
          <ArrowLeft className='h-4 w-4' />
          Back
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>
          Maintenance Details
        </h1>
      </div>

      <div className='grid gap-8 md:grid-cols-[1fr_350px]'>
        <div className='space-y-8'>
          <MaintenanceInfo maintenance={maintenance} />
        </div>

        <div className='space-y-8'>
          <MaintenancePropertyCard property={maintenance.property} />
          {/* Future: Add Assignment / Notes / Status Change Action Card here */}
        </div>
      </div>
    </div>
  );
}
