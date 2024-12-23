import { Slot } from 'expo-router';
import { useColorScheme, SafeAreaView } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';

import { tamaguiConfig } from '../../tamagui.config';

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView>
          <Slot />
        </SafeAreaView>
      </ThemeProvider>
    </TamaguiProvider>
  );
};

export default RootLayout;
