import { Badge } from '@/components/ui/badge';
import { ColumnDef, DataTable } from '@/components/ui/DataTable';
import { DataTableRowActions } from '@/components/ui/DataTableRowActions';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';
import { Booking, Payment, Property, Tenant } from '@prisma/client';
import { format } from 'date-fns';

type PaymentWithRelations = Payment & {
  booking: Booking & {
    property: Property;
  };
  tenant: Tenant;
};

interface PaymentTableProps {
  payments: PaymentWithRelations[];
}

const columns: ColumnDef<PaymentWithRelations>[] = [
  {
    header: 'Reference',
    cell: (payment) => (
      <div>
        <div className='font-medium'>{payment.reference || 'N/A'}</div>
        <div className='text-xs text-muted-foreground'>
          {payment.id.slice(0, 8)}
        </div>
      </div>
    ),
  },
  {
    header: 'Tenant',
    cell: (payment) => (
      <div>
        <div className='font-medium'>
          {payment.tenant.firstName} {payment.tenant.lastName}
        </div>
        <div className='text-xs text-muted-foreground'>
          {payment.tenant.email}
        </div>
      </div>
    ),
  },
  {
    header: 'Property',
    cell: (payment) => (
      <div>
        <div className='font-medium'>{payment.booking.property.name}</div>
        <div className='text-xs text-muted-foreground hidden sm:block'>
          {payment.booking.property.address}
        </div>
      </div>
    ),
  },
  {
    header: 'Type',
    cell: (payment) => <Badge variant='outline'>{payment.type}</Badge>,
  },
  {
    header: 'Method',
    cell: (payment) => <span className='text-sm'>{payment.method}</span>,
  },
  {
    header: 'Status',
    cell: (payment) => (
      <Badge
        variant={
          payment.status === 'COMPLETED'
            ? 'default'
            : payment.status === 'PENDING'
            ? 'outline'
            : payment.status === 'FAILED'
            ? 'destructive'
            : 'secondary'
        }
      >
        {payment.status}
      </Badge>
    ),
  },
  {
    header: 'Amount',
    align: 'right',
    cell: (payment) => (
      <span className='font-medium'>
        {formatCurrency(Number(payment.amount))}
      </span>
    ),
  },
  {
    header: 'Date',
    cell: (payment) => (
      <div>
        <div className='whitespace-nowrap'>
          {format(new Date(payment.date), 'MMM d, yyyy')}
        </div>
        <div className='text-xs text-muted-foreground'>
          {format(new Date(payment.date), 'h:mm a')}
        </div>
      </div>
    ),
  },
  {
    header: 'Actions',
    align: 'right',
    cell: (payment) => (
      <DataTableRowActions>
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Edit payment</DropdownMenuItem>
        {payment.status === 'PENDING' && (
          <DropdownMenuItem>Mark as completed</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {payment.status === 'COMPLETED' && (
          <DropdownMenuItem className='text-destructive'>
            Refund payment
          </DropdownMenuItem>
        )}
        {payment.status === 'PENDING' && (
          <DropdownMenuItem className='text-destructive'>
            Mark as failed
          </DropdownMenuItem>
        )}
      </DataTableRowActions>
    ),
  },
];

export function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <DataTable
      columns={columns}
      data={payments}
      emptyMessage='No payments found.'
      getRowKey={(payment) => payment.id}
    />
  );
}
