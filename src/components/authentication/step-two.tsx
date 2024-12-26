import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { YStack, Text, Input } from 'tamagui';
import { Button } from '@/components/waifui/button';

const authSchema = z.object({
  otp: z
    .string()
    .min(6, { message: 'OTP code must be 6 digits.' })
    .max(6, { message: 'OTP code must be 6 digits.' })
});

type AuthFormValues = z.infer<typeof authSchema>;

export const StepTwo = ({
  authenticate,
  isLoading
}: {
  authenticate: (otp: string) => void;
  isLoading: boolean;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { otp: '' }
  });

  const onSubmit: SubmitHandler<AuthFormValues> = ({ otp }) =>
    authenticate(otp);

  return (
    <YStack w='100%' h='100%' jc='center' ai='center' gap='$4'>
      <Controller
        control={control}
        name='otp'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCapitalize='none'
            autoCorrect={false}
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
      <Button disabled={isLoading} onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </YStack>
  );
};
