'use client';
import { MantineSize, Text, useComputedColorScheme } from '@mantine/core';
import Link from 'next/link';

type Props = {
  size?: MantineSize;
};

export default function Logo({ size = 'xs' }: Props) {
  const colorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const logo =
    colorScheme === 'dark'
      ? '/images/logo-white.png'
      : '/images/logo-black.png';

  const sizeMap = {
    xs: 15,
    sm: 20,
    md: 50,
    lg: 80,
    xl: 120,
  };

  return (
    <Link href='/'>
      {/* <Image
        component={NextImage}
        h={sizeMap[size]}
        width={sizeMap[size] * 5}
        height={sizeMap[size] * 2}
        src={logo}
        alt='Logo'
      /> */}
      <Text>Logo</Text>
    </Link>
  );
}
