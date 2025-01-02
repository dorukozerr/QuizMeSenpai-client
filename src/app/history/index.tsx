import { View, Text } from 'tamagui';

const Page = () => {
  const historyData = [];

  return (
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
  );
};

export default Page;
