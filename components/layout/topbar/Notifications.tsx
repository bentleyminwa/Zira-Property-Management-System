import DialogCompact from '@/components/ui/dialog-compact';
import { mockNotifications } from '@/lib/mockData';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <DialogCompact
      icon={<Bell size={20} />}
      label='Notifications'
      unreadCount={mockNotifications.filter((m) => !m.read).length}
    >
      {mockNotifications.map((notif) => (
        <div key={notif.id} className='border-b pb-2 last:border-0'>
          <div className='flex justify-between'>
            <span className='font-semibold'>{notif.title}</span>
            <span className='text-xs text-muted-foreground'>{notif.time}</span>
          </div>
          <p className='text-sm text-muted-foreground'>{notif.description}</p>
        </div>
      ))}
    </DialogCompact>
  );
};

export default Notifications;
