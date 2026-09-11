import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { spacing } from '@/theme'

type StatProps = {
  label: string
  value: string
  color: string
  align?: 'left' | 'right'
}

export function Stat({ label, value, color, align = 'left' }: StatProps) {
  return (
    <View style={align === 'right' && styles.right}>
      <AppText variant="caption">{label}</AppText>
      <AppText variant="rate" color={color} style={styles.value}>
        {value}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  right: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 22,
    marginTop: spacing.sm,
  },
})
