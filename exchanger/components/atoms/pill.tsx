import { ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { colors, radius, spacing } from '@/theme'

type PillProps = {
  children: ReactNode
  active?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export function Pill({ children, active, onPress, style }: PillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        active && styles.active,
        pressed && styles.pressed,
        style,
      ]}>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
  },
  active: {
    borderColor: colors.gold,
  },
  pressed: {
    opacity: 0.6,
  },
})
