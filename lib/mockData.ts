export const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@zira.com',
  avatarUrl: 'https://github.com/shadcn.png', // Placeholder
  role: 'Admin',
};

export const mockNotifications = [
  {
    id: 1,
    title: 'New Booking',
    description: 'A new booking has been made for Property A.',
    time: '2 mins ago',
    read: false,
  },
  {
    id: 2,
    title: 'Maintenance Request',
    description: 'Tenant reported a leaky faucet in Unit 101.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'Payment Received',
    description: 'Rent payment received from John Smith.',
    time: '3 hours ago',
    read: true,
  },
];

export const mockMessages = [
  {
    id: 1,
    sender: 'John Smith',
    content: 'Hi, I have a question about my lease.',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 2,
    sender: 'Alice Johnson',
    content: 'When is the next maintenance scheduled?',
    time: '1 day ago',
    read: true,
  },
];
