'use client';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

type Props = {
  action: () => Promise<void>;
} & ActionIconProps;

export default function DeleteIconButton({ action, ...props }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }
  return (
    <ActionIcon
      variant='light'
      color='red'
      loading={isPending}
      onClick={handleDelete}
      {...props}
    >
      <IconTrashFilled size={'1rem'} />
    </ActionIcon>
  );
}
