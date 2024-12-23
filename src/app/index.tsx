import { View, Text, Button } from 'tamagui';

import { useThemeStore } from '@/stores/theme';

const Page = () => {
  const { activeTheme, setTheme } = useThemeStore();

  return (
    <View>
      <Text>QuizMeSenpai</Text>
      <Button
        variant='outlined'
        onPress={() => setTheme(activeTheme === 'dark' ? 'light' : 'dark')}
      >
        Change Theme
      </Button>
    </View>
  );
};

export default Page;
