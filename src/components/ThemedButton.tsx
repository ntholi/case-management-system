'use client';
import {
  Button,
  ButtonProps,
  PolymorphicComponentProps,
  useComputedColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import React from 'react';

type Props = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  icon?: React.ReactNode;
} & ButtonProps;

export default function ThemedButton(props: Props) {
  const { children, type, href, icon, ...rest } = props;
  const colorScheme = useComputedColorScheme();
  if (href) {
    return (
      <Button
        color='dark'
        component={Link}
        leftSection={icon}
        href={href}
        variant={colorScheme === 'dark' ? 'default' : 'filled'}
        {...rest}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      color='dark'
      type={type}
      leftSection={icon}
      variant={colorScheme === 'dark' ? 'default' : 'filled'}
      {...rest}
    >
      {children}
    </Button>
  );
}
