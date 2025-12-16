import { ReactNode } from 'react';
import { EmptyState } from './empty-state';

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  emptyMessage?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  getRowKey: (item: T) => string;
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage,
  emptyTitle = 'No data found',
  emptyDescription = 'Try adjusting your search or filters.',
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div className='rounded-md border bg-card shadow-sm'>
      <div className='relative w-full overflow-auto'>
        <table className='w-full caption-bottom text-sm'>
          <thead className='[&_tr]:border-b'>
            <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`h-12 px-4 align-middle font-medium text-muted-foreground ${
                    column.align === 'right'
                      ? 'text-right'
                      : column.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='[&_tr:last-child]:border-0'>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='text-center text-muted-foreground'
                >
                  <EmptyState
                    title={emptyMessage || emptyTitle}
                    description={emptyDescription}
                    className='border-0 bg-transparent py-8'
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={getRowKey(item)}
                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`p-4 align-middle ${
                        column.align === 'right'
                          ? 'text-right'
                          : column.align === 'center'
                          ? 'text-center'
                          : ''
                      }`}
                    >
                      {column.cell
                        ? column.cell(item)
                        : column.accessorKey
                        ? String(item[column.accessorKey])
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
