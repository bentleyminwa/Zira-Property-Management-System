import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center space-y-8'>
      <div className='space-y-4 max-w-3xl'>
        <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
          Modern Property Management Simplified
        </h1>
        <p className='text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto'>
          Zira PMS provides everything you need to manage your properties,
          tenants, and finances in one minimal, powerful dashboard.
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <Link href='/auth/signup'>
          <Button size='lg' className='text-lg px-8 h-12'>
            Start Managing Now
          </Button>
        </Link>
        <Link href='/auth/signin'>
          <Button size='lg' variant='outline' className='text-lg px-8 h-12'>
            View Demo
          </Button>
        </Link>
      </div>

      {/* Feature Grid or Image could go here */}
      <div className='mt-16 w-full max-w-5xl aspect-video rounded-xl border border-border bg-card/50 shadow-2xl flex items-center justify-center text-muted-foreground'>
        App Screenshot Placeholder
      </div>
    </div>
  );
}
