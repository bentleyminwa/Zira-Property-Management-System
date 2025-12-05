import { Skeleton } from '@/components/ui/skeleton';

export function KPISkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='p-6 border rounded-xl space-y-2'>
          <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-4 w-4' />
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-8 w-[100px]' />
            <Skeleton className='h-3 w-[150px]' />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <Skeleton className='col-span-4 h-[350px] rounded-xl' />
      <Skeleton className='col-span-3 h-[350px] rounded-xl' />
    </div>
  );
}

export function RecentActivitySkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <Skeleton className='col-span-3 h-[400px] rounded-xl' />
      <Skeleton className='col-span-4 h-[400px] rounded-xl' />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className='rounded-md border'>
      <div className='h-12 border-b px-4 flex items-center'>
        <Skeleton className='h-4 w-full' />
      </div>
      <div className='p-4 space-y-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='flex items-center space-x-4'>
            <Skeleton className='h-12 w-full' />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className='rounded-xl border bg-card text-card-foreground shadow'
        >
          <div className='flex flex-col space-y-1.5 p-6'>
            <Skeleton className='h-[200px] w-full rounded-md mb-4' />
            <Skeleton className='h-6 w-[200px]' />
            <Skeleton className='h-4 w-[150px]' />
          </div>
          <div className='p-6 pt-0'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-[80px]' />
              <Skeleton className='h-4 w-[60px]' />
            </div>
          </div>
          <div className='p-6 pt-0'>
            <Skeleton className='h-9 w-full' />
          </div>
        </div>
      ))}
    </div>
  );
}
