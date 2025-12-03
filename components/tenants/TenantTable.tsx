import { DataTableRowActions } from '@/components/ui/DataTableRowActions';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Tenant } from '@prisma/client';
import { format } from 'date-fns';

interface TenantTableProps {
  tenants: Tenant[];
}

export function TenantTable({ tenants }: TenantTableProps) {
  return (
    <div className='rounded-md border bg-card shadow-sm'>
      <div className='relative w-full overflow-auto'>
        <table className='w-full caption-bottom text-sm'>
          <thead className='[&_tr]:border-b'>
            <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Name
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Contact Info
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                ID Number
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Joined Date
              </th>
              <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='[&_tr:last-child]:border-0'>
            {tenants.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='p-4 text-center text-muted-foreground'
                >
                  No tenants found.
                </td>
              </tr>
            ) : (
              tenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                >
                  <td className='p-4 align-middle font-medium'>
                    {tenant.firstName} {tenant.lastName}
                  </td>
                  <td className='p-4 align-middle'>
                    <div className='flex flex-col'>
                      <span>{tenant.email}</span>
                      <span className='text-xs text-muted-foreground'>
                        {tenant.phone || '-'}
                      </span>
                    </div>
                  </td>
                  <td className='p-4 align-middle'>{tenant.idNumber || '-'}</td>
                  <td className='p-4 align-middle'>
                    {format(new Date(tenant.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className='p-4 align-middle text-right'>
                    <DataTableRowActions>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit tenant</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='text-destructive'>
                        Delete tenant
                      </DropdownMenuItem>
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
