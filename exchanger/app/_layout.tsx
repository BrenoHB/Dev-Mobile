import { CurrencyProvider } from '@/context/currency-context'
import { colors } from '@/theme'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SystemUI.setBackgroundColorAsync(colors.background)

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CurrencyProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'none',
            contentStyle: { backgroundColor: colors.background },
          }}
        />
      </CurrencyProvider>
    </SafeAreaProvider>
  )
}
