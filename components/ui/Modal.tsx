'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';

interface ModalProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footerContent?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'sm:max-w-[425px]',
  md: 'sm:max-w-[525px]',
  lg: 'sm:max-w-[725px]',
  xl: 'sm:max-w-[925px]',
};

export function Modal({
  trigger,
  title,
  description,
  children,
  footerContent,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  size = 'sm',
}: ModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange =
    controlledOnOpenChange !== undefined
      ? controlledOnOpenChange
      : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footerContent && <DialogFooter>{footerContent}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
