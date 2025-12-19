import { Navbar } from '@/components/marketing/navbar';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-full bg-background'>
      <Navbar />
      <main className='pt-16 h-full'>{children}</main>
    </div>
  );
}
