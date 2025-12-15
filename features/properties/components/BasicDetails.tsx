import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PropertyFormData } from '../types/schemas';

interface BasicDetailsProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
}

export function BasicDetails({ register, errors }: BasicDetailsProps) {
  return (
    <>
      {/* Name Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='name' className='text-right pt-2'>
          Name <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Input
            id='name'
            placeholder='Sunset Villa'
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          <FormError message={errors.name?.message} />
        </div>
      </div>

      {/* Description Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='description' className='text-right pt-2'>
          Description
        </Label>
        <div className='col-span-3'>
          <Textarea
            id='description'
            placeholder='A beautiful property with...'
            rows={3}
            {...register('description')}
            className={errors.description ? 'border-destructive' : ''}
          />
          <FormError message={errors.description?.message} />
        </div>
      </div>

      {/* Address Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='address' className='text-right pt-2'>
          Address <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Input
            id='address'
            placeholder='123 Ocean Dr'
            {...register('address')}
            className={errors.address ? 'border-destructive' : ''}
          />
          <FormError message={errors.address?.message} />
        </div>
      </div>

      {/* Image URL Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='image' className='text-right pt-2'>
          Image URL
        </Label>
        <div className='col-span-3'>
          <Input
            id='image'
            type='url'
            placeholder='https://example.com/image.jpg'
            {...register('image')}
            className={errors.image ? 'border-destructive' : ''}
          />
          <FormError message={errors.image?.message} />
        </div>
      </div>
    </>
  );
}
