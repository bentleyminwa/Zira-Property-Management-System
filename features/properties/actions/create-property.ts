'use server';

import { prisma } from '@/lib/prisma';
import { formDataToObject, formatZodErrors } from '@/lib/validation-helpers';
import { revalidatePath } from 'next/cache';
import { propertySchema } from '../types/schemas';

export async function createProperty(formData: FormData) {
  try {
    const data = formDataToObject(formData);

    const validationResult = propertySchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: formatZodErrors(validationResult.error),
      };
    }

    const validatedData = validationResult.data;

    const property = await prisma.property.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        address: validatedData.address,
        price: validatedData.price,
        type: validatedData.type,
        status: validatedData.status,
        size: validatedData.size,
        bedrooms: validatedData.bedrooms,
        bathrooms: validatedData.bathrooms,
        image: validatedData.image || null,
        bookingType: validatedData.bookingType,
      },
    });

    revalidatePath('/dashboard/properties');

    return {
      success: true,
      message: `Property "${property.name}" created successfully`,
      property,
    };
  } catch (error) {
    console.error('Error creating property:', error);
    return {
      success: false,
      message: 'Failed to create property. Please try again.',
    };
  }
}
