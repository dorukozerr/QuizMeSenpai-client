import { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/react-query';
import { TamaguiProvider, PortalProvider } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';
import { useThemeStore } from '@/stores/theme';

import { tamaguiConfig } from '../../tamagui.config';

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

if (!serverUrl) {
  throw new Error('Server Url is undefined.');
}

export const Providers = ({ children }: { children: ReactNode }) => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({ links: [httpBatchLink({ url: serverUrl })] })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={activeTheme}>
          <PortalProvider shouldAddRootHost>
            <ToastProvider>{children}</ToastProvider>
          </PortalProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
