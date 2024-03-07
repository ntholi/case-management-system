import { MantineProvider } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme='auto'>{children}</MantineProvider>
  );
}
