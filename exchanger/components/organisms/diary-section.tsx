import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { Pill } from '@/components/atoms/pill'
import { DiaryEntry } from '@/components/molecules/diary-entry'
import { DiaryRecord } from '@/data/history'
import { formatNumber } from '@/lib/format'
import { colors, spacing } from '@/theme'

type DiarySectionProps = {
  entries: DiaryRecord[]
}

export function DiarySection({ entries }: DiarySectionProps) {
  return (
    <View>
      <View style={styles.header}>
        <AppText variant="caption">Seu diário de câmbio</AppText>
        <Pill active style={styles.button}>
          <AppText color={colors.gold} style={styles.buttonLabel}>
            + Registrar troca
          </AppText>
        </Pill>
      </View>

      <AppText color={colors.textMuted} style={styles.hint}>
        Registro manual — anote as trocas que você fez fora do app pra comparar com a cotação de
        hoje.
      </AppText>

      <View>
        {entries.map(entry => (
          <DiaryEntry
            key={entry.id}
            label={`${entry.date} · ${entry.description}`}
            rate={formatNumber(entry.rate, 4)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  hint: {
    marginTop: spacing.md,
    fontSize: 13,
    lineHeight: 19,
  },
})
