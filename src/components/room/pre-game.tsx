import { useState, Fragment } from 'react';
import { useRouter } from 'expo-router';
import { YStack, XStack, Text, ScrollView, Input } from 'tamagui';
import { Ellipsis, Send } from '@tamagui/lucide-icons';

import { RoomProps } from '@/types';
import { ActionsSheet } from '@/components/room/actions-sheet';
import { Button } from '@/components/waifui/button';

export const PreGame = ({ roomState }: { roomState: RoomProps }) => {
  const { push } = useRouter();

  const [sheetState, setSheetState] = useState({ open: false });

  return (
    <Fragment>
      <YStack w='100%' h='100%' p='$4' gap='$4'>
        <XStack jc='space-between' ai='center'>
          <Text fos='$8' col='$foreground'>
            {roomState.roomName}
          </Text>
          <Button
            size='icon'
            variant='outlined'
            onPress={() => setSheetState({ open: true })}
          >
            <Ellipsis color='$foreground' />
          </Button>
        </XStack>
        <YStack h='100%' f={1} gap='$2' p='$4' bw='$1' boc='$border' br='$3'>
          <Text>Chat</Text>
          <ScrollView>
            <YStack gap='$2'>
              <Text>Message 1</Text>
              <Text>Message 2</Text>
              <Text>Message 3</Text>
            </YStack>
          </ScrollView>
          <XStack ai='center' gap='$2'>
            <Input f={1} />
            <Button size='icon' h='100%' variant='outlined'>
              <Send color='$foreground' />
            </Button>
          </XStack>
        </YStack>
        <YStack h='100%' f={1} gap='$2' p='$4' bw='$1' boc='$border' br='$3'>
          <Text>Active Users - {roomState.participants.length}</Text>
          <ScrollView>
            <YStack gap='$2'>
              {roomState.participants.map(({ _id, username }) => (
                <Text key={`participant-${_id}`}>{username}</Text>
              ))}
            </YStack>
          </ScrollView>
        </YStack>
        <Button onPress={() => push('/')}>Leave Room</Button>
      </YStack>
      <ActionsSheet
        {...{
          open: sheetState.open,
          onOpenChange: () => setSheetState({ open: false }),
          roomState
        }}
      />
    </Fragment>
  );
};
