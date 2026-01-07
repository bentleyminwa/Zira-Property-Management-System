'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUp } from '@clerk/nextjs';
import { Building2, User } from 'lucide-react';
import { useState } from 'react';

export default function SignUpPage() {
  const [role, setRole] = useState<'CLIENT' | 'ADMIN' | null>(null);

  if (role === null) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] p-4'>
        <div className='max-w-2xl w-full space-y-8 text-center'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold'>Join Zira PMS</h1>
            <p className='text-muted-foreground'>
              Choose how you want to use the platform
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card
              className={`cursor-pointer transition-all hover:border-primary border-2 ${
                role === 'CLIENT'
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent'
              }`}
              onClick={() => setRole('CLIENT')}
            >
              <CardHeader className='flex items-center justify-center pt-8'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
                  <User className='h-6 w-6 text-primary' />
                </div>
                <CardTitle className='mt-4'>Client / Tenant</CardTitle>
                <CardDescription>
                  I want to find and manage my rentals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:border-primary border-2 ${
                role === 'ADMIN'
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent'
              }`}
              onClick={() => setRole('ADMIN')}
            >
              <CardHeader className='flex items-center justify-center pt-8'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
                  <Building2 className='h-6 w-6 text-primary' />
                </div>
                <CardTitle className='mt-4'>Manager / Admin</CardTitle>
                <CardDescription>
                  I want to manage properties and teams
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] p-4'>
      <div className='relative'>
        <Button
          variant='ghost'
          className='absolute -top-12 left-0'
          onClick={() => setRole(null)}
        >
          &larr; Back to selection
        </Button>
        <SignUp
          signInUrl='/sign-in'
          forceRedirectUrl={
            role === 'CLIENT'
              ? process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:5173'
              : '/dashboard'
          }
          unsafeMetadata={{ role }}
        />
      </div>
    </div>
  );
}
