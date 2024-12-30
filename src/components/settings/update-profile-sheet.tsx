import { useEffect, Fragment } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { YStack, Text, Input, Label } from 'tamagui';
import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';
import {
  Sheet,
  SheetOverlay,
  SheetHandle,
  SheetFrame
} from '@/components/waifui/sheet';
import { Button } from '@/components/waifui/button';

const profileSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username can be minimum 3 characters.' })
    .max(15, { message: 'Username can be maximum 15 characters.' })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const UpdateProfileSheet = ({
  open,
  onOpenChange,
  username
}: {
  open: boolean;
  onOpenChange: () => void;
  username?: string;
}) => {
  const { show: showToast } = useToastController();

  const utils = trpc.useUtils();

  const { mutateAsync, isLoading } = trpc.user.update.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: '' }
  });

  useEffect(() => {
    if (username) {
      setValue('username', username);
    }
  }, [username, open]);

  const onUpdate: SubmitHandler<ProfileFormValues> = async ({ username }) => {
    try {
      const { success } = await mutateAsync({ username });

      if (success) {
        onOpenChange();

        showToast('Success', {
          duration: 5000,
          message: 'Username updated.'
        });
      }
    } catch (error) {
      console.error('error =>', error);

      showToast('Error', {
        duration: 5000,
        message:
          (error as { message?: string })?.message ?? 'Unknown server error.'
      });
    }
  };

  return (
    <Sheet {...{ open, onOpenChange }}>
      <SheetOverlay />
      <SheetHandle />
      <SheetFrame>
        <YStack p='$4' gap='$2'>
          <Controller
            control={control}
            name='username'
            render={({ field: { onChange, onBlur, value } }) => (
              <Fragment>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  w='100%'
                  h='$4'
                  placeholder='Username'
                />
              </Fragment>
            )}
          />
          {errors['username'] ? (
            <Text>{errors?.['username']?.message as string}</Text>
          ) : null}
          <Button disabled={isLoading} onPress={handleSubmit(onUpdate)}>
            Update
          </Button>
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
