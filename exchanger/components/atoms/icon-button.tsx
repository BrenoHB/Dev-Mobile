import { colors, radius } from '@/theme'
import { ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'

type IconButtonProps = {
  children: ReactNode
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  accessibilityRole?: 'button'
  accessibilityLabel?: string
}

export function IconButton({
  children,
  onPress,
  style,
  accessibilityRole,
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  pressed: {
    opacity: 0.6,
  },
})
