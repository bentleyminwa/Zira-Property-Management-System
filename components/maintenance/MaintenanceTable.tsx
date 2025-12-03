import { Badge } from '@/components/ui/badge';
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

export function MaintenanceTable({
  maintenanceRequests,
}: MaintenanceTableProps) {
  const priorityColor = {
    LOW: 'bg-blue-100 text-blue-800 hover:bg-blue-100/80',
    MEDIUM: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80',
    HIGH: 'bg-red-100 text-red-800 hover:bg-red-100/80',
  };

  return (
    <div className='rounded-md border bg-card shadow-sm'>
      <div className='relative w-full overflow-auto'>
        <table className='w-full caption-bottom text-sm'>
          <thead className='[&_tr]:border-b'>
            <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Title
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Property
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Status
              </th>
              <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                Priority
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
            {maintenanceRequests.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className='p-4 text-center text-muted-foreground'
                >
                  No maintenance requests found.
                </td>
              </tr>
            ) : (
              maintenanceRequests.map((item) => (
                <tr
                  key={item.id}
                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                >
                  <td className='p-4 align-middle font-medium'>{item.title}</td>
                  <td className='p-4 align-middle'>{item.property.name}</td>
                  <td className='p-4 align-middle'>
                    <Badge variant='outline'>{item.status}</Badge>
                  </td>
                  <td className='p-4 align-middle'>
                    <Badge
                      variant='secondary'
                      className={`${
                        priorityColor[item.priority]
                      } border-none font-medium`}
                    >
                      {item.priority}
                    </Badge>
                  </td>
                  <td className='p-4 align-middle'>
                    {format(new Date(item.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className='p-4 align-middle text-right'>
                    <DataTableRowActions>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit request</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='text-destructive'>
                        Delete request
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
