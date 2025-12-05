import { Badge } from '@/components/ui/badge';
import { ColumnDef, DataTable } from '@/components/ui/DataTable';
import { DataTableRowActions } from '@/components/ui/DataTableRowActions';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Maintenance, Property } from '@prisma/client';
import { format } from 'date-fns';

type MaintenanceWithProperty = Maintenance & {
  property: Property;
};

interface MaintenanceTableProps {
  maintenanceRequests: MaintenanceWithProperty[];
}

const priorityColor = {
  LOW: 'bg-blue-100 text-blue-800 hover:bg-blue-100/80',
  MEDIUM: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80',
  HIGH: 'bg-red-100 text-red-800 hover:bg-red-100/80',
};

const columns: ColumnDef<MaintenanceWithProperty>[] = [
  {
    header: 'Title',
    cell: (item) => <span className='font-medium'>{item.title}</span>,
  },
  {
    header: 'Property',
    cell: (item) => item.property.name,
  },
  {
    header: 'Status',
    cell: (item) => <Badge variant='outline'>{item.status}</Badge>,
  },
  {
    header: 'Priority',
    cell: (item) => (
      <Badge
        variant='secondary'
        className={`${priorityColor[item.priority]} border-none font-medium`}
      >
        {item.priority}
      </Badge>
    ),
  },
  {
    header: 'Date',
    cell: (item) => format(new Date(item.createdAt), 'MMM d, yyyy'),
  },
  {
    header: 'Actions',
    align: 'right',
    cell: () => (
      <DataTableRowActions>
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Edit request</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-destructive'>
          Delete request
        </DropdownMenuItem>
      </DataTableRowActions>
    ),
  },
];

export function MaintenanceTable({
  maintenanceRequests,
}: MaintenanceTableProps) {
  return (
    <DataTable
      columns={columns}
      data={maintenanceRequests}
      emptyMessage='No maintenance requests found.'
      getRowKey={(item) => item.id}
    />
  );
}
