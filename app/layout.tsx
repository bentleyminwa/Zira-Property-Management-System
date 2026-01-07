import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';

import { Quicksand } from 'next/font/google';
import './globals.css';

const quicksand = Quicksand({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zira PMS',
  description: 'Zira Property Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl='https://zira-homes-pm.vercel.app/'>
      <html lang='en'>
        <body
          className={`${quicksand.className} antialiased bg-background text-foreground`}
        >
          <ThemeProvider defaultTheme='light' storageKey='zira-theme'>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
