import { StyleSheet, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { BR, EU, GB, JP, US } from 'country-flag-icons/string/3x2'

const flags: Record<string, string> = { BR, EU, GB, JP, US }

type FlagProps = {
  country: string
  width?: number
}

export function Flag({ country, width = 26 }: FlagProps) {
  const xml = flags[country]
  if (!xml) return null

  const height = (width * 2) / 3

  return (
    <View style={[styles.frame, { width, height }]}>
      <SvgXml xml={xml} width={width} height={height} />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: 4,
    overflow: 'hidden',
  },
})
