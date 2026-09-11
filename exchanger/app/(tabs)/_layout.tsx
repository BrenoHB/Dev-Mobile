import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { colors } from '@/theme'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surfaceBorder,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="converter"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color }) => <Feather name="credit-card" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tendencia"
        options={{
          title: 'Tendência',
          tabBarIcon: ({ color }) => <Feather name="compass" size={20} color={color} />,
        }}
      />
    </Tabs>
  )
}
