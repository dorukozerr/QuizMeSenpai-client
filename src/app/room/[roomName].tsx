import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { trpc } from '@/lib/trpc';
import { PreGame } from '@/components/room/pregame';

const Page = () => {
  const { roomName }: { roomName: string } = useLocalSearchParams();
  const enterRoomMutation = trpc.room.enterRoom.useMutation();
  const leaveRoomMutation = trpc.room.leaveRoom.useMutation();
  const roomSubscription = trpc.room.roomState.useSubscription(
    { roomName },
    {
      onData: (d) => {
        console.log({ d });
      },
      enabled: true,
      onStarted: () => console.log('started'),
      onError: (err) => console.log('err =>', err)
    }
  );

  console.log(roomSubscription);

  const gameState = 'pregame';

  useEffect(() => {
    enterRoomMutation.mutate({ roomName });

    return () => leaveRoomMutation.mutate({ roomName });
  }, []);

  return gameState === 'pregame' ? <PreGame roomName={roomName} /> : null;
};

export default Page;
