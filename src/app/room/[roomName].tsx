import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Spinner } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { RoomProps } from '@/types';
import { PreGame } from '@/components/room/pregame';

const Page = () => {
  const [roomState, setRoomState] = useState<RoomProps | null>(null);

  const { roomName }: { roomName: string } = useLocalSearchParams();

  const enterRoomMutation = trpc.room.enterRoom.useMutation();
  const leaveRoomMutation = trpc.room.leaveRoom.useMutation();

  trpc.room.roomState.useSubscription(
    { roomName },
    { onData: (state) => setRoomState(state) }
  );

  useEffect(() => {
    enterRoomMutation.mutate({ roomName });

    return () => leaveRoomMutation.mutate({ roomName });
  }, []);

  useEffect(() => console.log({ roomState }), [roomState]);

  return roomState ? (
    roomState.state === 'pre-game' ? (
      <PreGame {...{ roomState }} />
    ) : null
  ) : (
    <View w='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  );
};

export default Page;
