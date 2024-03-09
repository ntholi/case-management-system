'use client';
import { Button, ButtonProps, useComputedColorScheme } from '@mantine/core';
import React from 'react';

type Props = {
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
} & ButtonProps;

export default function ThemedButton({ children, type, ...props }: Props) {
  const colorScheme = useComputedColorScheme();
  return (
    <Button
      color='dark'
      type={type}
      variant={colorScheme === 'dark' ? 'default' : 'filled'}
      {...props}
    >
      {children}
    </Button>
  );
}
