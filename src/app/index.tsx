import { Spinner, View, H1 } from 'tamagui';

import { useTrpc } from '@/hooks/use-trpc';
import { Unauthorized } from '@/components/views/unauthorized';

const Page = () => {
  const {
    auth: { isSuccess, isLoading }
  } = useTrpc();

  return isLoading ? (
    <View w-='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : isSuccess ? (
    <View>
      <H1>Root</H1>
    </View>
  ) : (
    <Unauthorized />
  );
};

export default Page;
