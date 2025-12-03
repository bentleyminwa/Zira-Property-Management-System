import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';
import { Booking, Property, Tenant } from '@prisma/client';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

type BookingWithRelations = Booking & {
  property: Property;
  tenant: Tenant;
};

interface BookingTableProps {
  bookings: BookingWithRelations[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  return (
    <div className='rounded-md border bg-card shadow-sm'>
      <div className='relative w-full overflow-auto'>
        <table className='w-full caption-bottom text-sm'>
          <thead className='[&_tr]:border-b'>
            <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Property
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Tenant
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Dates
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Status
              </th>
              <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                Amount
              </th>
              <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='[&_tr:last-child]:border-0'>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className='p-4 text-center text-muted-foreground'
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                >
                  <td className='p-4 align-middle'>
                    <div className='font-medium'>{booking.property.name}</div>
                    <div className='text-xs text-muted-foreground hidden sm:block'>
                      {booking.property.address}
                    </div>
                  </td>
                  <td className='p-4 align-middle'>
                    <div className='font-medium'>
                      {booking.tenant.firstName} {booking.tenant.lastName}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {booking.tenant.email}
                    </div>
                  </td>
                  <td className='p-4 align-middle'>
                    <div className='flex flex-col gap-1'>
                      <span className='whitespace-nowrap'>
                        {format(new Date(booking.startDate), 'MMM d, yyyy')}
                      </span>
                      <span className='text-xs text-muted-foreground'>to</span>
                      <span className='whitespace-nowrap'>
                        {format(new Date(booking.endDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </td>
                  <td className='p-4 align-middle'>
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
                  </td>
                  <td className='p-4 align-middle text-right font-medium'>
                    {formatCurrency(Number(booking.totalPrice))}
                  </td>
                  <td className='p-4 align-middle text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit booking</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-destructive'>
                          Cancel booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
