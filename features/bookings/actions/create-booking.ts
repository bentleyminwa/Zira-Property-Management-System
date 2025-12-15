'use server';

import { prisma } from '@/lib/prisma';
import { BookingStatus, BookingType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { checkAvailability } from '../utils/check-availability';

export type CreateBookingState = {
  errors?: {
    propertyId?: string[];
    tenantId?: string[];
    startDate?: string[];
    endDate?: string[];
    amount?: string[];
    _form?: string[];
  };
  message?: string;
};

// TODO: Use a Zod schema for validation in a real app, doing manual generic validation for now to save tokens/time if schema not provided.
// Actually, I should create a schema. It's better.

import { z } from 'zod';

const createBookingSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  tenantId: z.string().min(1, 'Tenant is required'),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  type: z.nativeEnum(BookingType),
  totalPrice: z.coerce.number().positive('Total price must be positive'),
  depositAmount: z.coerce.number().nonnegative().optional(),
  notes: z.string().optional(),
});

export async function createBooking(
  prevState: CreateBookingState,
  formData: FormData
): Promise<CreateBookingState> {
  const validatedFields = createBookingSchema.safeParse({
    propertyId: formData.get('propertyId'),
    tenantId: formData.get('tenantId'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    type: formData.get('type'),
    totalPrice: formData.get('totalPrice'),
    depositAmount: formData.get('depositAmount'),
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Booking.',
    };
  }

  const {
    propertyId,
    tenantId,
    startDate,
    endDate,
    type,
    totalPrice,
    depositAmount,
    notes,
  } = validatedFields.data;

  // 1. Validate Dates
  if (endDate <= startDate) {
    return {
      errors: { endDate: ['End date must be after start date'] },
      message: 'Invalid dates.',
    };
  }

  // 2. Check Availability
  const isAvailable = await checkAvailability(propertyId, startDate, endDate);
  if (!isAvailable) {
    return {
      message:
        'The property is not available for the selected dates. Please check existing bookings.',
    };
  }

  try {
    // 3. Create Booking
    await prisma.booking.create({
      data: {
        propertyId,
        tenantId,
        startDate,
        endDate,
        type,
        totalPrice,
        depositAmount,
        notes,
        status: BookingStatus.CONFIRMED, // Admin created bookings are CONFIRMED by default
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Booking.',
    };
  }

  revalidatePath('/dashboard/bookings');
  revalidatePath(`/dashboard/properties/${propertyId}`);
  redirect('/dashboard/bookings');
}
