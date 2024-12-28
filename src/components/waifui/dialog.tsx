import { ReactNode } from 'react';
import { Dialog as TamaguiDialog } from 'tamagui';

export const Dialog = ({
  open,
  onOpenChange,
  children
}: {
  open: boolean;
  onOpenChange: () => void;
  children: ReactNode;
}) => (
  <TamaguiDialog {...{ open, onOpenChange }}>
    <TamaguiDialog.Portal>
      <TamaguiDialog.Overlay bc='$overlay' />
      <TamaguiDialog.Content bw='$0.5' boc='$borderColor'>
        {children}
      </TamaguiDialog.Content>
    </TamaguiDialog.Portal>
  </TamaguiDialog>
);
