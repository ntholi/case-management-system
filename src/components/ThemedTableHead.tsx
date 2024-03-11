'use client';
import {
  TableThead,
  TableTheadProps,
  useComputedColorScheme,
} from '@mantine/core';
import React from 'react';

export default function ThemedTableHead({ children }: TableTheadProps) {
  const colorScheme = useComputedColorScheme('dark');

  return (
    <TableThead bg={colorScheme === 'dark' ? 'dark.7' : 'white'}>
      {children}
    </TableThead>
  );
}
