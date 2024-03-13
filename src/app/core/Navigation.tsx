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
  IconBuilding,
  IconBuildingBank,
  IconCategory,
  IconChartInfographic,
  IconChevronRight,
  IconHome,
  IconLogout2,
  IconSubtask,
  IconSwords,
  IconUsers,
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
          label='Case Management'
          component={Link}
          active={pathname.startsWith('/case-status')}
          href={'/case-status'}
          leftSection={<IconSubtask size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <NavLink
          label='Crime Classifications'
          component={Link}
          active={pathname.startsWith('/crime-classifications')}
          href={'/crime-classifications'}
          leftSection={<IconCategory size='1.1rem' />}
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
        <NavLink
          label='Police Stations'
          component={Link}
          active={pathname.startsWith('/police-stations')}
          href={'/police-stations'}
          leftSection={<IconBuildingBank size='1.1rem' />}
          rightSection={<IconChevronRight size='0.8rem' stroke={1.5} />}
        />
        <Divider mt={'lg'} mb={'sm'} />
        <NavLink
          label='Users'
          component={Link}
          active={pathname.startsWith('/users')}
          href={'/users'}
          leftSection={<IconUsers size='1.1rem' />}
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
