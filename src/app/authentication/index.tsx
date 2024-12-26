import { useState } from 'react';
import { YStack, Text } from 'tamagui';

import { StepOne } from '@/components/authentication/step-one';
import { StepTwo } from '@/components/authentication/step-two';

const Page = () => {
  const [step, setStep] = useState(0);
  const [authPayload, setAuthPayload] = useState({
    phoneNumber: '',
    hash: ''
  });

  return (
    <YStack w='100%' h='100%' jc='center' ai='center' gap='$4'>
      {step === 0 ? (
        <StepOne
          onSuccess={({ p, h }) => {
            setAuthPayload({ phoneNumber: p, hash: h });
            setStep(1);
          }}
        />
      ) : step === 1 ? (
        <StepTwo authPayload={authPayload} />
      ) : null}
    </YStack>
  );
};

export default Page;
