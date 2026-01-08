import DialogCompact from '@/components/ui/dialog-compact';
import { mockMessages } from '@/lib/mockData';
import { Mail } from 'lucide-react';

const Messages = () => {
  return (
    <DialogCompact
      icon={<Mail size={20} />}
      label='Messages'
      unreadCount={mockMessages.filter((m) => !m.read).length}
    >
      {mockMessages.map((msg) => (
        <div key={msg.id} className='border-b pb-2 last:border-0'>
          <div className='flex justify-between'>
            <span className='font-semibold'>{msg.sender}</span>
            <span className='text-xs text-muted-foreground'>{msg.time}</span>
          </div>
          <p className='text-sm text-muted-foreground'>{msg.content}</p>
        </div>
      ))}
    </DialogCompact>
  );
};

export default Messages;
