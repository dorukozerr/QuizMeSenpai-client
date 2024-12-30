import { useState, useEffect, Fragment } from 'react';
import { YStack, View, Text, ScrollView } from 'tamagui';

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
  const { data: userData } = trpc.auth.checkAuth.useQuery();
  const assignNewAdmin = trpc.room.assignNewAdmin.useMutation();
  const kickUser = trpc.room.kickUser.useMutation();

  const [view, setView] = useState<
    | 'overview'
    | 'changeGameSettings'
    | 'kickUser'
    | 'assignNewAdmin'
    | 'changeQuestionsPerUser'
    | 'changeAnswerPeriod'
  >('overview');

  useEffect(() => {
    setView('overview');
  }, [open]);

  const questionPerUserOptions = [5, 10, 15, 20];
  const answerPeriodOptions = [10, 20, 30];

  const states = {
    overview: (
      <YStack flex={1} gap='$4'>
        {userData?._id === roomState.roomAdmin ? (
          <Fragment>
            <Button w='100%' onPress={() => setView('changeGameSettings')}>
              Change Game Settings
            </Button>
            <Button w='100%' onPress={() => setView('kickUser')}>
              Kick User
            </Button>
            <Button w='100%' onPress={() => setView('assignNewAdmin')}>
              Assign New Admin
            </Button>
          </Fragment>
        ) : null}
        <View f={1} />
        <Button w='100%' onPress={onOpenChange}>
          Back
        </Button>
      </YStack>
    ),
    changeGameSettings: (
      <YStack flex={1} gap='$4'>
        <Button onPress={() => setView('changeQuestionsPerUser')}>
          Questions per User
        </Button>
        <Button onPress={() => setView('changeAnswerPeriod')}>
          Answer Period
        </Button>
        <View f={1} />
        <Button onPress={() => setView('overview')}>Back</Button>
      </YStack>
    ),
    kickUser: (
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <YStack gap='$4'>
            {roomState.participants
              .filter(({ _id }) => _id !== userData?._id)
              .map(({ _id, username }) => (
                <Button
                  key={`participantToKick-${_id}`}
                  onPress={async () => {
                    const { success } = await kickUser.mutateAsync({
                      roomId: roomState._id,
                      kickedUser: _id
                    });

                    if (success) {
                      onOpenChange();
                    }
                  }}
                >
                  {username}
                </Button>
              ))}
          </YStack>
        </ScrollView>
        <Button onPress={() => setView('overview')}>Back</Button>
      </YStack>
    ),
    assignNewAdmin: (
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <YStack gap='$4'>
            {roomState.participants
              .filter(({ _id }) => _id !== userData?._id)
              .map(({ _id, username }) => (
                <Button
                  key={`participant-${_id}`}
                  onPress={async () => {
                    const { success } = await assignNewAdmin.mutateAsync({
                      roomId: roomState._id,
                      newAdminId: _id
                    });

                    if (success) {
                      onOpenChange();
                    }
                  }}
                >
                  {username}
                </Button>
              ))}
          </YStack>
        </ScrollView>
        <Button onPress={() => setView('overview')}>Back</Button>
      </YStack>
    ),
    changeQuestionsPerUser: (
      <YStack flex={1} gap='$4'>
        {questionPerUserOptions.map((option) => (
          <Button key={`questionPerUserOption-${option}`}>{option}</Button>
        ))}
        <View f={1} />
        <Button onPress={() => setView('changeGameSettings')}>Back</Button>
      </YStack>
    ),
    changeAnswerPeriod: (
      <YStack flex={1} gap='$4'>
        {answerPeriodOptions.map((option) => (
          <Button key={`answerPeriodOption-${option}`}>{option}</Button>
        ))}
        <View f={1} />
        <Button onPress={() => setView('changeGameSettings')}>Back</Button>
      </YStack>
    )
  };

  return (
    <Sheet {...{ open, onOpenChange, disableDrag: true }}>
      <SheetOverlay />
      <SheetFrame>
        <YStack p='$4' flex={1}>
          {states[view]}
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
