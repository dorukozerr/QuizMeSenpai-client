import { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';
import { StepOne } from '@/components/authentication/step-one';
import { StepTwo } from '@/components/authentication/step-two';

const Page = () => {
  const { navigate } = useRouter();
  const toast = useToastController();
  const utils = trpc.useUtils();
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });
  const authenticateMutation = trpc.auth.authenticate.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });
  const [step, setStep] = useState(0);
  const [authPayload, setAuthPayload] = useState({ phoneNumber: '', hash: '' });

  const handleLogin = async (phoneNumber: string) => {
    try {
      const res = await loginMutation.mutateAsync({ phoneNumber });

      if (res.success) {
        setAuthPayload({ phoneNumber, hash: res.hash });
        setStep(1);
      }
    } catch (error) {
      console.error('error =>', error);

      toast.show('Error', {
        duration: 5000,
        message:
          (error as { message?: string })?.message ?? 'Unknown server error.'
      });
    }
  };

  const handleAuthenticate = async (otp: string) => {
    try {
      const res = await authenticateMutation.mutateAsync({
        ...authPayload,
        otp
      });

      if (res.success) {
        navigate('/');

        toast.show('Success', {
          duration: 5000,
          message: 'Authentication successfull.'
        });
      }
    } catch (error) {
      console.error('error =>', error);

      toast.show('Error', {
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
