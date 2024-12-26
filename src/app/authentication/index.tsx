import { useState, Fragment } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { YStack, XStack, Text, Input } from 'tamagui';

import { countries } from '@/constants/countries';
import { CountryCodeSheet } from '@/components/authentication/country-code-sheet';
import { Button } from '@/components/waifui/button';

export const authSchema = z.object({
  countryCode: z.enum(
    countries.map(({ dialCode }) => dialCode) as [string, ...string[]],
    { message: 'Please choose a country.' }
  ),
  phoneNumber: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' })
    .max(14, { message: 'Please enter a valid phone number' })
});

type FormValues = z.infer<typeof authSchema>;

const Page = () => {
  const [sheetState, setSheetState] = useState({ open: false });
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { countryCode: '', phoneNumber: '' }
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log('onSubmit =>', values);
  };

  console.log(countries.map(({ dialCode }) => dialCode));

  return (
    <Fragment>
      <YStack w='100%' h='100%' jc='center' ai='center' gap='$4'>
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
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
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

export default Page;
