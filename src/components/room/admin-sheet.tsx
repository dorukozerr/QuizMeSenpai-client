import { useState, Fragment } from 'react';
import { YStack, Text } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { RoomProps } from '@/types';
import {
  Sheet,
  SheetOverlay,
  SheetHandle,
  SheetFrame
} from '@/components/waifui/sheet';
import { Button } from '@/components/waifui/button';

export const AdminSheet = ({
  open,
  onOpenChange,
  roomState
}: {
  open: boolean;
  onOpenChange: () => void;
  roomState: RoomProps;
}) => {
  const [sheetState, setSheetState] = useState<
    'overview' | 'changeGameSettings' | 'kickUser' | 'assignNewAdmin'
  >('overview');

  const states = {
    overview: (
      <Fragment>
        <Text>Overview</Text>
        <Button onPress={() => setSheetState('changeGameSettings')}>
          Change Game Settings
        </Button>
        <Button onPress={() => setSheetState('kickUser')}>Kick User</Button>
        <Button onPress={() => setSheetState('assignNewAdmin')}>
          Assign New Admin
        </Button>
      </Fragment>
    ),
    changeGameSettings: (
      <Fragment>
        <Text>Change Game Settings</Text>
        <Button>Test</Button>
        <Button onPress={() => setSheetState('overview')}>Back</Button>
      </Fragment>
    ),
    kickUser: (
      <Fragment>
        <Text>Kick User</Text>
        <Button>Test</Button>
        <Button onPress={() => setSheetState('overview')}>Back</Button>
      </Fragment>
    ),
    assignNewAdmin: (
      <Fragment>
        <Text>Assign New Admin</Text>
        <Button>Test</Button>
        <Button onPress={() => setSheetState('overview')}>Back</Button>
      </Fragment>
    )
  };

  return (
    <Sheet {...{ open, onOpenChange }}>
      <SheetOverlay />
      <SheetHandle />
      <SheetFrame>
        <YStack p='$4' gap='$4'>
          {states[sheetState]}
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
