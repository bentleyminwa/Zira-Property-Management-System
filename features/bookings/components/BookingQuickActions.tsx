import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  approveBooking,
  completeBooking,
  rejectBooking,
} from '@/features/bookings/actions';
import { Booking } from '@prisma/client';
import { CheckCircle, XCircle } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

interface BookingQuickActionsProps {
  booking: Booking;
}

export function BookingQuickActions({ booking }: BookingQuickActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (
    action: (id: string, notes?: string) => Promise<any>,
    successMessage: string
  ) => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        const result = await action(booking.id);
        if (result.success) {
          toast.success(successMessage);
        } else {
          toast.error(result.message || 'Action failed');
        }
      } catch (error) {
        toast.error('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    });
  };

  if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {booking.status === 'PENDING' && (
          <>
            <Button
              className='w-full bg-green-600 hover:bg-green-700'
              disabled={isPending || isLoading}
              onClick={() => handleAction(approveBooking, 'Booking approved')}
            >
              <CheckCircle className='mr-2 h-4 w-4' />
              Approve Booking
            </Button>
            <Button
              variant='destructive'
              className='w-full'
              disabled={isPending || isLoading}
              onClick={() => handleAction(rejectBooking, 'Booking rejected')}
            >
              <XCircle className='mr-2 h-4 w-4' />
              Reject Booking
            </Button>
          </>
        )}

        {booking.status === 'CONFIRMED' && (
          <>
            <Button
              className='w-full'
              disabled={isPending || isLoading}
              onClick={() => handleAction(completeBooking, 'Booking completed')}
            >
              <CheckCircle className='mr-2 h-4 w-4' />
              Mark as Completed
            </Button>
            <Button
              variant='outline'
              className='w-full text-destructive hover:bg-destructive/10'
              disabled={isPending || isLoading}
              onClick={() => handleAction(rejectBooking, 'Booking cancelled')}
            >
              <XCircle className='mr-2 h-4 w-4' />
              Cancel Booking
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
