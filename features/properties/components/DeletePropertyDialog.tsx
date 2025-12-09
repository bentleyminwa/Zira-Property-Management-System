'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { Booking, Maintenance, Property } from '@prisma/client';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteProperty } from '../actions';

interface DeletePropertyDialogProps {
  property: Property & {
    bookings: Booking[];
    maintenance: Maintenance[];
  };
}

export function DeletePropertyDialog({ property }: DeletePropertyDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const bookingsCount = property.bookings.length;
  const maintenanceCount = property.maintenance.length;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteProperty(property.id);

      if (result.success) {
        toast.success(result.message);
        // Redirect to properties list
        router.push('/properties');
        router.refresh();
      } else {
        const errorMessage = result.error || 'Failed to delete property.';
        setError(errorMessage);
        toast.error(errorMessage);
        setIsDeleting(false);
      }
    } catch (err) {
      console.error('Error deleting property:', err);
      const errorMessage = 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      size='md'
      trigger={
        <Button variant='destructive' size='sm'>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </Button>
      }
      title={
        <div className='flex items-center gap-2'>
          <AlertTriangle className='h-5 w-5 text-destructive' />
          Delete Property
        </div>
      }
      description={
        <div className='space-y-3 pt-2'>
          <p>
            Are you sure you want to delete{' '}
            <span className='font-semibold text-foreground'>
              {property.name}
            </span>
            ? This action cannot be undone.
          </p>
          {(bookingsCount > 0 || maintenanceCount > 0) && (
            <div className='rounded-md border border-destructive/50 bg-destructive/10 p-3'>
              <p className='font-semibold text-destructive'>
                The following related records will also be deleted:
              </p>
              <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-destructive/90'>
                {bookingsCount > 0 && (
                  <li>
                    {bookingsCount} booking{bookingsCount !== 1 ? 's' : ''}{' '}
                    (including associated payments)
                  </li>
                )}
                {maintenanceCount > 0 && (
                  <li>
                    {maintenanceCount} maintenance request
                    {maintenanceCount !== 1 ? 's' : ''}
                  </li>
                )}
              </ul>
            </div>
          )}
          {error && (
            <div className='rounded-md border border-destructive bg-destructive/10 p-3'>
              <p className='text-sm text-destructive'>{error}</p>
            </div>
          )}
        </div>
      }
      footerContent={
        <>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete Property
              </>
            )}
          </Button>
        </>
      }
    >
      {/* Modal content is in description */}
    </Modal>
  );
}
