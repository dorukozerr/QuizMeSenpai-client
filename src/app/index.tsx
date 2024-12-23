import { View, Text, Button } from 'tamagui';
import { useThemeStore } from '../stores/theme';

const Page = () => {
  const { activeTheme, setTheme } = useThemeStore();

  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        variant='outlined'
        onPress={() => setTheme(activeTheme === 'dark' ? 'light' : 'dark')}
      >
        Test Button
      </Button>
    </View>
  );
};

export default Page;
