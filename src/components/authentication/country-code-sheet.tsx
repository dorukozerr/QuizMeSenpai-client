import { useState } from 'react';
import { YStack, Input, ScrollView, View } from 'tamagui';
import { X } from '@tamagui/lucide-icons';

import { countries } from '@/constants/countries';
import { Sheet, SheetOverlay, SheetFrame } from '@/components/waifui/sheet';
import { Button } from '@/components/waifui/button';

export const CountryCodeSheet = ({
  open,
  onOpenChange,
  onCountryCodeSelection
}: {
  open: boolean;
  onOpenChange: () => void;
  onCountryCodeSelection: (code: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Sheet {...{ open, onOpenChange, disableDrag: true }}>
      <SheetOverlay />
      <SheetFrame>
        <YStack
          w='100%'
          h='100%'
          dsp='flex'
          jc='flex-start'
          ai='flex-start'
          p='$4'
          gap='$4'
          pos='relative'
        >
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Search...'
            onChangeText={setSearchTerm}
            w='75%'
            autoFocus={true}
          />
          <Button
            size='icon'
            variant='ghost'
            pos='absolute'
            r='$1'
            t='$1'
            onPress={onOpenChange}
          >
            <X size='$1' />
          </Button>
          <ScrollView w='100%' f={1}>
            <View
              dsp='flex'
              fd='column'
              jc='flex-start'
              ai='flex-start'
              gap='$4'
            >
              {countries
                .filter(({ name }) =>
                  name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(({ name, dialCode }, index) => (
                  <Button
                    key={`countryCodeSelectItem-${index}`}
                    onPress={() => onCountryCodeSelection(dialCode)}
                    h='max-content'
                    py='$2'
                    jc='flex-start'
                    variant='outlined'
                  >
                    {`${name} ${dialCode}`}
                  </Button>
                ))}
            </View>
          </ScrollView>
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};
