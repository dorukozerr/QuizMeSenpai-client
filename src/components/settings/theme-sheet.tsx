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
          <Sun color='$primaryForeground' />
          <Text col='$primaryForeground'>Light</Text>
        </XStack>
      ),
      changeTheme: () => setTheme('light')
    },
    {
      label: (
        <XStack {...XStackStyles}>
          <Moon color='$primaryForeground' />
          <Text col='$primaryForeground'>Dark</Text>
        </XStack>
      ),
      changeTheme: () => setTheme('dark')
    },
    {
      label: (
        <XStack {...XStackStyles}>
          <Computer color='$primaryForeground' />
          <Text col='$primaryForeground'>System</Text>
        </XStack>
      ),
      changeTheme: () => setTheme(systemTheme ? systemTheme : 'dark')
    }
  ];

  return (
    <Sheet {...{ open, onOpenChange }}>
      <SheetOverlay />
      <SheetHandle />
      <SheetFrame>
        <YStack p='$4' gap='$4'>
          {themeOptions.map(({ label, changeTheme }, index) => (
            <Button
              key={`themeSwitchButton-${index}`}
              onPress={() => {
                changeTheme();
                onOpenChange();
              }}
            >
              {label}
            </Button>
          ))}
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
