import { useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import { colors } from '@/theme'

type RateChartProps = {
  points: number[]
  height?: number
}

const STROKE_INSET = 3

export function RateChart({ points, height = 80 }: RateChartProps) {
  const [width, setWidth] = useState(0)

  function handleLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width)
  }

  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = points.length > 1 ? width / (points.length - 1) : 0
  const usableHeight = height - STROKE_INSET * 2

  const line = points
    .map((point, index) => {
      const x = index * step
      const y = STROKE_INSET + (1 - (point - min) / range) * usableHeight
      return `${index === 0 ? 'M' : 'L'}${x} ${y}`
    })
    .join(' ')

  return (
    <View onLayout={handleLayout} style={{ height }}>
      {width > 0 && (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="rateChartFill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.gold} stopOpacity={0.45} />
              <Stop offset="1" stopColor={colors.gold} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Path d={`${line} L${width} ${height} L0 ${height} Z`} fill="url(#rateChartFill)" />
          <Path
            d={line}
            stroke={colors.gold}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      )}
    </View>
  )
}
