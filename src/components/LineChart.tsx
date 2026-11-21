import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';
import Svg, { Path, Circle } from 'react-native-svg';

interface LineChartProps {
  data: number[];
  labels?: string[];
  width?: number;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data = [6420, 5800, 5200, 4494],
  width = 340,
  height = 160,
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 24;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const points = data.map((val, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * graphWidth;
    const y = height - padding - ((val - min) / range) * graphHeight;
    return { x, y, val };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* Simple grid line */}
        <Path d={`M ${padding} ${height / 2} L ${width - padding} ${height / 2}`} stroke={tokens.colors.border} strokeWidth="1" strokeDasharray="4 4" />
        {/* Line graph */}
        <Path d={pathD} fill="none" stroke={tokens.colors.navy900} strokeWidth="3" />
        {/* Dots */}
        {points.map((pt, i) => (
          <Circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={i === points.length - 1 ? 6 : 4}
            fill={i === points.length - 1 ? tokens.colors.gold400 : tokens.colors.navy900}
            stroke={tokens.colors.surface}
            strokeWidth="2"
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.ice50,
    borderRadius: tokens.radius.card,
    padding: tokens.spacing.sm,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
});
