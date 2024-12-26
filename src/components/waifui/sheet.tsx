import { ReactNode } from 'react';
import { Sheet as TamaguiSheet, XStackProps, YStackProps } from 'tamagui';

export const Sheet = ({
  open,
  onOpenChange,
  children,
  ...props
}: {
  open: boolean;
  onOpenChange: (flag: boolean) => void;
  children: ReactNode;
}) => (
  <TamaguiSheet
    open={open}
    onOpenChange={onOpenChange}
    dismissOnSnapToBottom
    zIndex={100_000}
    animation='quick'
    modal
    {...props}
  >
    {children}
  </TamaguiSheet>
);

export const SheetOverlay = ({ ...props }: YStackProps) => (
  <TamaguiSheet.Overlay
    bc='$overlay'
    $platform-web={{ backdropFilter: 'blur(2px)' }}
    {...props}
  />
);

export const SheetHandle = ({ ...props }: XStackProps) => (
  <TamaguiSheet.Handle bc='$primary' cur='pointer' {...props} />
);

export const SheetFrame = ({
  children,
  ...props
}: { children: ReactNode } & YStackProps) => (
  <TamaguiSheet.Frame boc='$border' bw='$1' {...props}>
    {children}
  </TamaguiSheet.Frame>
);
