import { Spinner, View } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Button } from '@/components/waifui/button';
import { Unauthorized } from '@/components/views/unauthorized';

const Page = () => {
  const { isLoading, isSuccess } = trpc.auth.checkAuth.useQuery(undefined, {
    retry: false
  });
  const test = trpc.room.create.useMutation();

  return isLoading ? (
    <View w-='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : isSuccess ? (
    <View w='100%' h='100%' jc='center' ai='center' gap='$4' p='$4'>
      <Button onPress={() => {}}>Join a room</Button>
      <Button
        onPress={async () => await test.mutateAsync({ roomName: 'testRoom' })}
      >
        Create a room
      </Button>
    </View>
  ) : (
    <Unauthorized />
  );
};

export default Page;
