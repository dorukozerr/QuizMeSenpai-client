import { useState, Fragment } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { YStack, XStack, Text, Input } from 'tamagui';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { useTrpc } from '@/hooks/use-trpc';
import { countries } from '@/constants/countries';
import { CountryCodeSheet } from '@/components/authentication/country-code-sheet';
import { Button } from '@/components/waifui/button';

const loginSchema = z
  .object({
    countryCode: z.enum(
      countries.map(({ dialCode }) => dialCode) as [string, ...string[]],
      { message: 'Please choose a country.' }
    ),
    phoneNumber: z
      .string()
      .min(7, { message: 'Phone number must be at least 7 digits.' })
      .max(12, { message: 'Phone number cannot exceed 12 digits.' })
      .refine((value) => !isNaN(Number(value)), {
        message: 'Invalid phone number.'
      })
  })
  .refine(
    ({ countryCode, phoneNumber }) =>
      isValidPhoneNumber(`${countryCode}${phoneNumber}`),
    { message: 'Invalid phone number', path: ['phoneNumber'] }
  );

type LoginFormValues = z.infer<typeof loginSchema>;

export const StepOne = ({
  onSuccess
}: {
  onSuccess: ({ p, h }: { p: string; h: string }) => void;
}) => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { countryCode: '', phoneNumber: '' }
  });
  const {
    loginMutation: { mutateAsync, isLoading }
  } = useTrpc();
  const [sheetState, setSheetState] = useState({ open: false });

  const onLogin: SubmitHandler<LoginFormValues> = async ({
    countryCode,
    phoneNumber
  }) => {
    const res = await mutateAsync({
      phoneNumber: `${countryCode}${phoneNumber}`
    });

    if (res.success) {
      onSuccess({
        p: `${countryCode}${phoneNumber}`,
        h: res.hash
      });
    }
  };

  return (
    <Fragment>
      <YStack w='100%' h='100%' jc='center' ai='center' gap='$4'>
        <Fragment>
          <XStack gap='$2'>
            <Button
              size='icon'
              variant='outlined'
              onPress={() => setSheetState({ open: true })}
              w='max-content'
              px='$3'
              h='$4'
            >
              {getValues('countryCode') ? getValues('countryCode') : 'Code'}
            </Button>
            <Controller
              control={control}
              name='phoneNumber'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType='number-pad'
                  autoComplete='tel-national'
                  w='$13'
                  h='$4'
                  placeholder='Phone number'
                />
              )}
            />
          </XStack>
          {errors['countryCode'] ? (
            <Text>{errors?.['countryCode']?.message as string}</Text>
          ) : null}
          {errors['phoneNumber'] ? (
            <Text>{errors?.['phoneNumber']?.message as string}</Text>
          ) : null}
          <Button disabled={isLoading} onPress={handleSubmit(onLogin)}>
            Login
          </Button>
        </Fragment>
      </YStack>
      <CountryCodeSheet
        open={sheetState.open}
        onOpenChange={() => setSheetState({ open: false })}
        onCountryCodeSelection={(code: string) => {
          setValue('countryCode', code);
          setSheetState({ open: false });
        }}
      />
    </Fragment>
  );
};
