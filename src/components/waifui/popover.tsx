import { ReactNode } from 'react';
import { PopoverProps, Popover as TamaguiPopover } from 'tamagui';

interface CustomPopoverProps extends PopoverProps {
  children: ReactNode;
}

export const PopoverTrigger = TamaguiPopover.Trigger;

export const Popover = ({ children, ...props }: CustomPopoverProps) => (
  <TamaguiPopover placement='bottom-end' allowFlip size='$2' {...props}>
    {children}
  </TamaguiPopover>
);

export const PopoverContent = ({ children }: { children: ReactNode }) => (
  <TamaguiPopover.Content
    bc='$popover'
    bw='$0.25'
    boc='$border'
    enterStyle={{ y: -10, opacity: 0 }}
    exitStyle={{ y: -10, opacity: 0 }}
    elevate
    animation={['quick', { opacity: { overshootClamping: true } }]}
  >
    {children}
  </TamaguiPopover.Content>
);

export const PopoverClose = ({ children }: { children: ReactNode }) => (
  <TamaguiPopover.Close asChild>{children}</TamaguiPopover.Close>
);
