import { FormError } from '@/components/ui/form-error';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { PropertyFormData } from '../../types/schemas';

interface PropertyClassificationProps {
  setValue: UseFormSetValue<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  defaultType?: string;
  defaultStatus?: string;
}

export function PropertyClassification({
  setValue,
  errors,
  defaultType,
  defaultStatus,
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
            onValueChange={(value) => setValue('type', value as any)}
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
            onValueChange={(value) => setValue('status', value as any)}
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
    </>
  );
}
