import { useToastState, Toast as TamaguiToast } from '@tamagui/toast';

export const Toast = () => {
  const toast = useToastState();

  if (!toast || toast.isHandledNatively) {
    return null;
  }

  return (
    <TamaguiToast key={toast.id} duration={toast.duration}>
      <TamaguiToast.Title>{toast.title}</TamaguiToast.Title>
      <TamaguiToast.Description>{toast.message}</TamaguiToast.Description>
    </TamaguiToast>
  );
};
