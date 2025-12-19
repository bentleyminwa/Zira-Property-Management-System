import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function ClientPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-8'>
      <div className='space-y-4 max-w-3xl'>
        <h1 className='text-4xl md:text-5xl font-bold text-primary'>
          Welcome to Zira Client Portal
        </h1>
        <p className='text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto'>
          This is where tenants and property seekers can manage their bookings,
          view available properties, and contact property managers.
        </p>
      </div>

      <div className='p-8 border border-dashed border-border rounded-lg bg-card/50 max-w-xl'>
        <p className='text-sm text-muted-foreground italic lines-relaxed'>
          Placeholder: We are currently building the full client experience.
          Property managers can access the admin dashboard to manage listings.
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <Link href='/'>
          <Button variant='outline'>Back to Home</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}
