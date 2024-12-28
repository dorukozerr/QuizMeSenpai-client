import { useState, Fragment } from 'react';
import { useRouter } from 'expo-router';
import { YStack, XStack, Text } from 'tamagui';
import { Settings } from '@tamagui/lucide-icons';

import { trpc } from '@/lib/trpc';
import { RoomProps } from '@/types';
import { AdminSheet } from '@/components/room/admin-sheet';
import { Button } from '@/components/waifui/button';

export const PreGame = ({ roomState }: { roomState: RoomProps }) => {
  const [adminSheetState, setAdminSheetState] = useState({ open: false });
  const { push } = useRouter();
  const { data: userData } = trpc.auth.checkAuth.useQuery();
  const { data: adminData } = trpc.user.getUserInfo.useQuery({
    userId: roomState.roomAdmin
  });

  return (
    <Fragment>
      <YStack w='100%' h='100%' p='$4' gap='$4'>
        <XStack jc='space-between' ai='center'>
          <Text fos='$8' col='$foreground'>
            {roomState.roomName}
          </Text>
          {userData?._id === roomState.roomAdmin ? (
            <Button
              size='icon'
              variant='outlined'
              onPress={() => setAdminSheetState({ open: true })}
            >
              <Settings color='$foreground' />
            </Button>
          ) : null}
        </XStack>
        <Text>Admin - {adminData?.username} </Text>
        <XStack gap='$4'>
          <Text>
            Questions per User - {roomState.gameSettings.questionsPerUser}
          </Text>
          <Text>Answer period - {roomState.gameSettings.answerPeriod}</Text>
        </XStack>
        <YStack f={1} bc='$pink4'></YStack>
        <YStack f={1} bc='$pink4'></YStack>
        <Button onPress={() => push('/')}>Leave Room</Button>
      </YStack>
      <AdminSheet
        {...{
          open: adminSheetState.open,
          onOpenChange: () => setAdminSheetState({ open: false }),
          roomState
        }}
      />
    </Fragment>
  );
};
