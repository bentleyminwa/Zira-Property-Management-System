'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Property } from '@prisma/client';
import { Bath, Bed, Eye, MapPin, Pencil, Ruler } from 'lucide-react';
// import Image from 'next/image'; --> I'll have to figure out how to use it without it giving me trouble🤯
import Link from 'next/link';
import { EditPropertyModal } from './EditPropertyModal';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className='group relative overflow-hidden transition-all hover:shadow-lg'>
      <div className='relative aspect-4/3 overflow-hidden'>
        <img
          src={property.image || '/placeholder-property.jpg'}
          alt={property.name}
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

        <div className='absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100'>
          <Link href={`/dashboard/properties/${property.id}`}>
            <Button variant='secondary' size='sm' className='gap-2'>
              <Eye className='h-4 w-4' />
              View
            </Button>
          </Link>
          <EditPropertyModal
            property={property}
            customTrigger={
              <Button variant='secondary' size='sm' className='gap-2'>
                <Pencil className='h-4 w-4' />
                Edit
              </Button>
            }
          />
        </div>

        <div className='absolute left-2 top-2 flex gap-2'>
          <Badge
            variant={property.status === 'AVAILABLE' ? 'default' : 'secondary'}
          >
            {property.status}
          </Badge>
          <Badge
            variant='outline'
            className='bg-background/80 backdrop-blur-sm'
          >
            {property.type}
          </Badge>
        </div>
      </div>

      <CardContent className='p-4'>
        <div className='mb-2 flex items-start justify-between'>
          <div>
            <h3 className='font-semibold line-clamp-1'>{property.name}</h3>
            <div className='flex items-center text-sm text-muted-foreground'>
              <MapPin className='mr-1 h-3 w-3' />
              <span className='line-clamp-1'>{property.address}</span>
            </div>
          </div>
          <p className='font-bold text-primary'>
            {formatCurrency(Number(property.price))}
          </p>
        </div>

        <div className='flex items-center justify-between text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <Bed className='h-4 w-4' />
            <span>{property.bedrooms || '-'} Beds</span>
          </div>
          <div className='flex items-center gap-1'>
            <Bath className='h-4 w-4' />
            <span>{property.bathrooms || '-'} Baths</span>
          </div>
          <div className='flex items-center gap-1'>
            <Ruler className='h-4 w-4' />
            <span>{property.size ? `${property.size} sqft` : '-'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
