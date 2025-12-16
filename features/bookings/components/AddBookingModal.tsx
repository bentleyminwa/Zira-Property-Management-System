'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createBooking } from '../actions/create-booking';
import { getBookingOptions } from '../actions/get-options';
import { BookingFormData, bookingSchema } from '../types/schemas';
import { BookingFormFields } from './booking-form-fields';

export function AddBookingModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{
    properties: { id: string; name: string; price: number }[];
    tenants: { id: string; firstName: string; lastName: string }[];
  }>({ properties: [], tenants: [] });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      propertyId: '',
      tenantId: '',
      type: 'SHORT_TERM',
      dateRange: {
        from: undefined,
        to: undefined,
      },
      totalPrice: 0,
      notes: '',
    },
  });

  useEffect(() => {
    if (open) {
      // Fetch options when modal opens
      getBookingOptions().then((data) => {
        setOptions(data);
      });
    }
  }, [open]);

  async function onSubmit(data: BookingFormData) {
    setLoading(true);
    try {
      const result = await createBooking(data);

      if (result.success) {
        toast.success('Booking created successfully');
        reset();
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create booking');
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
          Add Booking
        </Button>
      }
      title='Add Booking'
      description='Create a new booking manually.'
      footerContent={
        <Button
          type='submit'
          form='add-booking-form'
          disabled={loading || !isValid}
        >
          {loading ? 'Creating...' : 'Create Booking'}
        </Button>
      }
    >
      <form id='add-booking-form' onSubmit={handleSubmit(onSubmit)}>
        <BookingFormFields
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          properties={options.properties}
          tenants={options.tenants}
        />
      </form>
    </Modal>
  );
}
