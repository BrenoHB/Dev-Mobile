import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { colors, fonts, radius, spacing } from '@/theme'

type DateFieldProps = {
  label: string
  value: string
}

export function DateField({ label, value }: DateFieldProps) {
  return (
    <View style={styles.field}>
      <AppText variant="caption">{label}</AppText>
      <AppText style={styles.value}>{value}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.background,
  },
  value: {
    fontFamily: fonts.mono,
    fontSize: 15,
  },
})
