import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text } from 'tamagui';

import { Button } from '@/components/waifui/button';

const Page = () => {
  const { roomId } = useLocalSearchParams();
  const { push } = useRouter();

  return (
    <View>
      <Text>Room Id - {roomId}</Text>
      <Text>Room Page</Text>
      <Button onPress={() => push('/')}>Back</Button>
    </View>
  );
};

export default Page;
