import { FormError } from '@/components/ui/form-error';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookingType, PropertyStatus, PropertyType } from '@prisma/client';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { PropertyFormData } from '../../types/schemas';

interface PropertyClassificationProps {
  setValue: UseFormSetValue<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  defaultType?: string;
  defaultStatus?: string;
  defaultBookingType?: string;
}

export function PropertyClassification({
  setValue,
  errors,
  defaultType,
  defaultStatus,
  defaultBookingType,
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

      {/* Booking Type Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='bookingType' className='text-right pt-2'>
          Booking Type <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Select
            defaultValue={defaultBookingType || 'SHORT_TERM'}
            onValueChange={(value) =>
              setValue('bookingType', value as BookingType)
            }
          >
            <SelectTrigger
              className={errors.bookingType ? 'border-destructive' : ''}
            >
              <SelectValue placeholder='Select booking type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='SHORT_TERM'>Short Term</SelectItem>
              <SelectItem value='LONG_TERM'>Long Term</SelectItem>
            </SelectContent>
          </Select>
          <FormError message={errors.bookingType?.message} />
          <p className='text-xs text-muted-foreground mt-1'>
            Short-term: nightly/weekly stays. Long-term: monthly/yearly rentals.
          </p>
        </div>
      </div>
    </>
  );
}
