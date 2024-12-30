import { SafeAreaView, StatusBar } from 'react-native';
import { Slot, usePathname } from 'expo-router';
import { View } from 'tamagui';
import { ToastViewport } from '@tamagui/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Providers } from '@/providers';
import { useThemeStore } from '@/stores/theme';
import { Navigation } from '@/components/layout/navigation';
import { Toast } from '@/components/waifui/toast';

const RootLayout = () => {
  const pathname = usePathname();

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
        <View f={1} w='100%'>
          <Slot />
          <Toast />
        </View>
        {!pathname.includes('room') && !pathname.includes('game') && (
          <Navigation />
        )}
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

export default RootLayout;
