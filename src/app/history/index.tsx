import { Spinner, View, Text } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Unauthorized } from '@/components/views/unauthorized';

const Page = () => {
  const { isLoading, isSuccess } = trpc.auth.checkAuth.useQuery(undefined, {
    retry: false
  });

  const historyData = [];

  return isLoading ? (
    <View w-='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : isSuccess ? (
    <View w='100%' h='100%' p='$4'>
      {historyData.length ? (
        <Text fos='$8' col='$foreground'>
          Render History data here
        </Text>
      ) : (
        <View w='100%' h='100%' p='$4' dsp='flex' jc='center' ai='center'>
          <Text fos='$8' col='$foreground'>
            You have no data
          </Text>
        </View>
      )}
    </View>
  ) : (
    <Unauthorized />
  );
};

export default Page;
