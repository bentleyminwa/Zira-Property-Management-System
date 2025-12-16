'use server';

import { prisma } from '@/lib/prisma';
import { BookingStatus, BookingType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
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

import { BookingFormData, bookingSchema } from '../types/schemas';

export async function createBooking(input: BookingFormData) {
  const validatedFields = bookingSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Missing Fields. Failed to Create Booking.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    propertyId,
    tenantId,
    dateRange,
    type,
    totalPrice,
    depositAmount,
    notes,
  } = validatedFields.data;

  const startDate = dateRange.from;
  const endDate = dateRange.to;

  // 1. Validate Dates
  if (endDate <= startDate) {
    return {
      success: false,
      message: 'Invalid dates. End date must be after start date.',
    };
  }

  // 2. Check Availability
  const isAvailable = await checkAvailability(propertyId, startDate, endDate);
  if (!isAvailable) {
    return {
      success: false,
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

    revalidatePath('/dashboard/bookings');
    revalidatePath(`/dashboard/properties/${propertyId}`);

    return {
      success: true,
      message: 'Booking created successfully',
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      message: 'Database Error: Failed to Create Booking.',
    };
  }
}
