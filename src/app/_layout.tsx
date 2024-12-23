import { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { httpBatchLink } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { TamaguiProvider, PortalProvider } from 'tamagui';

import { trpc } from '../lib/trpc';

import { useThemeStore } from '../stores/theme';
import { tamaguiConfig } from '../../tamagui.config';

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

if (!serverUrl) {
  throw new Error('Server Url is undefined.');
}

const RootLayout = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({ links: [httpBatchLink({ url: serverUrl })] })
  );

  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={activeTheme}>
          <PortalProvider shouldAddRootHost>
            <SafeAreaView
              style={{
                backgroundColor: activeTheme === 'dark' ? '#030712' : '#FFFFFF',
                width: '100%',
                height: '100%'
              }}
            >
              <StatusBar
                backgroundColor={activeTheme === 'dark' ? '#030712' : '#FFFFFF'}
                animated={false}
              />
              <Slot />
            </SafeAreaView>
          </PortalProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default RootLayout;
