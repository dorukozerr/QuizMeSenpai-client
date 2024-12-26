import { createTamagui, createTokens } from 'tamagui';

import { config } from '@tamagui/config';

const lightColors = {
  background: '#FFFFFF',
  foreground: '#232323',
  primary: '#B48EAD',
  primaryHover: '#CCA5C9',
  primaryForeground: '#FFFFFF',
  secondary: '#A4B49E',
  secondaryHover: '#BCCBB6',
  secondaryForeground: '#232323',
  muted: '#E2D8DC',
  mutedForeground: '#3D4757',
  accent: '#85A7A5',
  accentForeground: '#232323',
  border: '#A898B7',
  success: '#A3C0B6',
  error: '#C47B7B',
  overlay: 'rgba(255, 255, 255, 0.5)',
  shadow: 'rgba(226, 184, 199, 0.1)'
};

const darkColors = {
  background: '#030303',
  foreground: '#E2D8DC',
  primary: '#CCA5C9',
  primaryHover: '#B48EAD',
  primaryForeground: '#030303',
  secondary: '#BCCBB6',
  secondaryHover: '#A4B49E',
  secondaryForeground: '#030303',
  muted: '#3D4757',
  mutedForeground: '#E2D8DC',
  accent: '#85A7A5',
  accentForeground: '#F7F0F3',
  border: '#232323',
  success: '#A3C0B6',
  error: '#E19191',
  overlay: 'rgba(0, 0, 0, 0.8)',
  shadow: 'rgba(197, 163, 176, 0.1)'
};

const extendedTokens = createTokens({
  ...config.tokens,
  color: {
    ...config.tokens.color,
    ...darkColors
  }
});

export const tamaguiConfig = createTamagui({
  ...config,
  tokens: extendedTokens,
  themes: {
    light: {
      ...config.themes.light,
      ...lightColors
    },
    dark: {
      ...config.themes.dark,
      ...darkColors
    }
  },
  settings: {
    ...config.settings,
    onlyAllowShorthands: true,
    fastSchemeChange: false,
    shouldAddPrefersColorThemes: true
  }
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {
    customTheme?: 'keta';
  }
}

declare module '@tamagui/toast' {
  interface CustomData {
    myPreset: 'error' | 'success' | 'warning';
  }
}
