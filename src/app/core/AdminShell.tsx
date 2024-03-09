'use client';
import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Group,
  Loader,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import Logo from './Logo';
import Navigation from './Navigation';

export default function AdminShell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme('dark');

  const { status } = useSession();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md' justify='space-between'>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='md'
              size='sm'
            />
            <Logo size='sm' />
          </Group>
          <ActionIcon variant='default' size='lg'>
            {colorScheme === 'dark' ? (
              <IconSun onClick={() => setColorScheme('light')} />
            ) : (
              <IconMoon onClick={() => setColorScheme('dark')} />
            )}
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <Navigation />
      <AppShell.Main bg={colorScheme === 'dark' ? 'dark.8' : 'gray.0'}>
        {status === 'loading' ? (
          <Flex w={'100%'} justify={'center'} mt={250}>
            <Loader />
          </Flex>
        ) : status === 'authenticated' ? (
          children
        ) : (
          <Text>Please sign in</Text>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
