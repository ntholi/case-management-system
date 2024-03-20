'use client';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { Suspense } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    breakpoints: {
      xl: '1538px',
    },
  });

  return (
    <Suspense>
      <MantineProvider theme={theme}>
        <Notifications />
        <ModalsProvider>
          <SessionProvider>{children}</SessionProvider>
        </ModalsProvider>
      </MantineProvider>
    </Suspense>
  );
}
