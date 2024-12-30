import { useState } from 'react';
import { YStack, Text, ScrollView } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { RoomProps } from '@/types';
import { Sheet, SheetOverlay, SheetFrame } from '@/components/waifui/sheet';
import { Button } from '@/components/waifui/button';

export const ActionsSheet = ({
  open,
  onOpenChange,
  roomState
}: {
  open: boolean;
  onOpenChange: () => void;
  roomState: RoomProps;
}) => {
  const assignNewAdmin = trpc.room.assignNewAdmin.useMutation();

  const [sheetState, setSheetState] = useState<
    'overview' | 'changeGameSettings' | 'kickUser' | 'assignNewAdmin'
  >('overview');

  const states = {
    overview: (
      <YStack flex={1} gap='$4'>
        <Button onPress={() => setSheetState('changeGameSettings')}>
          Change Game Settings
        </Button>
        <Button onPress={() => setSheetState('kickUser')}>Kick User</Button>
        <Button onPress={() => setSheetState('assignNewAdmin')}>
          Assign New Admin
        </Button>
        <Button onPress={onOpenChange}>Back</Button>
      </YStack>
    ),
    changeGameSettings: (
      <YStack flex={1} gap='$4'>
        <Text fos='$8'>Change Game Settings</Text>
        <Button>Test</Button>
        <Button onPress={() => setSheetState('overview')}>Back</Button>
      </YStack>
    ),
    kickUser: (
      <YStack flex={1} gap='$4'>
        <Text fos='$8'>Kick User</Text>
        <ScrollView>
          <YStack gap='$4'>
            {roomState.participants.map(({ _id, username }) => (
              <Button key={`participantToKick-${_id}`}>{username}</Button>
            ))}
          </YStack>
        </ScrollView>
        <Button onPress={() => setSheetState('overview')}>Back</Button>
      </YStack>
    ),
    assignNewAdmin: (
      <YStack flex={1} gap='$4'>
        <Text fos='$8'>Assign New Admin</Text>
        <ScrollView>
          <YStack gap='$4'>
            {roomState.participants.map(({ _id, username }) => (
              <Button
                key={`participant-${_id}`}
                onPress={async () =>
                  await assignNewAdmin.mutateAsync({
                    roomId: roomState._id,
                    newAdminId: _id
                  })
                }
              >
                {username}
              </Button>
            ))}
          </YStack>
        </ScrollView>
        <Button onPress={() => setSheetState('overview')}>Back</Button>
      </YStack>
    )
  };

  return (
    <Sheet {...{ open, onOpenChange, disableDrag: true }}>
      <SheetOverlay />
      <SheetFrame>
        <YStack p='$4' flex={1}>
          {states[sheetState]}
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
