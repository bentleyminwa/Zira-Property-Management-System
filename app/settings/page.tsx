'use client';

import { AccountForm } from '@/components/settings/AccountForm';
import { AppearanceForm } from '@/components/settings/AppearanceForm';
import { NotificationsForm } from '@/components/settings/NotificationsForm';
import { ProfileForm } from '@/components/settings/ProfileForm';
import { SettingsLayout } from '@/components/settings/SettingsLayout';
import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'profile' && <ProfileForm />}
      {activeTab === 'account' && <AccountForm />}
      {activeTab === 'appearance' && <AppearanceForm />}
      {activeTab === 'notifications' && <NotificationsForm />}
    </SettingsLayout>
  );
}
