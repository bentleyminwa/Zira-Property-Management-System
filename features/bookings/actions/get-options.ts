'use server';

import { prisma } from '@/lib/prisma';
import { serializeDecimal } from '@/lib/utils';

export async function getBookingOptions() {
  const [properties, tenants] = await Promise.all([
    prisma.property.findMany({
      select: { id: true, name: true, price: true },
      where: { status: 'AVAILABLE' },
    }),
    prisma.tenant.findMany({
      select: { id: true, firstName: true, lastName: true },
    }),
  ]);

  return {
    properties: serializeDecimal(properties) as {
      id: string;
      name: string;
      price: number;
    }[],
    tenants,
  };
}
