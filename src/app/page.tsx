'use client';
import { Stack, Title, Text, Group } from '@mantine/core';
import { useSession } from 'next-auth/react';
import React, { Suspense } from 'react';
import Logo from './core/Logo';

export default function AdminPage() {
  return (
    <Stack h={'70vh'} w={'100%'} justify='center' align='center'>
      <div>
        <Group>
          <Logo size='lg' />
          <div>
            <Title size={'1.8rem'} fw={'lighter'}>
              GBV Management Information System
            </Title>
            <Suspense fallback={<Text>...</Text>}>
              <UserDisplay />
            </Suspense>
          </div>
        </Group>
      </div>
    </Stack>
  );
}

function UserDisplay() {
  const { data: session } = useSession();
  return (
    <Text size='sm' mt='xs'>
      Welcome, {session?.user?.name}
    </Text>
  );
}
