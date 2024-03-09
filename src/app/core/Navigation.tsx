import {
  AppShell,
  Avatar,
  Box,
  Divider,
  NavLink,
  ScrollArea,
  Skeleton,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconChevronRight,
  IconHome,
  IconLogout2,
  IconSwords,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <AppShell.Navbar p='xs'>
      <AppShell.Section grow component={ScrollArea}>
        <NavLink
          label='Cases'
          component={Link}
          active={pathname.startsWith('/cases')}
          href={'/cases'}
          leftSection={<IconHome size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NavLink
          label='Crime Classifications'
          component={Link}
          active={pathname.startsWith('/crime-classifications')}
          href={'/crime-classifications'}
          leftSection={<IconHome size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NavLink
          label='Weapons'
          component={Link}
          active={pathname.startsWith('/weapons')}
          href={'/weapons'}
          leftSection={<IconSwords size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
      </AppShell.Section>
      <AppShell.Section>
        <Divider mb='md' />
        {status === 'loading' ? <Skeleton my={18} h={40} /> : <UserButton />}
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

function UserButton() {
  const { data: session } = useSession();

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm logout',
      children: 'Are you sure you want to logout?',
      confirmProps: { color: 'dark' },
      labels: { confirm: 'Logout', cancel: 'Cancel' },
      onConfirm: () => signOut(),
    });

  return (
    <NavLink
      label='Logout'
      description={session?.user?.name}
      onClick={openModal}
      leftSection={<Avatar src={session?.user?.image} />}
      rightSection={<IconLogout2 size='1.1rem' />}
    />
  );
}
