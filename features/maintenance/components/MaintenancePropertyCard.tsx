import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property } from '@prisma/client';
import { Building2, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MaintenancePropertyCardProps {
  property: Property;
}

export function MaintenancePropertyCard({
  property,
}: MaintenancePropertyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Building2 className='h-5 w-5' />
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex gap-4'>
          {property.image ? (
            <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-md border'>
              <Image
                src={property.image}
                alt={property.name}
                fill
                className='object-cover'
              />
            </div>
          ) : (
            <div className='flex h-24 w-24 shrink-0 items-center justify-center rounded-md border bg-muted'>
              <Building2 className='h-8 w-8 text-muted-foreground' />
            </div>
          )}

          <div className='flex flex-col justify-between py-1'>
            <div className='space-y-1'>
              <Link
                href={`/properties/${property.id}`}
                className='font-semibold hover:underline text-lg'
              >
                {property.name}
              </Link>
              <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                <MapPin className='h-3 w-3' />
                <span>{property.address}</span>
              </div>
            </div>

            <Badge variant='outline' className='w-fit'>
              {property.type}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
