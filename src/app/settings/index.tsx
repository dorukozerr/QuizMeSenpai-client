import { useState, Fragment } from 'react';
import { Pressable } from 'react-native';
import { Spinner, YStack, View, H2, Text, Separator } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { Button } from '@/components/waifui/button';
import { ThemeSheet } from '@/components/settings/theme-sheet';
import { UpdateProfileSheet } from '@/components/settings/update-profile-sheet';

const Page = () => {
  const [themeSheetState, setThemeSheetState] = useState({ open: false });
  const [updateProfileSheetState, setUpdateProfileSheetState] = useState({
    open: false
  });

  const utils = trpc.useUtils();

  const { isLoading, isSuccess, data } = trpc.auth.checkAuth.useQuery(
    undefined,
    { retry: false }
  );
  const { mutateAsync } = trpc.auth.logout.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });

  return isLoading ? (
    <View w='100%' h='100%' dsp='flex' jc='center' ai='center'>
      <Spinner size='large' color='$primary' />
    </View>
  ) : (
    <Fragment>
      <YStack
        w='100%'
        h='100%'
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
            <Pressable
              onPress={() => setUpdateProfileSheetState({ open: true })}
            >
              <Text fos='$5'>Profile</Text>
            </Pressable>
            <View f={1}></View>
            <Button w='100%' onPress={async () => await mutateAsync()}>
              Logout
            </Button>
          </Fragment>
        ) : null}
      </YStack>
      <ThemeSheet
        {...{
          open: themeSheetState.open,
          onOpenChange: () => setThemeSheetState({ open: false })
        }}
      />
      <UpdateProfileSheet
        {...{
          open: updateProfileSheetState.open,
          onOpenChange: () => setUpdateProfileSheetState({ open: false }),
          username: data?.username
        }}
      />
    </Fragment>
  );
};

export default Page;
