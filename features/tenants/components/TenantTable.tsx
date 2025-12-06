'use client';

import { ColumnDef, DataTable } from '@/components/ui/DataTable';
import { DataTableRowActions } from '@/components/ui/DataTableRowActions';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Tenant } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

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
    cell: () => null, // Placeholder, will be replaced in component
  },
];

export function TenantTable({ tenants }: TenantTableProps) {
  const router = useRouter();

  const columnsWithActions: ColumnDef<Tenant>[] = [
    ...columns.slice(0, -1),
    {
      header: 'Actions',
      align: 'right',
      cell: (tenant) => (
        <DataTableRowActions>
          <DropdownMenuItem
            onClick={() => router.push(`/tenants/${tenant.id}`)}
          >
            View details
          </DropdownMenuItem>
          <DropdownMenuItem>Edit tenant</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-destructive'>
            Delete tenant
          </DropdownMenuItem>
        </DataTableRowActions>
      ),
    },
  ];

  return (
    <DataTable
      columns={columnsWithActions}
      data={tenants}
      emptyMessage='No tenants found.'
      getRowKey={(tenant) => tenant.id}
    />
  );
}
