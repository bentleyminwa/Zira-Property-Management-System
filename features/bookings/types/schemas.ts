import { z } from 'zod';

export const bookingSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  tenantId: z.string().min(1, 'Tenant is required'),
  type: z.enum(['SHORT_TERM', 'LONG_TERM']),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  totalPrice: z.number().min(0, 'Price must be positive'),
  depositAmount: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
