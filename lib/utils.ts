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
export function serializeDecimal(obj: any): any {
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
  if (typeof obj.toNumber === 'function') {
    return obj.toNumber();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serializeDecimal(item));
  }

  const newObj: any = {};
  for (const key in obj) {
    // Skip internal React properties or other non-data keys if necessary,
    // but verifying own property is usually enough.
    // Also explicitly skip functions to avoid "Functions cannot be passed..." errors
    // if a data object happens to have a function property.
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'function') {
        continue;
      }
      newObj[key] = serializeDecimal(value);
    }
  }
  return newObj;
}
