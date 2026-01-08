import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DialogCompactProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  label: string;
  unreadCount?: number;
}

const DialogCompact = ({
  icon,
  children,
  label,
  unreadCount = 0,
}: DialogCompactProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          {icon}
          {unreadCount > 0 && (
            <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500' />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            You have {unreadCount} unread
            {label}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCompact;
