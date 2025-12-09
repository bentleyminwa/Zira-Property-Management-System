'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Property } from '@prisma/client';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateProperty } from '../actions';
import { propertySchema, type PropertyFormData } from '../types/schemas';
import { PropertyFormFields } from './PropertyFormFields';

interface EditPropertyModalProps {
  property: Property;
  customTrigger?: React.ReactNode;
}

export function EditPropertyModal({
  property,
  customTrigger,
}: EditPropertyModalProps) {
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
      name: property.name,
      description: property.description || '',
      address: property.address,
      type: property.type,
      status: property.status,
      price: Number(property.price),
      size: property.size ? Number(property.size) : undefined,
      bedrooms: property.bedrooms || undefined,
      bathrooms: property.bathrooms || undefined,
      image: property.image || '',
    },
  });

  // Reset form when property changes or modal opens
  useEffect(() => {
    if (open) {
      reset({
        name: property.name,
        description: property.description || '',
        address: property.address,
        type: property.type,
        status: property.status,
        price: Number(property.price),
        size: property.size ? Number(property.size) : undefined,
        bedrooms: property.bedrooms || undefined,
        bathrooms: property.bathrooms || undefined,
        image: property.image || '',
      });
    }
  }, [open, property, reset]);

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
      const result = await updateProperty(property.id, formData);

      if (result.success) {
        toast.success(result.message);
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
      onOpenChange={setOpen}
      size='lg'
      trigger={
        customTrigger || (
          <Button variant='outline' size='sm'>
            <Edit className='mr-2 h-4 w-4' />
            Edit
          </Button>
        )
      }
      title='Edit Property'
      description="Update property details. Click save when you're done."
      footerContent={
        <Button
          type='submit'
          form='edit-property-form'
          disabled={loading || !isValid}
        >
          {loading ? 'Saving...' : 'Save changes'}
        </Button>
      }
    >
      <form id='edit-property-form' onSubmit={handleSubmit(onSubmit)}>
        <PropertyFormFields
          register={register}
          errors={errors}
          setValue={setValue}
          defaultType={property.type}
          defaultStatus={property.status}
        />
      </form>
    </Modal>
  );
}
