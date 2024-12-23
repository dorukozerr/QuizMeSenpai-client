import { Fragment } from 'react';
import { Link } from 'expo-router';
import { XStack, YStack, Text } from 'tamagui';
import { Gamepad, User, History } from '@tamagui/lucide-icons';

export const Navigation = () => {
  const links = [
    {
      label: (
        <Fragment>
          <Gamepad />
          <Text>Play</Text>
        </Fragment>
      ),
      href: '/'
    },
    {
      label: (
        <Fragment>
          <History />
          <Text>History</Text>
        </Fragment>
      ),
      href: '/history'
    },
    {
      label: (
        <Fragment>
          <User />
          <Text>Profile</Text>
        </Fragment>
      ),
      href: '/profile'
    }
  ];

  return (
    <XStack bg='$accent' w='100%' dsp='flex' jc='center' ai='center' gap='$4'>
      {links.map(({ label, href }, index) => (
        <Link key={`navigationLink-${index}`} href={href} asChild>
          <YStack cur='pointer' ai='center' jc='center' p='$4' gap='$2' br='$5'>
            {label}
          </YStack>
        </Link>
      ))}
    </XStack>
  );
};
