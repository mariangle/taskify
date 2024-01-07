'use client';

import SettingsOverlay from '@/components/modals/settings-overlay';
import TaskOverlay from '@/components/modals/task-overlay';

import { useMounted } from '@/hooks/use-mounted';

export default function OverlayProvider() {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <>
      <SettingsOverlay />
      <TaskOverlay />
    </>
  );
}
