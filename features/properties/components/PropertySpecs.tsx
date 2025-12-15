import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PropertyFormData } from '../types/schemas';

interface PropertySpecsProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
}

export function PropertySpecs({ register, errors }: PropertySpecsProps) {
  return (
    <>
      {/* Price Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='price' className='text-right pt-2'>
          Price <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Input
            id='price'
            type='number'
            step='0.01'
            placeholder='2500.00'
            {...register('price')}
            className={errors.price ? 'border-destructive' : ''}
          />
          <FormError message={errors.price?.message} />
        </div>
      </div>

      {/* Size Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='size' className='text-right pt-2'>
          Size (sq ft)
        </Label>
        <div className='col-span-3'>
          <Input
            id='size'
            type='number'
            step='0.01'
            placeholder='1200'
            {...register('size')}
            className={errors.size ? 'border-destructive' : ''}
          />
          <FormError message={errors.size?.message} />
        </div>
      </div>

      {/* Bedrooms and Bathrooms */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid grid-cols-2 items-start gap-4'>
          <Label htmlFor='bedrooms' className='text-right pt-2'>
            Bedrooms
          </Label>
          <div className='col-span-1'>
            <Input
              id='bedrooms'
              type='number'
              min='0'
              placeholder='3'
              {...register('bedrooms')}
              className={errors.bedrooms ? 'border-destructive' : ''}
            />
            <FormError message={errors.bedrooms?.message} />
          </div>
        </div>
        <div className='grid grid-cols-2 items-start gap-4'>
          <Label htmlFor='bathrooms' className='text-right pt-2'>
            Bathrooms
          </Label>
          <div className='col-span-1'>
            <Input
              id='bathrooms'
              type='number'
              min='0'
              placeholder='2'
              {...register('bathrooms')}
              className={errors.bathrooms ? 'border-destructive' : ''}
            />
            <FormError message={errors.bathrooms?.message} />
          </div>
        </div>
      </div>
    </>
  );
}
