import { useRouter } from 'expo-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Spinner, View, Input, Text } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Button } from '@/components/waifui/button';
import { Unauthorized } from '@/components/views/unauthorized';

const roomSchema = z.object({
  roomName: z
    .string()
    .min(3, { message: 'Room name can be minimum 5 characters.' })
    .max(15, { message: 'Room name can be maximum 30 characters.' })
});

type RoomFormValues = z.infer<typeof roomSchema>;

const Page = () => {
  const { push } = useRouter();

  const { isLoading, isSuccess } = trpc.auth.checkAuth.useQuery(undefined, {
    retry: false
  });

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

  return isLoading ? (
    <View w-='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : isSuccess ? (
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
      <Button disabled={isLoading} onPress={handleSubmit(onSubmit)}>
        Enter
      </Button>
    </View>
  ) : (
    <Unauthorized />
  );
};

export default Page;
