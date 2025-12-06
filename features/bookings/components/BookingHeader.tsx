import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking } from '@prisma/client';
import { format } from 'date-fns';
import { ArrowLeft, Edit, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingHeaderProps {
  booking: Booking;
}

export function BookingHeader({ booking }: BookingHeaderProps) {
  const router = useRouter();

  return (
    <>
      <Button
        variant='ghost'
        className='gap-2 pl-0 hover:bg-transparent hover:text-primary'
        onClick={() => router.back()}
      >
        <ArrowLeft className='h-4 w-4' />
        Back
      </Button>

      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h1 className='text-3xl font-bold tracking-tight'>
              Booking #{booking.id.slice(-6)}
            </h1>
            <Badge
              variant={
                booking.status === 'CONFIRMED'
                  ? 'default'
                  : booking.status === 'COMPLETED'
                  ? 'secondary'
                  : booking.status === 'CANCELLED'
                  ? 'destructive'
                  : 'outline'
              }
            >
              {booking.status}
            </Badge>
          </div>
          <p className='text-muted-foreground'>
            Created {format(new Date(booking.createdAt), 'MMM d, yyyy')}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <Edit className='mr-2 h-4 w-4' />
            Edit
          </Button>
          {booking.status !== 'CANCELLED' && (
            <Button variant='destructive' size='sm'>
              <XCircle className='mr-2 h-4 w-4' />
              Cancel
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
