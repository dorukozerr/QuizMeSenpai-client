import { YStack, Text } from 'tamagui';

import { Dialog } from '@/components/waifui/dialog';

export const CreateRoomDialog = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: () => void;
}) => (
  <Dialog {...{ open, onOpenChange }}>
    <YStack>
      <Text>Hello</Text>
    </YStack>
  </Dialog>
);
