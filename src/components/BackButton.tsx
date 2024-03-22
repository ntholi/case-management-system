'use client';

import ThemedButton from '@/components/ThemedButton';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BackButton() {
  const router = useRouter();
  return (
    <ThemedButton icon={<IconArrowLeft />} onClick={() => router.back()}>
      Back
    </ThemedButton>
  );
}
