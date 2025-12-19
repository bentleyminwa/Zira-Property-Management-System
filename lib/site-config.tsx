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
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Properties', href: '/dashboard/properties', icon: Building2 },
  { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarDays },
  { name: 'Tenants', href: '/dashboard/tenants', icon: Users },
  { name: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];
