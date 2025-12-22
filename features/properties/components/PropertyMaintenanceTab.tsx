import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Maintenance } from '@prisma/client';
import { Wrench } from 'lucide-react';

interface PropertyMaintenanceTabProps {
  maintenance: Maintenance[];
}

export function PropertyMaintenanceTab({
  maintenance,
}: PropertyMaintenanceTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Wrench className='h-5 w-5' />
          Maintenance History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {maintenance.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            No maintenance requests found.
          </p>
        ) : (
          <div className='space-y-4'>
            {maintenance.map((request) => (
              <div
                key={request.id}
                className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
              >
                <div>
                  <p className='font-medium'>{request.title}</p>
                  <p className='text-sm text-muted-foreground'>
                    {request.status} • {request.priority} Priority
                  </p>
                </div>
                <div className='text-sm text-muted-foreground'>
                  {formatDate(request.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
