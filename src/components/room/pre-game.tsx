import { useRef, useState, Fragment } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { YStack, XStack, Text, ScrollView, Input } from 'tamagui';
import {
  Ellipsis,
  Send,
  Shield,
  Timer,
  MessageCircleQuestion
} from '@tamagui/lucide-icons';

import { trpc } from '@/lib/trpc';
import { Room, Message } from '@/types';
import { ActionsSheet } from '@/components/room/actions-sheet';
import { Button } from '@/components/waifui/button';

const messageSchema = z.object({
  message: z.string().min(1).max(150)
});

type MessageFormValues = z.infer<typeof messageSchema>;

export const PreGame = ({
  roomState,
  messages
}: {
  roomState: Room;
  messages: Message[];
}) => {
  const { push } = useRouter();

  const { data: roomAdmin } = trpc.user.getUsername.useQuery({
    userId: roomState.roomAdmin
  });
  const { mutateAsync, isLoading } = trpc.message.sendMessage.useMutation();

  const messageBoxRef = useRef<RNScrollView | null>(null);

  const [sheetState, setSheetState] = useState({ open: false });

  const { control, handleSubmit, reset } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: '' }
  });

  const onMessageSend: SubmitHandler<MessageFormValues> = async ({
    message
  }) => {
    const { success } = await mutateAsync({ roomId: roomState._id, message });

    if (success) {
      reset();
    }
  };

  return (
    <Fragment>
      <YStack w='100%' h='100%' p='$4' gap='$4'>
        <XStack jc='space-between' ai='center'>
          <Text fos='$8' col='$foreground'>
            {roomState.roomName}
          </Text>
          <Button
            size='icon'
            variant='outlined'
            onPress={() => setSheetState({ open: true })}
          >
            <Ellipsis color='$foreground' size={16} />
          </Button>
        </XStack>
        <YStack h='100%' f={1} gap='$2' p='$4' bw='$1' boc='$border' br='$3'>
          <Text>Chat</Text>
          <ScrollView
            ref={messageBoxRef}
            onContentSizeChange={() =>
              messageBoxRef?.current?.scrollToEnd({ animated: true })
            }
          >
            <YStack gap='$2'>
              {messages.map(({ _id, owner, message }) => (
                <Text key={`message-${_id}`}>{`${owner} - ${message}`}</Text>
              ))}
            </YStack>
          </ScrollView>
          <XStack ai='center' gap='$2'>
            <Controller
              control={control}
              name='message'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  f={1}
                  h='$4'
                  placeholder='Enter your message...'
                />
              )}
            />
            <Button
              size='icon'
              h='100%'
              variant='outlined'
              onPress={handleSubmit(onMessageSend)}
              disabled={isLoading}
            >
              <Send color='$foreground' size={16} />
            </Button>
          </XStack>
        </YStack>
        <XStack h='100%' f={1} gap='$2'>
          <YStack
            w='100%'
            h='100%'
            f={1}
            gap='$2'
            p='$4'
            bw='$1'
            boc='$border'
            br='$3'
          >
            <Text>Active Users - {roomState.participants.length}</Text>
            <ScrollView>
              <YStack gap='$2'>
                {roomState.participants.map(({ _id, username }) => (
                  <Text key={`participant-${_id}`}>
                    {username}
                    {roomState.roomAdmin === _id ? ' - Admin' : null}
                  </Text>
                ))}
              </YStack>
            </ScrollView>
          </YStack>
          <YStack
            w='100%'
            h='100%'
            f={1}
            gap='$2'
            p='$4'
            bw='$1'
            boc='$border'
            br='$3'
          >
            <YStack gap='$2'>
              <XStack gap='$2'>
                <Shield color='$foreground' size={16} />
                <Text>{roomAdmin?.username}</Text>
              </XStack>
              <XStack gap='$2'>
                <MessageCircleQuestion color='$foreground' size={16} />
                <Text>{roomState.gameSettings.questionsPerUser}</Text>
              </XStack>
              <XStack gap='$2'>
                <Timer color='$foreground' size={16} />
                <Text>{roomState.gameSettings.answerPeriod}</Text>
              </XStack>
            </YStack>
          </YStack>
        </XStack>
        <Button w='100%' onPress={() => push('/')}>
          Leave Room
        </Button>
      </YStack>
      <ActionsSheet
        {...{
          open: sheetState.open,
          onOpenChange: () => setSheetState({ open: false }),
          roomState
        }}
      />
    </Fragment>
  );
};
