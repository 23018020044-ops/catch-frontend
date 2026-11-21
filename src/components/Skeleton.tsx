import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../theme/tokens';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  radius = tokens.radius.small,
  style,
}) => {
  return (
    <View
      style={[
        styles.skeleton,
        { width: width as any, height, borderRadius: radius },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: tokens.colors.border,
    opacity: 0.6,
  },
});
