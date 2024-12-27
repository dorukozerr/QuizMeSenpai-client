import { Spinner, View, YStack, Text } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Unauthorized } from '@/components/views/unauthorized';
import { Button } from '@/components/waifui/button';

const Page = () => {
  const { isLoading, isSuccess } = trpc.auth.checkAuth.useQuery(undefined, {
    retry: false
  });

  return isLoading ? (
    <View w-='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : isSuccess ? (
    <View w='100%' h='100%' jc='center' ai='center' gap='$4' p='$4'>
      <Button>Join a room</Button>
      <Button>Create a room</Button>
    </View>
  ) : (
    <Unauthorized />
  );
};

export default Page;
