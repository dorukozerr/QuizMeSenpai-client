import { useState, Fragment } from 'react';
import { Pressable } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, Input } from 'tamagui';

import { countries } from '@/constants/countries';
import { CountryCodeSheet } from '@/components/authentication/country-code-sheet';
import { Button } from '@/components/waifui/button';

export const authSchema = z.object({
  countryCode: z.enum(
    countries.map(({ dialCode }) => dialCode) as [string, ...string[]],
    { message: 'Please choose a valid country' }
  ),
  phoneNumber: z.string().min(10).max(14)
});

type FormValues = z.infer<typeof authSchema>;

const Page = () => {
  const [sheetState, setSheetState] = useState({ open: false });
  const {
    control,
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
      <View w='100%' h='100%' dsp='flex' jc='center' ai='center' bc='$red1'>
        <Pressable onPress={() => setSheetState({ open: true })}>
          <Text>Country Code</Text>
        </Pressable>
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
            />
          )}
        />
        {errors['countryCode'] ? (
          <Text>{errors?.['countryCode']?.message as string}</Text>
        ) : null}
        {errors['phoneNumber'] ? (
          <Text>{errors?.['phoneNumber']?.message as string}</Text>
        ) : null}
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </View>
      <CountryCodeSheet
        open={sheetState.open}
        onOpenChange={() => setSheetState({ open: false })}
      />
    </Fragment>
  );
};

export default Page;
