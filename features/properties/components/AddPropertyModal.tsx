'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createProperty } from '../actions';
import { propertySchema, type PropertyFormData } from '../types/schemas';
import { PropertyFormFields } from './property-form-fields';

export function AddPropertyModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    mode: 'onBlur',
    defaultValues: {
      type: 'APARTMENT',
      status: 'AVAILABLE',
      listingType: 'RENT',
    },
  });

  async function onSubmit(data: PropertyFormData) {
    setLoading(true);

    // Convert to FormData for server action
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value.toString());
      }
    });

    try {
      const result = await createProperty(formData);

      if (result.success) {
        toast.success(result.message);
        reset();
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) reset();
      }}
      size='lg'
      trigger={
        <Button className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Property
        </Button>
      }
      title='Add Property'
      description="Add a new property to your portfolio. Click save when you're done."
      footerContent={
        <Button
          type='submit'
          form='add-property-form'
          disabled={loading || !isValid}
        >
          {loading ? 'Saving...' : 'Save changes'}
        </Button>
      }
    >
      <form id='add-property-form' onSubmit={handleSubmit(onSubmit)}>
        <PropertyFormFields
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </form>
    </Modal>
  );
}
