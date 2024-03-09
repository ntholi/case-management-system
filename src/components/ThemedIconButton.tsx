'use client';
import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
} from '@mantine/core';
import Link from 'next/link';

type Props = {
  href?: string;
  onClick?: () => void;
} & ActionIconProps;

export default function ThemedIconButton({ children, href, ...props }: Props) {
  const colorScheme = useComputedColorScheme();

  if (href) {
    return (
      <ActionIcon
        color='dark'
        component={Link}
        href={href}
        variant={colorScheme === 'dark' ? 'default' : 'filled'}
        {...props}
      >
        {children}
      </ActionIcon>
    );
  }

  return (
    <ActionIcon
      color='dark'
      variant={colorScheme === 'dark' ? 'default' : 'filled'}
      {...props}
    >
      {children}
    </ActionIcon>
  );
}
