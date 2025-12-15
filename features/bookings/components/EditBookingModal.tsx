'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Booking } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getBookingOptions } from '../actions/get-options';
import { updateBooking } from '../actions/update-booking';
import { BookingFormData, bookingSchema } from '../types/schemas';
import { BookingForm } from './BookingForm';

interface EditBookingModalProps {
  booking: Booking;
  customTrigger?: ReactNode;
  open?: boolean; // Can be controlled
  onOpenChange?: (open: boolean) => void;
}

export function EditBookingModal({
  booking,
  customTrigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: EditBookingModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{
    properties: { id: string; name: string; price: number }[];
    tenants: { id: string; firstName: string; lastName: string }[];
  }>({ properties: [], tenants: [] });

  const router = useRouter();
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? controlledOnOpenChange || (() => {})
    : setInternalOpen;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      propertyId: booking.propertyId,
      tenantId: booking.tenantId,
      dateRange: {
        from: new Date(booking.startDate),
        to: new Date(booking.endDate),
      },
      totalPrice: Number(booking.totalPrice),
      notes: booking.notes || '',
    },
  });

  useEffect(() => {
    if (open) {
      getBookingOptions().then((data) => {
        setOptions(data);
      });
      // Reset form values when modal opens to ensure fresh data
      form.reset({
        propertyId: booking.propertyId,
        tenantId: booking.tenantId,
        dateRange: {
          from: new Date(booking.startDate),
          to: new Date(booking.endDate),
        },
        totalPrice: Number(booking.totalPrice),
        notes: booking.notes || '',
      });
    }
  }, [open, booking, form]);

  async function onSubmit(data: BookingFormData) {
    setLoading(true);
    try {
      const result = await updateBooking(booking.id, {
        startDate: data.dateRange.from,
        endDate: data.dateRange.to,
        totalPrice: data.totalPrice,
        notes: data.notes,
      });

      if (result.success) {
        toast.success('Booking updated successfully');
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update booking');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      size='lg'
      trigger={customTrigger}
      title='Edit Booking'
      description='Modify booking details.'
      footerContent={
        <Button
          type='submit'
          form={`edit-booking-form-${booking.id}`}
          disabled={loading || !form.formState.isValid}
        >
          {loading ? 'Saving...' : 'Save Changes'}
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
