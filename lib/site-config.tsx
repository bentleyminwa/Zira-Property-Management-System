import {
  bookingsPath,
  dashboardPath,
  maintenancePath,
  paymentsPath,
  propertiesPath,
  settingsPath,
  tenantsPath,
} from '@/paths';

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
  { name: 'Dashboard', href: dashboardPath, icon: LayoutDashboard },
  { name: 'Properties', href: propertiesPath, icon: Building2 },
  { name: 'Bookings', href: bookingsPath, icon: CalendarDays },
  { name: 'Tenants', href: tenantsPath, icon: Users },
  { name: 'Maintenance', href: maintenancePath, icon: Wrench },
  { name: 'Payments', href: paymentsPath, icon: CreditCard },
  { name: 'Settings', href: settingsPath, icon: Settings },
];
