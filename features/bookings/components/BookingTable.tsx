'use client';

import { Badge } from '@/components/ui/badge';
import { ColumnDef, DataTable } from '@/components/ui/DataTable';
import { DataTableRowActions } from '@/components/ui/DataTableRowActions';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';
import { Booking, Property, Tenant } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

type BookingWithRelations = Booking & {
  property: Property;
  tenant: Tenant;
};

interface BookingTableProps {
  bookings: BookingWithRelations[];
}

const columns: ColumnDef<BookingWithRelations>[] = [
  {
    header: 'Property',
    cell: (booking) => (
      <div>
        <div className='font-medium'>{booking.property.name}</div>
        <div className='text-xs text-muted-foreground hidden sm:block'>
          {booking.property.address}
        </div>
      </div>
    ),
  },
  {
    header: 'Tenant',
    cell: (booking) => (
      <div>
        <div className='font-medium'>
          {booking.tenant.firstName} {booking.tenant.lastName}
        </div>
        <div className='text-xs text-muted-foreground'>
          {booking.tenant.email}
        </div>
      </div>
    ),
  },
  {
    header: 'Dates',
    cell: (booking) => (
      <div className='flex flex-col gap-1'>
        <span className='whitespace-nowrap'>
          {format(new Date(booking.startDate), 'MMM d, yyyy')}
        </span>
        <span className='text-xs text-muted-foreground'>to</span>
        <span className='whitespace-nowrap'>
          {format(new Date(booking.endDate), 'MMM d, yyyy')}
        </span>
      </div>
    ),
  },
  {
    header: 'Status',
    cell: (booking) => (
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
    ),
  },
  {
    header: 'Amount',
    align: 'right',
    cell: (booking) => (
      <span className='font-medium'>
        {formatCurrency(Number(booking.totalPrice))}
      </span>
    ),
  },
  {
    header: 'Actions',
    align: 'right',
    cell: () => (
      <DataTableRowActions>
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Edit booking</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-destructive'>
          Cancel booking
        </DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
];

export function BookingTable({ bookings }: BookingTableProps) {
  const router = useRouter();

  const columnsWithActions: ColumnDef<BookingWithRelations>[] = [
    ...columns.slice(0, -1), // All columns except Actions
    {
      header: 'Actions',
      align: 'right',
      cell: (booking) => (
        <DataTableRowActions>
          <DropdownMenuItem
            onClick={() => router.push(`/bookings/${booking.id}`)}
          >
            View details
          </DropdownMenuItem>
          <DropdownMenuItem>Edit booking</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-destructive'>
            Cancel booking
          </DropdownMenuItem>
        </DataTableRowActions>
      ),
    },
  ];

  return (
    <DataTable
      columns={columnsWithActions}
      data={bookings}
      emptyMessage='No bookings found.'
      getRowKey={(booking) => booking.id}
    />
  );
}
