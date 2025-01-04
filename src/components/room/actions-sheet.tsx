import { useState, useEffect, Fragment } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  YStack,
  XStack,
  View,
  ScrollView,
  Text,
  Input,
  Label,
  Checkbox
} from 'tamagui';
import { Check as CheckIcon } from '@tamagui/lucide-icons';

import { trpc } from '@/lib/trpc';
import { Room } from '@/types';
import { useUserStore } from '@/stores/user';
import { Sheet, SheetOverlay, SheetFrame } from '@/components/waifui/sheet';
import { Button } from '@/components/waifui/button';

const questionSchema = z.object({
  question: z
    .string()
    .min(3, { message: 'Question can be minimum 3 characters.' })
    .max(200, { message: 'Question can be maximum 200 characters.' }),
  answer1: z
    .string()
    .min(3, { message: 'Answer can be minimum 3 characters.' })
    .max(50, { message: 'Answer can be maximum 50 characters.' }),
  answer2: z
    .string()
    .min(3, { message: 'Answer can be minimum 3 characters.' })
    .max(50, { message: 'Answer can be maximum 50 characters.' }),
  answer3: z
    .string()
    .min(3, { message: 'Answer can be minimum 3 characters.' })
    .max(50, { message: 'Answer can be maximum 50 characters.' }),
  answer4: z
    .string()
    .min(3, { message: 'Answer can be minimum 3 characters.' })
    .max(50, { message: 'Answer can be maximum 50 characters.' }),
  correctAnswerIndex: z
    .number({ message: 'Please choose a correct answer for the question' })
    .min(0)
    .max(3)
});

type QuestionFormValues = z.infer<typeof questionSchema>;

export const ActionsSheet = ({
  open,
  onOpenChange,
  roomState
}: {
  open: boolean;
  onOpenChange: () => void;
  roomState: Room;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswerIndex: undefined
    }
  });

  const assignNewAdmin = trpc.room.assignNewAdmin.useMutation();
  const kickUser = trpc.room.kickUser.useMutation();
  const changeGameSettings = trpc.room.changeGameSettings.useMutation();
  const { data: userQuestions, refetch } =
    trpc.question.getQuestions.useQuery();
  const createQuestionMutation = trpc.question.createQuestion.useMutation({
    onSuccess: () => {
      reset();
      refetch();
      setView('chooseQuestions');
    }
  });

  console.log({ userQuestions });

  const [view, setView] = useState<
    | 'overview'
    | 'changeGameSettings'
    | 'kickUser'
    | 'assignNewAdmin'
    | 'changeQuestionsPerUser'
    | 'changeAnswerPeriod'
    | 'chooseQuestions'
    | 'createQuestion'
  >('createQuestion');

  const userData = useUserStore((state) => state.userData);

  // useEffect(() => {
  //   setView('overview');
  // }, [open]);

  const questionsPerUserOptions = ['5', '10', '15', '20'] as const;
  const answerPeriodOptions = ['30', '60', '90', '120'] as const;

  const correctAnswerIndex = watch('correctAnswerIndex');

  const onCreateQuestionSubmit: SubmitHandler<QuestionFormValues> = async ({
    question,
    correctAnswerIndex,
    ...answers
  }) =>
    await createQuestionMutation.mutateAsync({
      question,
      answers: Object.values(answers),
      correctAnswerIndex
    });

  const states = {
    overview: (
      <YStack flex={1} gap='$4'>
        {userData?._id === roomState.roomAdmin ? (
          <Fragment>
            <Button w='100%' onPress={() => setView('changeGameSettings')}>
              Change Game Settings
            </Button>
            <Button w='100%' onPress={() => setView('kickUser')}>
              Kick User
            </Button>
            <Button w='100%' onPress={() => setView('assignNewAdmin')}>
              Assign New Admin
            </Button>
          </Fragment>
        ) : null}
        <Button w='100%' onPress={() => setView('chooseQuestions')}>
          Choose Your Questions
        </Button>
        <View f={1} />
        <Button w='100%' onPress={onOpenChange}>
          Back
        </Button>
      </YStack>
    ),
    changeGameSettings: (
      <YStack flex={1} gap='$4'>
        <Button w='100%' onPress={() => setView('changeQuestionsPerUser')}>
          Questions per User
        </Button>
        <Button w='100%' onPress={() => setView('changeAnswerPeriod')}>
          Answer Period
        </Button>
        <View f={1} />
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
      </YStack>
    ),

    changeQuestionsPerUser: (
      <YStack flex={1} gap='$4'>
        {questionsPerUserOptions.map((option) => (
          <Button
            w='100%'
            key={`questionPerUserOption-${option}`}
            onPress={async () => {
              const { success } = await changeGameSettings.mutateAsync({
                roomId: roomState._id,
                settingToChange: 'questionsPerUser',
                newValue: option
              });

              if (success) {
                onOpenChange();
              }
            }}
          >
            {option}
          </Button>
        ))}
        <View f={1} />
        <Button w='100%' onPress={() => setView('changeGameSettings')}>
          Back
        </Button>
      </YStack>
    ),
    changeAnswerPeriod: (
      <YStack flex={1} gap='$4'>
        {answerPeriodOptions.map((option) => (
          <Button
            w='100%'
            key={`answerPeriodOption-${option}`}
            onPress={async () => {
              const { success } = await changeGameSettings.mutateAsync({
                roomId: roomState._id,
                settingToChange: 'answerPeriod',
                newValue: option
              });

              if (success) {
                onOpenChange();
              }
            }}
          >
            {option}s
          </Button>
        ))}
        <View f={1} />
        <Button w='100%' onPress={() => setView('changeGameSettings')}>
          Back
        </Button>
      </YStack>
    ),
    kickUser: (
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <YStack gap='$4'>
            {roomState.participants
              .filter(({ _id }) => _id !== userData?._id)
              .map(({ _id, username }) => (
                <Button
                  w='100%'
                  key={`participantToKick-${_id}`}
                  onPress={async () => {
                    const { success } = await kickUser.mutateAsync({
                      roomId: roomState._id,
                      kickedUser: _id
                    });

                    if (success) {
                      onOpenChange();
                    }
                  }}
                >
                  {username}
                </Button>
              ))}
          </YStack>
        </ScrollView>
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
      </YStack>
    ),
    assignNewAdmin: (
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <YStack gap='$4'>
            {roomState.participants
              .filter(({ _id }) => _id !== userData?._id)
              .map(({ _id, username }) => (
                <Button
                  w='100%'
                  key={`participant-${_id}`}
                  onPress={async () => {
                    const { success } = await assignNewAdmin.mutateAsync({
                      roomId: roomState._id,
                      newAdminId: _id
                    });

                    if (success) {
                      onOpenChange();
                    }
                  }}
                >
                  {username}
                </Button>
              ))}
          </YStack>
        </ScrollView>
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
      </YStack>
    ),
    chooseQuestions: (
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <YStack gap='$4'>
            {userQuestions !== undefined ? (
              userQuestions.length === 0 ? (
                <Text p='$4' ta='center'>
                  You have no question record, please create some.
                </Text>
              ) : (
                userQuestions.map((question) => (
                  <Button key={`question-${question._id}`}>
                    {question.question}
                  </Button>
                ))
              )
            ) : null}
          </YStack>
        </ScrollView>
        <Button w='100%' onPress={() => setView('createQuestion')}>
          Create Question
        </Button>
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
      </YStack>
    ),
    createQuestion: (
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <YStack gap='$4'>
            <Controller
              control={control}
              name='question'
              render={({ field: { onChange, onBlur, value } }) => (
                <Fragment>
                  <Label htmlFor='question'>Question</Label>
                  <Input
                    id='question'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    w='100%'
                    h='$4'
                  />
                </Fragment>
              )}
            />
            {errors['question'] ? (
              <Text>{errors?.['question']?.message as string}</Text>
            ) : null}
            {errors['correctAnswerIndex'] ? (
              <Text>{errors?.['correctAnswerIndex']?.message as string}</Text>
            ) : null}
            <Label>Answers</Label>
            {(['answer1', 'answer2', 'answer3', 'answer4'] as const).map(
              (formField, index) => (
                <Fragment key={`formField-${formField}`}>
                  <Controller
                    control={control}
                    name={formField}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <XStack ai='center' gap='$4'>
                        <Checkbox
                          checked={correctAnswerIndex === index}
                          onCheckedChange={() =>
                            setValue('correctAnswerIndex', index)
                          }
                        >
                          <Checkbox.Indicator>
                            <CheckIcon />
                          </Checkbox.Indicator>
                        </Checkbox>
                        <Input
                          id={formField}
                          autoCapitalize='none'
                          autoCorrect={false}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          w='100%'
                          h='$4'
                        />
                      </XStack>
                    )}
                  />
                  {errors[formField] ? (
                    <Text>{errors?.[formField]?.message as string}</Text>
                  ) : null}
                </Fragment>
              )
            )}
          </YStack>
        </ScrollView>
        <Button w='100%' onPress={handleSubmit(onCreateQuestionSubmit)}>
          Create
        </Button>
        <Button w='100%' onPress={() => setView('overview')}>
          Back
        </Button>
      </YStack>
    )
  };

  return (
    <Sheet {...{ open, onOpenChange, disableDrag: true }}>
      <SheetOverlay />
      <SheetFrame>
        <YStack p='$4' flex={1}>
          {states[view]}
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
