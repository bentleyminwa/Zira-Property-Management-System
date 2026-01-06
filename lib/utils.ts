import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date | string | number) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Serializes Prisma Decimal objects to numbers recursively.
 * Also handles Date objects by converting to ISO string to ensure serializability.
 */
export function serializeDecimal(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return obj.toISOString();
  }

  // Handle Prisma Decimal objects (duck typing)
  if (
    'toNumber' in obj &&
    typeof (obj as { toNumber: unknown }).toNumber === 'function'
  ) {
    return (obj as { toNumber: () => unknown }).toNumber();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serializeDecimal(item));
  }

  const newObj: Record<string, unknown> = {};
  const record = obj as Record<string, unknown>;
  for (const key in record) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      const value = record[key];
      if (typeof value === 'function') {
        continue;
      }
      newObj[key] = serializeDecimal(value);
    }
  }
  return newObj;
}
