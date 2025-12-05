import { ColumnDef, DataTable } from '@/components/ui/DataTable';
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

const columns: ColumnDef<Tenant>[] = [
  {
    header: 'Name',
    cell: (tenant) => (
      <span className='font-medium'>
        {tenant.firstName} {tenant.lastName}
      </span>
    ),
  },
  {
    header: 'Contact Info',
    cell: (tenant) => (
      <div className='flex flex-col'>
        <span>{tenant.email}</span>
        <span className='text-xs text-muted-foreground'>
          {tenant.phone || '-'}
        </span>
      </div>
    ),
  },
  {
    header: 'ID Number',
    cell: (tenant) => tenant.idNumber || '-',
  },
  {
    header: 'Joined Date',
    cell: (tenant) => format(new Date(tenant.createdAt), 'MMM d, yyyy'),
  },
  {
    header: 'Actions',
    align: 'right',
    cell: () => (
      <DataTableRowActions>
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Edit tenant</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-destructive'>
          Delete tenant
        </DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
];

export function TenantTable({ tenants }: TenantTableProps) {
  return (
    <DataTable
      columns={columns}
      data={tenants}
      emptyMessage='No tenants found.'
      getRowKey={(tenant) => tenant.id}
    />
  );
}
