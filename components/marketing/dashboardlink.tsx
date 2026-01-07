'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useUser } from '@clerk/nextjs';

export function DashboardLink() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const role =
    (user?.publicMetadata?.role as string) ||
    (user?.unsafeMetadata?.role as string) ||
    'CLIENT';

  const href =
    role === 'CLIENT'
      ? process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:5173'
      : '/dashboard';

  return (
    <Link href={href}>
      <Button variant='ghost'>Dashboard</Button>
    </Link>
  );
}
