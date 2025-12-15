import { cn } from '@/lib/utils';
import React from 'react';

interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function FormError({ message, className, ...props }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className={cn('text-sm text-destructive mt-1', className)} {...props}>
      {message}
    </p>
  );
}
