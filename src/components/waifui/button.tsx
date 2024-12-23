import { forwardRef, ReactNode } from 'react';
import { Button as TamaguiButton, ButtonProps, Text } from 'tamagui';

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  children?: ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outlined'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'sm' | 'base' | 'lg' | 'icon';
  fontSize?: 'sm' | 'base' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'base',
      fontSize = 'base',
      ...props
    },
    ref
  ) => (
    <TamaguiButton
      ref={ref}
      w='max-content'
      p='$0'
      {...(variant === 'default'
        ? {
            bc: '$primary',
            hoverStyle: { opacity: 0.9, bc: '$primary' },
            pressStyle: { opacity: 0.6, bc: '$primary' }
          }
        : variant === 'destructive'
          ? {
              bc: '$destructive',
              hoverStyle: { opacity: 0.9, bc: '$destructive' },
              pressStyle: { opacity: 0.6, bc: '$destructive' }
            }
          : variant === 'outlined'
            ? {
                bc: '$background',
                bw: 1,
                boc: '$border',
                hoverStyle: { opacity: 0.9, bc: '$accent', boc: '$border' },
                pressStyle: { opacity: 0.6, bc: '$accent', boc: '$border' }
              }
            : variant === 'secondary'
              ? {
                  bc: '$secondary',
                  hoverStyle: { opacity: 0.9, bc: '$secondary' },
                  pressStyle: { opacity: 0.6, bc: '$secondary' }
                }
              : variant === 'ghost'
                ? {
                    bw: 0,
                    hoverStyle: { opacity: 0.9, bc: '$background' },
                    pressStyle: { opacity: 0.6, bc: '$background' }
                  }
                : variant === 'link'
                  ? {
                      bc: '$background',
                      hoverStyle: { opacity: 0.9, bc: '$background' },
                      pressStyle: { opacity: 0.6, bc: '$background' }
                    }
                  : {})}
      {...(size === 'sm'
        ? { h: '$3' }
        : size === 'base'
          ? { h: '$3.5' }
          : size === 'lg'
            ? { h: '$4' }
            : size === 'icon'
              ? { h: '$3.5', w: '$3.5' }
              : {})}
      {...props}
    >
      <Text
        w='max-content'
        h='100%'
        dsp='flex'
        jc='center'
        ai='center'
        p='$0'
        gap='$2'
        {...(variant === 'default'
          ? { col: '$primaryForeground' }
          : variant === 'destructive'
            ? { col: '$destructiveForeground' }
            : variant === 'outlined'
              ? { hoverStyle: { col: '$accentForeground' } }
              : variant === 'secondary'
                ? { col: '$secondaryForeground' }
                : variant === 'ghost'
                  ? { hoverStyle: { col: '$accentForeground' } }
                  : variant === 'link'
                    ? { hoverStyle: { textDecorationLine: 'underline' } }
                    : {})}
        {...(size === 'sm'
          ? { px: 12, py: '$0.75' }
          : size === 'base'
            ? { px: '$4', py: '$0.75' }
            : size === 'lg'
              ? { px: '$6' }
              : {})}
        {...(fontSize === 'sm'
          ? { fos: '$6' }
          : fontSize === 'lg'
            ? { fos: '$10' }
            : {})}
      >
        {children}
      </Text>
    </TamaguiButton>
  )
);

Button.displayName = 'Button';
