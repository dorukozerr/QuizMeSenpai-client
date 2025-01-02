import { useRouter } from 'expo-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { View, Input, Text } from 'tamagui';

import { Button } from '@/components/waifui/button';

const roomSchema = z.object({
  roomName: z
    .string()
    .min(3, { message: 'Room name can be minimum 3 characters.' })
    .max(15, { message: 'Room name can be maximum 15 characters.' })
});

type RoomFormValues = z.infer<typeof roomSchema>;

const Page = () => {
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: { roomName: '' }
  });

  const onSubmit: SubmitHandler<RoomFormValues> = async ({ roomName }) =>
    push(`/room/${roomName}`);

  return (
    <View w='100%' h='100%' p='$4' jc='center' ai='center' gap='$4'>
      <Controller
        control={control}
        name='roomName'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            w='$18'
            h='$4'
            placeholder='Room Name'
          />
        )}
      />
      {errors['roomName'] ? (
        <Text>{errors?.['roomName']?.message as string}</Text>
      ) : null}
      <Button onPress={handleSubmit(onSubmit)}>Enter</Button>
    </View>
  );
};

export default Page;
