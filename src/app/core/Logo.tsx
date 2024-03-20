'use client';
import { Group, Image, MantineSize, Text } from '@mantine/core';
import Link from 'next/link';

type Props = {
  size?: MantineSize;
};

export default function Logo({ size = 'xs' }: Props) {
  const sizeMap = {
    xs: 20,
    sm: 30,
    md: 50,
    lg: 80,
    xl: 120,
  };

  return (
    <Link href='/'>
      <Group>
        <Image h={sizeMap[size]} src={'/logo.png'} alt='Logo' />
      </Group>
    </Link>
  );
}
