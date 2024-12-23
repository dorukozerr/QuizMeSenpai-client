import { SafeAreaView, StatusBar } from 'react-native';
import { Slot } from 'expo-router';

import { Providers } from '../providers';
import { useThemeStore } from '../stores/theme';

const RootLayout = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <Providers>
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
    </Providers>
  );
};

export default RootLayout;
