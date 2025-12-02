'use server';

import prisma from '@/lib/prisma';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createProperty(formData: FormData) {
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const price = parseFloat(formData.get('price') as string);
  const type = formData.get('type') as PropertyType;
  const status = formData.get('status') as PropertyStatus;

  await prisma.property.create({
    data: {
      name,
      address,
      price,
      type,
      status,
    },
  });

  revalidatePath('/properties');
}
