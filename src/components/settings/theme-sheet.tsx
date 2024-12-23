import { useColorScheme } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { Sun, Moon, Computer } from '@tamagui/lucide-icons';

import { useThemeStore } from '@/stores/theme';
import {
  Sheet,
  SheetOverlay,
  SheetHandle,
  SheetFrame
} from '@/components/waifui/sheet';
import { Button } from '@/components/waifui/button';

export const ThemeSheet = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: () => void;
}) => {
  const setTheme = useThemeStore((state) => state.setTheme);
  const systemTheme = useColorScheme();

  console.log({ systemTheme });

  const XStackStyles = {
    dsp: 'flex',
    flexDirection: 'row',
    jc: 'center',
    ai: 'center',
    gap: '$2'
  } as const;

  const themeOptions = [
    {
      label: (
        <XStack {...XStackStyles}>
          <Sun color='$secondaryForeground' />
          <Text col='$secondaryForeground'>Light</Text>
        </XStack>
      ),
      onPress: () => setTheme('light')
    },
    {
      label: (
        <XStack {...XStackStyles}>
          <Moon color='$secondaryForeground' />
          <Text col='$secondaryForeground'>Dark</Text>
        </XStack>
      ),
      onPress: () => setTheme('dark')
    },
    {
      label: (
        <XStack {...XStackStyles}>
          <Computer color='$secondaryForeground' />
          <Text col='$secondaryForeground'>System</Text>
        </XStack>
      ),
      onPress: () => setTheme(systemTheme ? systemTheme : 'dark')
    }
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetOverlay />
      <SheetHandle />
      <SheetFrame>
        <YStack p='$4' gap='$4'>
          {themeOptions.map(({ label, onPress }, index) => (
            <Button
              key={`themeSwitchButton-${index}`}
              variant='secondary'
              onPress={onPress}
            >
              {label}
            </Button>
          ))}
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
