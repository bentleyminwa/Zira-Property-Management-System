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
import { BookingForm } from './BookingForm';

export function AddBookingModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{
    properties: { id: string; name: string; price: number }[];
    tenants: { id: string; firstName: string; lastName: string }[];
  }>({ properties: [], tenants: [] });

  const router = useRouter();

  const form = useForm<BookingFormData>({
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
        form.reset();
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
      onOpenChange={setOpen}
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
          form='booking-form'
          disabled={loading || !form.formState.isValid}
        >
          {loading ? 'Creating...' : 'Create Booking'}
        </Button>
      }
    >
      <BookingForm
        form={form}
        onSubmit={onSubmit}
        properties={options.properties}
        tenants={options.tenants}
      />
    </Modal>
  );
}
