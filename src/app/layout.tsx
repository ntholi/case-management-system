import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Case Management',
  description: 'Case Management System for Lesotho Mounted Police Service',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme='auto'>
          <Providers>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
