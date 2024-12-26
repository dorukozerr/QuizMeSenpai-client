import { useRouter } from 'expo-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { YStack, Text, Input } from 'tamagui';

import { useTrpc } from '@/hooks/use-trpc';
import { Button } from '@/components/waifui/button';

const authSchema = z.object({
  otp: z
    .string()
    .min(6, { message: 'OTP code must be 6 digits.' })
    .max(6, { message: 'OTP code must be 6 digits.' })
});

type AuthFormValues = z.infer<typeof authSchema>;

export const StepTwo = ({
  authPayload
}: {
  authPayload: { phoneNumber: string; hash: string };
}) => {
  const { navigate } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { otp: '' }
  });
  const {
    authenticateMutation: { mutateAsync, isLoading }
  } = useTrpc();

  const onAuthenticate: SubmitHandler<AuthFormValues> = async ({ otp }) => {
    try {
      const res = await mutateAsync({ ...authPayload, otp });

      if (res.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('error =>', error);
      // TODO: Add toast here.
    }
  };

  return (
    <YStack w='100%' h='100%' jc='center' ai='center' gap='$4'>
      <Controller
        control={control}
        name='otp'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoComplete='sms-otp'
            w='$13'
            h='$4'
            placeholder='OTP'
          />
        )}
      />
      {errors['otp'] ? <Text>{errors?.['otp']?.message as string}</Text> : null}
      <Button disabled={isLoading} onPress={handleSubmit(onAuthenticate)}>
        Submit
      </Button>
    </YStack>
  );
};
