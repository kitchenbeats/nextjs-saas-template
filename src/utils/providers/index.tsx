'use client';

import { type ReactNode } from 'react';
import ReactQueryProvider from './queryClient';
import { UserProvider } from './userProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <UserProvider>{children}</UserProvider>
    </ReactQueryProvider>
  );
}