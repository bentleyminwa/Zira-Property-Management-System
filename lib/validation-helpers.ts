import { type ZodError } from 'zod';

/**
 * Converts FormData to a plain object with proper type coercion
 */
export function formDataToObject(formData: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    // Handle empty strings
    if (value === '' || value === null) {
      obj[key] = null;
      return;
    }

    // Try to parse as number for numeric fields
    if (
      key === 'price' ||
      key === 'size' ||
      key === 'bedrooms' ||
      key === 'bathrooms'
    ) {
      const numValue = parseFloat(value as string);
      obj[key] = isNaN(numValue) ? null : numValue;
      return;
    }

    // Default: keep as string
    obj[key] = value;
  });

  return obj;
}

/**
 * Formats Zod validation errors into a user-friendly message
 */
export function formatZodErrors(error: ZodError): string {
  const errors = error.issues.map((err) => {
    return err.message;
  });

  // Return the first error message for simplicity
  return errors[0] || 'Validation failed';
}

/**
 * Formats multiple Zod validation errors into a detailed message
 */
export function formatAllZodErrors(error: ZodError): string {
  const errors = error.issues.map((err) => {
    const field = err.path.join('.');
    const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
    return `${fieldName}: ${err.message}`;
  });

  return errors.join(', ');
}
