'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { formatCurrency } from '@/lib/utils';
import { Booking, Maintenance, Property } from '@prisma/client';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Home,
  MapPin,
  Maximize,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DeletePropertyDialog } from './DeletePropertyDialog';
import { EditPropertyModal } from './EditPropertyModal';
import { PropertyBookingsTab } from './PropertyBookingsTab';
import { PropertyMaintenanceTab } from './PropertyMaintenanceTab';

interface PropertyDetailsProps {
  property: Property & {
    bookings: Booking[];
    maintenance: Maintenance[];
  };
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const router = useRouter();
  const { setBreadcrumbOverride, clearBreadcrumbOverride } = useBreadcrumb();

  // Set breadcrumb override when component mounts
  useEffect(() => {
    setBreadcrumbOverride(property.id, property.name);

    // Clean up when component unmounts
    return () => {
      clearBreadcrumbOverride(property.id);
    };
  }, [
    property.id,
    property.name,
    setBreadcrumbOverride,
    clearBreadcrumbOverride,
  ]);

  const [imgError, setImgError] = useState(false);

  return (
    <div className='space-y-6'>
      <Button
        variant='ghost'
        className='gap-2 pl-0 hover:bg-transparent hover:text-primary'
        onClick={() => router.back()}
      >
        <ArrowLeft className='h-4 w-4' />
        Back to Properties
      </Button>

      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h1 className='text-3xl font-bold tracking-tight'>
              {property.name}
            </h1>
            <Badge
              variant={
                property.status === 'AVAILABLE'
                  ? 'default'
                  : property.status === 'RENTED'
                  ? 'secondary'
                  : 'destructive'
              }
            >
              {property.status}
            </Badge>
          </div>
          <div className='flex items-center text-muted-foreground'>
            <MapPin className='mr-1 h-4 w-4' />
            {property.address}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <EditPropertyModal property={property} />
          <DeletePropertyDialog property={property} />
        </div>
      </div>

      {/* Hero Image */}
      <div className='relative aspect-video w-full overflow-hidden rounded-xl border bg-muted'>
        {property.image && !imgError ? (
          <Image
            src={property.image}
            alt={property.name}
            fill
            className='object-cover'
            onError={() => setImgError(true)}
            unoptimized={true}
          />
        ) : (
          <div className='flex h-full items-center justify-center text-muted-foreground bg-muted'>
            <Image
              src='/placeholder-property.jpg'
              alt='Placeholder'
              fill
              className='object-cover opacity-40'
              unoptimized={true}
            />
            <Home className='h-20 w-20 opacity-20 relative z-10' />
          </div>
        )}
        <div className='absolute bottom-4 right-4 rounded-lg bg-background/90 px-4 py-2 font-semibold shadow-sm backdrop-blur-sm'>
          {formatCurrency(Number(property.price))}
          <span className='text-sm font-normal text-muted-foreground'>
            /month
          </span>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          {/* Key Features Grid */}
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {[
              {
                icon: Home,
                label: 'Type',
                value: property.type.toLowerCase(),
                capitalize: true,
              },
              {
                icon: Maximize,
                label: 'Size',
                value: property.size ? `${property.size} sq ft` : '-',
              },
              {
                icon: BedDouble,
                label: 'Bedrooms',
                value: property.bedrooms ?? '-',
              },
              {
                icon: Bath,
                label: 'Bathrooms',
                value: property.bathrooms ?? '-',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
                    <Icon className='mb-2 h-6 w-6 text-muted-foreground' />
                    <span className='text-sm font-medium text-muted-foreground'>
                      {feature.label}
                    </span>
                    <span
                      className={`font-semibold ${
                        feature.capitalize ? 'capitalize' : ''
                      }`}
                    >
                      {feature.value}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                {property.description || 'No description provided.'}
              </p>
            </CardContent>
          </Card>

          {/* Tabs: Bookings & Maintenance */}
          <Tabs defaultValue='bookings' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='bookings'>Booking History</TabsTrigger>
              <TabsTrigger value='maintenance'>
                Maintenance Requests
              </TabsTrigger>
            </TabsList>
            <TabsContent value='bookings' className='mt-4'>
              <PropertyBookingsTab bookings={property.bookings} />
            </TabsContent>
            <TabsContent value='maintenance' className='mt-4'>
              <PropertyMaintenanceTab maintenance={property.maintenance} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Button className='w-full'>Create Booking</Button>
              <Button variant='outline' className='w-full'>
                Request Maintenance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
