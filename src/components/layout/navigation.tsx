import { Fragment } from 'react';
import { usePathname, Link } from 'expo-router';
import { XStack, YStack, Text } from 'tamagui';
import { Gamepad, User, History } from '@tamagui/lucide-icons';

export const Navigation = () => {
  const pathname = usePathname();

  const linkStyles = (href: string) =>
    ({
      col: pathname === href ? '$primaryForeground' : '$foreground',
      transition: 'ease-in-out',
      animation: 'quick'
    }) as const;

  const links = [
    {
      label: (
        <Fragment>
          <Gamepad {...linkStyles('/')} />
          <Text {...linkStyles('/')}>Play</Text>
        </Fragment>
      ),
      href: '/'
    },
    {
      label: (
        <Fragment>
          <History {...linkStyles('/history')} />
          <Text {...linkStyles('/history')}>History</Text>
        </Fragment>
      ),
      href: '/history'
    },
    {
      label: (
        <Fragment>
          <User {...linkStyles('/settings')} />
          <Text {...linkStyles('/settings')}>Settings</Text>
        </Fragment>
      ),
      href: '/settings'
    }
  ];

  return (
    <XStack
      boc='$foreground'
      btw='$0.5'
      w='100%'
      dsp='flex'
      jc='center'
      ai='center'
      gap='$2'
      py='$4'
    >
      {links.map(({ label, href }, index) => (
        <Link key={`navigationLink-${index}`} href={href} asChild>
          <YStack
            cur='pointer'
            ai='center'
            jc='center'
            px='$4'
            py='$3'
            gap='$1'
            br='$7'
            bc={pathname === href ? '$primary' : '$background'}
            transition='ease-in-out'
            animation='quick'
            w='$10'
          >
            {label}
          </YStack>
        </Link>
      ))}
    </XStack>
  );
};
