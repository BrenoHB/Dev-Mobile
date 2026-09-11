import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CurrencyProvider } from '@/context/currency-context'
import { colors } from '@/theme'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CurrencyProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        />
      </CurrencyProvider>
    </SafeAreaProvider>
  )
}
