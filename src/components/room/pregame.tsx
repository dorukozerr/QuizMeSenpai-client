import { useRouter } from 'expo-router';
import { View, Text } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Button } from '@/components/waifui/button';

export const PreGame = ({ roomName }: { roomName: string }) => {
  const { push } = useRouter();

  return (
    <View>
      <Text>Room Id - {roomName}</Text>
      <Text>Room Page</Text>
      <Button onPress={() => push('/')}>Back</Button>
    </View>
  );
};
