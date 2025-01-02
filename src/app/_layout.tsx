import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Slot, usePathname } from 'expo-router';
import { View, Spinner } from 'tamagui';
import { ToastViewport } from '@tamagui/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Providers } from '@/providers';
import { trpc } from '@/lib/trpc';
import { useThemeStore } from '@/stores/theme';
import { useUserStore } from '@/stores/user';
import { Authentication } from '@/components/views/authentication';
import { Navigation } from '@/components/layout/navigation';
import { Toast } from '@/components/waifui/toast';

const RootLayout = () => {
  const { left, top, right } = useSafeAreaInsets();

  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <Providers>
      <SafeAreaView
        style={{
          backgroundColor: activeTheme === 'dark' ? '#030303' : '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        <StatusBar
          backgroundColor={activeTheme === 'dark' ? '#030712' : '#FFFFFF'}
          barStyle={activeTheme === 'dark' ? 'light-content' : 'dark-content'}
          animated={false}
        />
        <AuthCheck />
        <Toast />
        <ToastViewport
          flexDirection='column-reverse'
          top={top}
          left={left}
          right={right}
        />
      </SafeAreaView>
    </Providers>
  );
};

const AuthCheck = () => {
  const pathname = usePathname();

  const { data, isSuccess, isLoading } = trpc.auth.checkAuth.useQuery(
    undefined,
    { retry: false }
  );

  const setUserData = useUserStore((state) => state.setUserData);

  useEffect(() => {
    console.log('data =>', data);

    if (data) {
      setUserData(data);
    }
  }, [data]);

  return isLoading ? (
    <View w='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : isSuccess ? (
    <View w='100%' h='100%'>
      <View f={1} w='100%'>
        <Slot />
      </View>
      {!pathname.includes('room') && !pathname.includes('game') && (
        <Navigation />
      )}
    </View>
  ) : (
    <Authentication />
  );
};

export default RootLayout;
