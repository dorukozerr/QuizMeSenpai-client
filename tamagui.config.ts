import { createTamagui, createTokens } from 'tamagui';

import { config } from '@tamagui/config';

const lightColors = {
  background: '#FFFFFF',
  foreground: '#1E293B',
  muted: '#F1F5F9',
  mutedForeground: '#64748B',
  popover: '#FFFFFF',
  popoverForeground: '#1E293B',
  border: '#E2E8F0',
  input: '#E2E8F0',
  card: '#FFFFFF',
  cardForeground: '#1E293B',
  primary: '#1E293B',
  primaryForeground: '#F8FAFC',
  secondary: '#F1F5F9',
  secondaryForeground: '#1E293B',
  accent: '#F1F5F9',
  accentForeground: '#1E293B',
  destructive: '#FF0000',
  destructiveForeground: '#F8FAFC',
  ring: '#94A3B8',
  semiTransparentBackground: '#FFFFFF80'
};

const darkColors = {
  background: '#030712',
  foreground: '#E2E8F0',
  muted: '#1E293B',
  mutedForeground: '#94A3B8',
  popover: '#030712',
  popoverForeground: '#94A3B8',
  border: '#1E293B',
  input: '#1E293B',
  card: '#030712',
  cardForeground: '#E2E8F0',
  primary: '#F8FAFC',
  primaryForeground: '#0F172A',
  secondary: '#1E293B',
  secondaryForeground: '#F8FAFC',
  accent: '#1E293B',
  accentForeground: '#F8FAFC',
  destructive: '#7F1D1D',
  destructiveForeground: '#F8FAFC',
  ring: '#1E293B',
  semiTransparentBackground: '#03071280'
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
  interface TamaguiCustomConfig extends Conf {}
}
