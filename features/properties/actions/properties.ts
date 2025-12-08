'use server';

import prisma from '@/lib/prisma';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createProperty(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const address = formData.get('address') as string;
  const price = parseFloat(formData.get('price') as string);
  const type = formData.get('type') as PropertyType;
  const status = formData.get('status') as PropertyStatus;
  const sizeStr = formData.get('size') as string | null;
  const bedroomsStr = formData.get('bedrooms') as string | null;
  const bathroomsStr = formData.get('bathrooms') as string | null;
  const image = formData.get('image') as string | null;

  // Parse optional numeric fields
  const size = sizeStr && sizeStr.trim() ? parseFloat(sizeStr) : null;
  const bedrooms =
    bedroomsStr && bedroomsStr.trim() ? parseInt(bedroomsStr, 10) : null;
  const bathrooms =
    bathroomsStr && bathroomsStr.trim() ? parseInt(bathroomsStr, 10) : null;

  await prisma.property.create({
    data: {
      name,
      description: description && description.trim() ? description : null,
      address,
      price,
      type,
      status,
      size,
      bedrooms,
      bathrooms,
      image: image && image.trim() ? image : null,
    },
  });

  revalidatePath('/properties');
}

export async function updateProperty(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const address = formData.get('address') as string;
  const price = parseFloat(formData.get('price') as string);
  const type = formData.get('type') as PropertyType;
  const status = formData.get('status') as PropertyStatus;
  const sizeStr = formData.get('size') as string | null;
  const bedroomsStr = formData.get('bedrooms') as string | null;
  const bathroomsStr = formData.get('bathrooms') as string | null;
  const image = formData.get('image') as string | null;

  // Parse optional numeric fields
  const size = sizeStr && sizeStr.trim() ? parseFloat(sizeStr) : null;
  const bedrooms =
    bedroomsStr && bedroomsStr.trim() ? parseInt(bedroomsStr, 10) : null;
  const bathrooms =
    bathroomsStr && bathroomsStr.trim() ? parseInt(bathroomsStr, 10) : null;

  await prisma.property.update({
    where: { id },
    data: {
      name,
      description: description && description.trim() ? description : null,
      address,
      price,
      type,
      status,
      size,
      bedrooms,
      bathrooms,
      image: image && image.trim() ? image : null,
    },
  });

  revalidatePath('/properties');
  revalidatePath(`/properties/${id}`);
}
