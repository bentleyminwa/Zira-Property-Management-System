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
import { BookingFormFields } from './booking-form-fields';

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
      propertyId: booking.propertyId,
      tenantId: booking.tenantId,
      dateRange: {
        from: new Date(booking.startDate),
        to: new Date(booking.endDate),
      },
      type: booking.type as any, // Cast to any or matching enum
      totalPrice: Number(booking.totalPrice),
      depositAmount: booking.depositAmount
        ? Number(booking.depositAmount)
        : undefined,
      notes: booking.notes || '',
    },
  });

  useEffect(() => {
    if (open) {
      getBookingOptions().then((data) => {
        setOptions(data);
      });
      // Reset form values when modal opens to ensure fresh data
      reset({
        propertyId: booking.propertyId,
        tenantId: booking.tenantId,
        dateRange: {
          from: new Date(booking.startDate),
          to: new Date(booking.endDate),
        },
        type: booking.type as any,
        totalPrice: Number(booking.totalPrice),
        depositAmount: booking.depositAmount
          ? Number(booking.depositAmount)
          : undefined,
        notes: booking.notes || '',
      });
    }
  }, [open, booking, reset]);

  async function onSubmit(data: BookingFormData) {
    setLoading(true);
    try {
      const result = await updateBooking(booking.id, {
        startDate: data.dateRange.from,
        endDate: data.dateRange.to,
        totalPrice: data.totalPrice,
        notes: data.notes,
        type: data.type,
        depositAmount: data.depositAmount,
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
          disabled={loading || !isValid}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      }
    >
      <form
        id={`edit-booking-form-${booking.id}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <BookingFormFields
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          properties={options.properties}
          tenants={options.tenants}
          defaultValues={{
            propertyId: booking.propertyId,
            tenantId: booking.tenantId,
            type: booking.type as any,
          }}
        />
      </form>
    </Modal>
  );
}
