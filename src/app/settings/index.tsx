import { useState, Fragment } from 'react';
import { Pressable } from 'react-native';
import { ScrollView, View, H2, H6, Separator } from 'tamagui';

import { useTrpc } from '@/hooks/use-trpc';
import { Button } from '@/components/waifui/button';
import { ThemeSheet } from '@/components/settings/theme-sheet';

const Page = () => {
  const {
    auth: { isSuccess }
  } = useTrpc();
  const [themeSheetState, setThemeSheetState] = useState({ open: false });

  return (
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
          <Separator w='100%' />
          <Pressable onPress={() => setThemeSheetState({ open: true })}>
            <H6>Theme</H6>
          </Pressable>
          {isSuccess ? (
            <Fragment>
              <Separator w='100%' />
              <H6>Profile</H6>
              <Separator w='100%' />
              <Button variant='outlined'>Logout</Button>
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
