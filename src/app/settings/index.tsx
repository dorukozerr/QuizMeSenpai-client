import { useState, Fragment } from 'react';
import { Pressable } from 'react-native';
import { Spinner, ScrollView, View, H2, Text, Separator } from 'tamagui';

import { useTrpc } from '@/hooks/use-trpc';
import { Button } from '@/components/waifui/button';
import { ThemeSheet } from '@/components/settings/theme-sheet';

const Page = () => {
  const {
    checkAuthQuery: { isLoading, isSuccess },
    logoutMutation: { mutateAsync }
  } = useTrpc();
  const [themeSheetState, setThemeSheetState] = useState({ open: false });

  return isLoading ? (
    <View w='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : (
    <Fragment>
      <ScrollView>
        <View
          w='100%'
          dsp='flex'
          jc='flex-start'
          ai='flex-start'
          gap='$4'
          p='$4'
        >
          <H2>Settings</H2>
          <Separator w='100%' boc='$foreground' />
          <Pressable onPress={() => setThemeSheetState({ open: true })}>
            <Text fos='$5'>Theme</Text>
          </Pressable>
          {isSuccess ? (
            <Fragment>
              <Separator w='100%' boc='$foreground' />
              <Text fos='$5'>Profile</Text>
              <Separator w='100%' boc='$foreground' />
              <Button
                variant='outlined'
                onPress={async () => await mutateAsync()}
              >
                Logout
              </Button>
            </Fragment>
          ) : null}
        </View>
      </ScrollView>
      <ThemeSheet
        open={themeSheetState.open}
        onOpenChange={() => setThemeSheetState({ open: false })}
      />
    </Fragment>
  );
};

export default Page;
