import { SafeAreaView, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { View } from 'tamagui';

import { Providers } from '@/providers';
import { useThemeStore } from '@/stores/theme';
import { Navigation } from '@/components/layout/navigation';

const RootLayout = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <Providers>
      <SafeAreaView
        style={{
          backgroundColor: activeTheme === 'dark' ? '#030712' : '#FFFFFF',
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
          animated={false}
        />
        <View f={1}>
          <Slot />
        </View>
        <Navigation />
      </SafeAreaView>
    </Providers>
  );
};

export default RootLayout;
