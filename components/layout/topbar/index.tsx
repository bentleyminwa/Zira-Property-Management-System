import { UserButton } from '@clerk/nextjs';
import BreadcrumbComponent from './BreadcrumbComponent';
import Messages from './Messages';
import Notifications from './Notifications';

export default function TopBar() {
  return (
    <header className='flex h-16 items-center justify-between border-b border-border bg-card px-6'>
      <BreadcrumbComponent />

      <div className='flex items-center gap-4'>
        <Messages />
        <Notifications />
        <UserButton />
      </div>
    </header>
  );
}
