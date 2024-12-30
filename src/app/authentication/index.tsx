import { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';
import { StepOne } from '@/components/authentication/step-one';
import { StepTwo } from '@/components/authentication/step-two';

const Page = () => {
  const { navigate } = useRouter();

  const { show: showToast } = useToastController();

  const [step, setStep] = useState(0);
  const [authPayload, setAuthPayload] = useState({ phoneNumber: '', hash: '' });

  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation();
  const authenticateMutation = trpc.auth.authenticate.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });

  const handleLogin = async ({ phoneNumber }: { phoneNumber: string }) => {
    try {
      const { success, hash } = await loginMutation.mutateAsync({
        phoneNumber
      });

      if (success) {
        setAuthPayload({ phoneNumber, hash });
        setStep(1);
      }
    } catch (error) {
      console.error('error =>', error);

      showToast('Error', {
        duration: 5000,
        message:
          (error as { message?: string })?.message ?? 'Unknown server error.'
      });
    }
  };

  const handleAuthenticate = async ({ otp }: { otp: string }) => {
    try {
      const { success } = await authenticateMutation.mutateAsync({
        ...authPayload,
        otp
      });

      if (success) {
        navigate('/');

        showToast('Success', {
          duration: 5000,
          message: 'Authentication successfull.'
        });
      }
    } catch (error) {
      console.error('error =>', error);

      showToast('Error', {
        duration: 5000,
        message:
          (error as { message?: string })?.message ?? 'Unknown server error.'
      });
    }
  };

  return (
    <YStack w='100%' h='100%' jc='center' ai='center' gap='$4'>
      {step === 0 ? (
        <StepOne login={handleLogin} isLoading={loginMutation.isLoading} />
      ) : step === 1 ? (
        <StepTwo
          authenticate={handleAuthenticate}
          isLoading={authenticateMutation.isLoading}
        />
      ) : null}
    </YStack>
  );
};

export default Page;
