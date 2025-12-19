import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center px-4 md:px-8'>
      <div className='flex items-center gap-2 flex-1'>
        <div className='relative h-8 w-8'>
          <Image
            src='/logo.svg'
            alt='Zira PMS'
            fill
            className='object-contain'
          />
        </div>
        <span className='font-bold text-xl text-primary'>Zira PMS</span>
      </div>

      <div className='flex items-center gap-4'>
        <SignedOut>
          <Link href='/sign-in'>
            <Button variant='ghost'>Sign In</Button>
          </Link>
          <Link href='/sign-up'>
            <Button>Get Started</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href='/dashboard'>
            <Button variant='ghost'>Dashboard</Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
