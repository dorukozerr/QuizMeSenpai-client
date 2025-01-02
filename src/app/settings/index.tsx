import { useState, Fragment } from 'react';
import { Pressable } from 'react-native';
import { YStack, View, H2, Text, Separator } from 'tamagui';

import { trpc } from '@/lib/trpc';
import { useUserStore } from '@/stores/user';
import { Button } from '@/components/waifui/button';
import { ThemeSheet } from '@/components/settings/theme-sheet';
import { UpdateProfileSheet } from '@/components/settings/update-profile-sheet';

const Page = () => {
  const [themeSheetState, setThemeSheetState] = useState({ open: false });
  const [updateProfileSheetState, setUpdateProfileSheetState] = useState({
    open: false
  });

  const utils = trpc.useUtils();

  const { mutateAsync } = trpc.auth.logout.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });

  const { userData, setUserData } = useUserStore();

  return (
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
        <Fragment>
          <Pressable onPress={() => setUpdateProfileSheetState({ open: true })}>
            <Text fos='$5'>Profile</Text>
          </Pressable>
          <View f={1}></View>
          <Button
            w='100%'
            onPress={async () => {
              const { success } = await mutateAsync();

              if (success) {
                setUserData(null);
              }
            }}
          >
            Logout
          </Button>
        </Fragment>
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
          username: userData?.username
        }}
      />
    </Fragment>
  );
};

export default Page;
