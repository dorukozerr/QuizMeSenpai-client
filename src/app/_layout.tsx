import { SafeAreaView, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { useThemeStore } from '../stores/theme';

import { tamaguiConfig } from '../../tamagui.config';

const RootLayout = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={activeTheme}>
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
    </TamaguiProvider>
  );
};

export default RootLayout;
