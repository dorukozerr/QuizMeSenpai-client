import { Spinner, View, H1 } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Unauthorized } from '@/components/views/unauthorized';

const Page = () => {
  const { isLoading, isSuccess } = trpc.auth.checkAuth.useQuery(undefined, {
    retry: false
  });

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
