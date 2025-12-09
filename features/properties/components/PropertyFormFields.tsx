'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PropertyFormData } from '../types/schemas';

interface PropertyFormFieldsProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  setValue: UseFormSetValue<PropertyFormData>;
  // Optional defaults for selects if needed, though usually handled by form defaultValues
  defaultType?: string;
  defaultStatus?: string;
}

export function PropertyFormFields({
  register,
  errors,
  setValue,
  defaultType,
  defaultStatus,
}: PropertyFormFieldsProps) {
  return (
    <div className='grid gap-4 py-4'>
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
          {errors.name && (
            <p className='text-sm text-destructive mt-1'>
              {errors.name.message}
            </p>
          )}
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
          {errors.description && (
            <p className='text-sm text-destructive mt-1'>
              {errors.description.message}
            </p>
          )}
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
          {errors.address && (
            <p className='text-sm text-destructive mt-1'>
              {errors.address.message}
            </p>
          )}
        </div>
      </div>

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
          {errors.type && (
            <p className='text-sm text-destructive mt-1'>
              {errors.type.message}
            </p>
          )}
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
          {errors.status && (
            <p className='text-sm text-destructive mt-1'>
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

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
          {errors.price && (
            <p className='text-sm text-destructive mt-1'>
              {errors.price.message}
            </p>
          )}
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
          {errors.size && (
            <p className='text-sm text-destructive mt-1'>
              {errors.size.message}
            </p>
          )}
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
            {errors.bedrooms && (
              <p className='text-sm text-destructive mt-1'>
                {errors.bedrooms.message}
              </p>
            )}
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
            {errors.bathrooms && (
              <p className='text-sm text-destructive mt-1'>
                {errors.bathrooms.message}
              </p>
            )}
          </div>
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
          {errors.image && (
            <p className='text-sm text-destructive mt-1'>
              {errors.image.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
