import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Spinner } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { RoomProps, Message } from '@/types';
import { PreGame } from '@/components/room/pre-game';

const Page = () => {
  const { roomName }: { roomName: string } = useLocalSearchParams();
  const { push } = useRouter();

  const [roomState, setRoomState] = useState<RoomProps | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: userData } = trpc.auth.checkAuth.useQuery();
  const enterRoomMutation = trpc.room.enterRoom.useMutation();
  const leaveRoomMutation = trpc.room.leaveRoom.useMutation();
  trpc.room.roomState.useSubscription(
    { roomId: enterRoomMutation.data?.roomId ?? '' },
    { onData: (data) => setRoomState(data) }
  );
  trpc.message.messages.useSubscription(
    { roomId: enterRoomMutation.data?.roomId ?? '' },
    { onData: (data) => setMessages(data) }
  );

  useEffect(() => {
    enterRoomMutation.mutate({ roomName });

    return () => leaveRoomMutation.mutate({ roomName });
  }, []);

  useEffect(() => {
    if (
      roomState &&
      !roomState.participants
        .map(({ _id }) => _id)
        .includes(userData?._id ?? '')
    ) {
      push('/');
    }
  }, [roomState]);

  return roomState ? (
    roomState.state === 'pre-game' ? (
      <PreGame {...{ roomState, messages }} />
    ) : null
  ) : (
    <View w='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  );
};

export default Page;
