import { StyleSheet, Text, TextProps } from 'react-native'
import { colors, fonts } from '@/theme'

type Variant = 'title' | 'caption' | 'label' | 'body' | 'amount' | 'rate'

type AppTextProps = TextProps & {
  variant?: Variant
  color?: string
}

export function AppText({ variant = 'body', color, style, ...props }: AppTextProps) {
  return <Text {...props} style={[styles[variant], color ? { color } : null, style]} />
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.serif,
    fontSize: 34,
    color: colors.text,
  },
  caption: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    color: colors.text,
  },
  amount: {
    fontFamily: fonts.mono,
    fontSize: 34,
    letterSpacing: 2,
    color: colors.text,
  },
  rate: {
    fontFamily: fonts.mono,
    fontSize: 28,
    letterSpacing: 1,
    color: colors.text,
  },
})
