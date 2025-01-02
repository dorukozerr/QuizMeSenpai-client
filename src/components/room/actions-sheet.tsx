import { useState, useEffect, Fragment } from 'react';
import { YStack, View, ScrollView, Text } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Room } from '@/types';
import { useUserStore } from '@/stores/user';
import { Sheet, SheetOverlay, SheetFrame } from '@/components/waifui/sheet';
import { Button } from '@/components/waifui/button';

export const ActionsSheet = ({
  open,
  onOpenChange,
  roomState
}: {
  open: boolean;
  onOpenChange: () => void;
  roomState: Room;
}) => {
  const assignNewAdmin = trpc.room.assignNewAdmin.useMutation();
  const kickUser = trpc.room.kickUser.useMutation();
  const changeGameSettings = trpc.room.changeGameSettings.useMutation();

  const [view, setView] = useState<
    | 'overview'
    | 'changeGameSettings'
    | 'kickUser'
    | 'assignNewAdmin'
    | 'changeQuestionsPerUser'
    | 'changeAnswerPeriod'
  >('overview');

  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    setView('overview');
  }, [open]);

  const questionsPerUserOptions = ['5', '10', '15', '20'] as const;
  const answerPeriodOptions = ['30', '60', '90', '120'] as const;

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
        <Button w='100%' onPress={() => setView('changeQuestionsPerUser')}>
          Questions per User
        </Button>
        <Button w='100%' onPress={() => setView('changeAnswerPeriod')}>
          Answer Period
        </Button>
        <View f={1} />
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
      </YStack>
    ),

    changeQuestionsPerUser: (
      <YStack flex={1} gap='$4'>
        {questionsPerUserOptions.map((option) => (
          <Button
            w='100%'
            key={`questionPerUserOption-${option}`}
            onPress={async () => {
              const { success } = await changeGameSettings.mutateAsync({
                roomId: roomState._id,
                settingToChange: 'questionsPerUser',
                newValue: option
              });

              if (success) {
                onOpenChange();
              }
            }}
          >
            {option}
          </Button>
        ))}
        <View f={1} />
        <Button w='100%' onPress={() => setView('changeGameSettings')}>
          Back
        </Button>
      </YStack>
    ),
    changeAnswerPeriod: (
      <YStack flex={1} gap='$4'>
        {answerPeriodOptions.map((option) => (
          <Button
            w='100%'
            key={`answerPeriodOption-${option}`}
            onPress={async () => {
              const { success } = await changeGameSettings.mutateAsync({
                roomId: roomState._id,
                settingToChange: 'answerPeriod',
                newValue: option
              });

              if (success) {
                onOpenChange();
              }
            }}
          >
            {option}s
          </Button>
        ))}
        <View f={1} />
        <Button w='100%' onPress={() => setView('changeGameSettings')}>
          Back
        </Button>
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
                  w='100%'
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
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
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
                  w='100%'
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
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
      </YStack>
    ),
    configureQuestions: (
      <YStack>
        <Text>Configure Questions</Text>
        <Button onPress={() => setView('overview')}>Back</Button>
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
