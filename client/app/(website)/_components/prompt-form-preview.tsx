'use client';

import PromptForm from '@/components/prompt-form';
import { useMounted } from '@/hooks/use-mounted';

export default function PromptFormPreview() {
  const isMounted = useMounted();
  if (isMounted) return <PromptForm preview />;
}
