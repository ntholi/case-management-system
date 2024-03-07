import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ColorSchemeScript } from '@mantine/core';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Case',
  description: 'Case Management System for Lesotho Mounted Police Service',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
