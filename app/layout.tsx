import AppLayout from '@/components/layout/AppLayout';
import { ThemeProvider } from '@/components/theme-provider';
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
    <html lang='en'>
      <body
        className={`${quicksand.className} antialiased bg-background text-foreground`}
      >
        <ThemeProvider defaultTheme='light' storageKey='zira-theme'>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
