import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property } from '@prisma/client';
import {
  Bath,
  BedDouble,
  Building2,
  Home,
  MapPin,
  Maximize,
} from 'lucide-react';
import Link from 'next/link';

interface BookingPropertyCardProps {
  property: Property;
}

export function BookingPropertyCard({ property }: BookingPropertyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Building2 className='h-5 w-5' />
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Property Image */}
          <div className='relative aspect-video w-full overflow-hidden rounded-lg border bg-muted'>
            {property.image ? (
              <img
                src={property.image}
                alt={property.name}
                className='object-cover'
              />
            ) : (
              <div className='flex h-full items-center justify-center text-muted-foreground'>
                <Home className='h-20 w-20 opacity-20' />
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className='space-y-2'>
            <Link
              href={`/properties/${property.id}`}
              className='text-xl font-semibold hover:text-primary transition-colors'
            >
              {property.name}
            </Link>
            <div className='flex items-center text-muted-foreground'>
              <MapPin className='mr-1 h-4 w-4' />
              {property.address}
            </div>
          </div>

          {/* Property Features */}
          <div className='grid grid-cols-3 gap-4 pt-2'>
            <div className='flex flex-col items-center rounded-lg border p-3'>
              <Home className='mb-1 h-5 w-5 text-muted-foreground' />
              <span className='text-xs text-muted-foreground'>Type</span>
              <span className='text-sm font-medium capitalize'>
                {property.type.toLowerCase()}
              </span>
            </div>
            {property.bedrooms && (
              <div className='flex flex-col items-center rounded-lg border p-3'>
                <BedDouble className='mb-1 h-5 w-5 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>Bedrooms</span>
                <span className='text-sm font-medium'>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className='flex flex-col items-center rounded-lg border p-3'>
                <Bath className='mb-1 h-5 w-5 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>Bathrooms</span>
                <span className='text-sm font-medium'>
                  {property.bathrooms}
                </span>
              </div>
            )}
            {property.size && (
              <div className='flex flex-col items-center rounded-lg border p-3'>
                <Maximize className='mb-1 h-5 w-5 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>Size</span>
                <span className='text-sm font-medium'>
                  {property.size} sq ft
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
