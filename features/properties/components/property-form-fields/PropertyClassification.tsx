import { FormError } from '@/components/ui/form-error';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListingType, PropertyStatus, PropertyType } from '@prisma/client';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { PropertyFormData } from '../../types/schemas';

interface PropertyClassificationProps {
  setValue: UseFormSetValue<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  defaultType?: string;
  defaultStatus?: string;
  defaultListingType?: string;
}

export function PropertyClassification({
  setValue,
  errors,
  defaultType,
  defaultStatus,
  defaultListingType,
}: PropertyClassificationProps) {
  return (
    <>
      {/* Type Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='type' className='text-right pt-2'>
          Type <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Select
            defaultValue={defaultType || 'APARTMENT'}
            onValueChange={(value) => setValue('type', value as PropertyType)}
          >
            <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='APARTMENT'>Apartment</SelectItem>
              <SelectItem value='HOUSE'>House</SelectItem>
              <SelectItem value='COMMERCIAL'>Commercial</SelectItem>
              <SelectItem value='CONDO'>Condo</SelectItem>
            </SelectContent>
          </Select>
          <FormError message={errors.type?.message} />
        </div>
      </div>

      {/* Status Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='status' className='text-right pt-2'>
          Status <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Select
            defaultValue={defaultStatus || 'AVAILABLE'}
            onValueChange={(value) =>
              setValue('status', value as PropertyStatus)
            }
          >
            <SelectTrigger
              className={errors.status ? 'border-destructive' : ''}
            >
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='AVAILABLE'>Available</SelectItem>
              <SelectItem value='RENTED'>Rented</SelectItem>
              <SelectItem value='MAINTENANCE'>Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <FormError message={errors.status?.message} />
        </div>
      </div>

      {/* Listing Type Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='listingType' className='text-right pt-2'>
          Listing Type <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Select
            defaultValue={defaultListingType || 'RENT'}
            onValueChange={(value) =>
              setValue('listingType', value as ListingType)
            }
          >
            <SelectTrigger
              className={errors.listingType ? 'border-destructive' : ''}
            >
              <SelectValue placeholder='Select listing type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='BUY'>For Sale</SelectItem>
              <SelectItem value='RENT'>For Rent</SelectItem>
            </SelectContent>
          </Select>
          <FormError message={errors.listingType?.message} />
          <p className='text-xs text-muted-foreground mt-1'>
            For rent properties: booking type (short-term/long-term) is set when
            creating bookings
          </p>
        </div>
      </div>
    </>
  );
}
