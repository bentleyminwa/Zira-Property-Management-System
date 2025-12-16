import { cn } from '@/lib/utils';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your search or filters.',
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/10',
        className
      )}
      {...props}
    >
      <h3 className='mt-4 text-lg font-semibold'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  );
}
