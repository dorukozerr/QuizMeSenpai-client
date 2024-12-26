import { useEffect } from 'react';
import { z } from 'zod';
import { YStack, Text, Input } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
    .min(5, { message: 'Username can be minimum 5 characters.' })
    .max(30, { message: 'Username can be maximum 30 characters.' })
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
  const toast = useToastController();

  useEffect(() => {
    username && setValue('username', username);
  }, [username]);

  const onUpdate: SubmitHandler<ProfileFormValues> = async ({ username }) => {
    try {
      const res = await mutateAsync({ username });

      if (res.success) {
        onOpenChange();
        toast.show('Success', {
          myPreset: 'success',
          duration: 5000,
          message: 'Username updated.'
        });
      }
    } catch (error) {
      console.error('error =>', error);

      toast.show('Error', {
        myPreset: 'error',
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
        <YStack p='$4' gap='$4'>
          <Text>Username</Text>
          <Controller
            control={control}
            name='username'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCapitalize='none'
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                w='100%'
                h='$4'
                placeholder='Username'
              />
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
