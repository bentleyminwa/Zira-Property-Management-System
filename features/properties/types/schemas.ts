import { ListingType, PropertyStatus, PropertyType } from '@prisma/client';
import { z } from 'zod';

export const propertySchema = z.object({
  name: z
    .string({ message: 'Property name must be a string' })
    .min(1, 'Property name is required')
    .max(255, 'Property name must be less than 255 characters'),

  address: z
    .string({ message: 'Address must be a string' })
    .min(1, 'Address is required')
    .max(500, 'Address must be less than 500 characters'),

  price: z
    .union([z.string(), z.number()])
    .pipe(z.coerce.number({ message: 'Price must be a number' }))
    .refine((val) => val > 0, { message: 'Price must be greater than 0' }),

  type: z.enum(PropertyType, {
    message: 'Invalid property type',
  }),

  status: z.enum(PropertyStatus, {
    message: 'Invalid property status',
  }),

  listingType: z.enum(ListingType, {
    message: 'Invalid listing type',
  }),

  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .or(z.literal('')),

  size: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === '' || val === null || val === undefined) return null;
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return isNaN(num) ? null : num;
    })
    .refine((val) => val === null || val > 0, {
      message: 'Size must be greater than 0',
    })
    .nullable(),

  bedrooms: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === '' || val === null || val === undefined) return null;
      const num = typeof val === 'string' ? parseInt(val, 10) : val;
      return isNaN(num) ? null : num;
    })
    .refine((val) => val === null || (Number.isInteger(val) && val >= 0), {
      message: 'Bedrooms must be a non-negative whole number',
    })
    .nullable(),

  bathrooms: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === '' || val === null || val === undefined) return null;
      const num = typeof val === 'string' ? parseInt(val, 10) : val;
      return isNaN(num) ? null : num;
    })
    .refine((val) => val === null || (Number.isInteger(val) && val >= 0), {
      message: 'Bathrooms must be a non-negative whole number',
    })
    .nullable(),

  image: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Image must be a valid URL' }
    )
    .or(z.literal('')),
});

export type PropertyFormData = z.input<typeof propertySchema>;
