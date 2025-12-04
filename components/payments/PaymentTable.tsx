import { Badge } from '@/components/ui/badge';
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

export function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <div className='rounded-md border bg-card shadow-sm'>
      <div className='relative w-full overflow-auto'>
        <table className='w-full caption-bottom text-sm'>
          <thead className='[&_tr]:border-b'>
            <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Reference
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Tenant
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Property
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Type
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Method
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Status
              </th>
              <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                Amount
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Date
              </th>
              <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='[&_tr:last-child]:border-0'>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className='p-4 text-center text-muted-foreground'
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                >
                  <td className='p-4 align-middle'>
                    <div className='font-medium'>
                      {payment.reference || 'N/A'}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {payment.id.slice(0, 8)}
                    </div>
                  </td>
                  <td className='p-4 align-middle'>
                    <div className='font-medium'>
                      {payment.tenant.firstName} {payment.tenant.lastName}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {payment.tenant.email}
                    </div>
                  </td>
                  <td className='p-4 align-middle'>
                    <div className='font-medium'>
                      {payment.booking.property.name}
                    </div>
                    <div className='text-xs text-muted-foreground hidden sm:block'>
                      {payment.booking.property.address}
                    </div>
                  </td>
                  <td className='p-4 align-middle'>
                    <Badge variant='outline'>{payment.type}</Badge>
                  </td>
                  <td className='p-4 align-middle'>
                    <span className='text-sm'>{payment.method}</span>
                  </td>
                  <td className='p-4 align-middle'>
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
                  </td>
                  <td className='p-4 align-middle text-right font-medium'>
                    {formatCurrency(Number(payment.amount))}
                  </td>
                  <td className='p-4 align-middle'>
                    <div className='whitespace-nowrap'>
                      {format(new Date(payment.date), 'MMM d, yyyy')}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {format(new Date(payment.date), 'h:mm a')}
                    </div>
                  </td>
                  <td className='p-4 align-middle text-right'>
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
