import { useRouter } from 'expo-router';
import { View, Text } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { RoomProps } from '@/types';
import { Button } from '@/components/waifui/button';

export const PreGame = ({ roomState }: { roomState: RoomProps }) => {
  const { push } = useRouter();

  return (
    <View>
      <Text>Room Id - {roomState.roomName}</Text>
      <Text>Room Page</Text>
      <Button onPress={() => push('/')}>Back</Button>
    </View>
  );
};
