import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Maintenance } from '@prisma/client';
import { format } from 'date-fns';
import { AlertCircle, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface MaintenanceInfoProps {
  maintenance: Maintenance;
}

const statusConfig = {
  OPEN: {
    label: 'Open',
    icon: AlertCircle,
    color: 'text-blue-600',
    badge: 'outline',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    icon: Clock,
    color: 'text-yellow-600',
    badge: 'secondary',
  },
  RESOLVED: {
    label: 'Resolved',
    icon: CheckCircle2,
    color: 'text-green-600',
    badge: 'default',
  },
  CLOSED: {
    label: 'Closed',
    icon: CheckCircle2,
    color: 'text-gray-600',
    badge: 'secondary',
  },
} as const;

const priorityColor = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
};

export function MaintenanceInfo({ maintenance }: MaintenanceInfoProps) {
  const status = statusConfig[maintenance.status];
  const StatusIcon = status.icon;

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <StatusIcon className={`h-5 w-5 ${status.color}`} />
            Maintenance Request Info
          </CardTitle>
          <Badge
            variant='secondary'
            className={`${
              priorityColor[maintenance.priority]
            } border-none font-medium`}
          >
            {maintenance.priority} Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4 rounded-lg border p-4 bg-muted/20'>
          <div>
            <h3 className='font-semibold text-lg'>{maintenance.title}</h3>
            <p className='text-muted-foreground mt-1 whitespace-pre-wrap'>
              {maintenance.description}
            </p>
          </div>

          <div className='flex flex-wrap gap-4 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Calendar className='h-4 w-4' />
              <span>
                Reported{' '}
                {format(new Date(maintenance.createdAt), 'MMM d, yyyy')}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <span className='font-medium text-muted-foreground'>Status:</span>
              <Badge
                variant={
                  status.badge as
                    | 'default'
                    | 'secondary'
                    | 'destructive'
                    | 'outline'
                }
              >
                {status.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div>
            <p className='text-muted-foreground mb-1'>Last Updated</p>
            <p className='font-medium'>
              {format(new Date(maintenance.updatedAt), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1'>Request ID</p>
            <p className='font-mono text-xs'>{maintenance.id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
