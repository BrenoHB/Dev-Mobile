import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { FavoriteChip } from '@/components/molecules/favorite-chip'
import { AppShell } from '@/components/organisms/app-shell'
import { ConverterCard } from '@/components/organisms/converter-card'
import { RateCard } from '@/components/organisms/rate-card'
import { useCurrency } from '@/context/currency-context'
import { favorites, getCurrency } from '@/data/currencies'
import { colors, spacing } from '@/theme'

export default function Converter() {
  const { from, to, setTo, swap } = useCurrency()
  const [amount, setAmount] = useState('1.000,00')

  return (
    <AppShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="caption" color={colors.gold}>
            Maré · Câmbio
          </AppText>
          <AppText variant="title">Converter</AppText>
        </View>

        <ConverterCard
          from={from}
          to={to}
          amount={amount}
          onChangeAmount={setAmount}
          onSwap={swap}
        />

        <RateCard from={from} to={to} />

        <View>
          <AppText variant="caption" style={styles.sectionTitle}>
            Favoritas
          </AppText>
          <View style={styles.favorites}>
            {favorites.map(code => (
              <FavoriteChip
                key={code}
                code={code}
                active={to.code === code}
                onPress={() => setTo(getCurrency(code))}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </AppShell>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  favorites: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
})
