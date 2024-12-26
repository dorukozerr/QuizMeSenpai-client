import { Text, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { Lock } from '@tamagui/lucide-icons';

import { Button } from '@/components/waifui/button';

export const Unauthorized = () => {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      padding='$4'
      justifyContent='center'
      alignItems='center'
      gap='$4'
    >
      <Lock size='$8' color='$primary' />
      <Text fontSize='$8' fontWeight='bold' color='$primary'>
        Authentication Required
      </Text>
      <Text fontSize='$3' color='$mutedForeground' textAlign='center'>
        Please sign in first.
      </Text>
      <Button variant='outlined' onPress={() => router.push('/authentication')}>
        Go to Login
      </Button>
    </YStack>
  );
};
