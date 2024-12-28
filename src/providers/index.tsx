import { useState, ReactNode } from 'react';
import { httpBatchLink } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import { TamaguiProvider, PortalProvider } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';
import { useThemeStore } from '@/stores/theme';

import { tamaguiConfig } from '../../tamagui.config';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WEBSOCKET_URL;

if (!SERVER_URL || !WEBSOCKET_URL) {
  throw new Error('Server Urls are undefined.');
}

export const Providers = ({ children }: { children: ReactNode }) => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: SERVER_URL,
          headers: {
            credentials: 'include'
          }
        }),
        wsLink({ client: createWSClient({ url: WEBSOCKET_URL }) })
      ]
    })
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
