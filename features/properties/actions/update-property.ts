'use server';

import { prisma } from '@/lib/prisma';
import { formDataToObject, formatZodErrors } from '@/lib/validation-helpers';
import { revalidatePath } from 'next/cache';
import { propertySchema } from '../types/schemas';

export async function updateProperty(id: string, formData: FormData) {
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

    const property = await prisma.property.update({
      where: { id },
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
      },
    });

    revalidatePath('/dashboard/properties');
    revalidatePath(`/dashboard/properties/${id}`);

    return {
      success: true,
      message: `Property "${property.name}" updated successfully`,
      property,
    };
  } catch (error) {
    console.error('Error updating property:', error);
    return {
      success: false,
      message: 'Failed to update property. Please try again.',
    };
  }
}
