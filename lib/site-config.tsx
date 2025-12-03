import {
  Building2,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  Wrench,
} from 'lucide-react';

export const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Bookings', href: '/bookings', icon: CalendarDays },
  { name: 'Tenants', href: '/tenants', icon: Users },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];
