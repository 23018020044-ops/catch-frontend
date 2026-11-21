import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

interface PriceTextProps {
  currentPrice: number;
  originalPrice: number;
  size?: 'normal' | 'large';
}

export const PriceText: React.FC<PriceTextProps> = ({ currentPrice, originalPrice, size = 'normal' }) => {
  const isLarge = size === 'large';
  return (
    <View style={styles.container}>
      <Text style={[isLarge ? styles.largeCurrent : styles.currentPrice]}>
        Rs. {currentPrice.toLocaleString()}
      </Text>
      {originalPrice > currentPrice && (
        <Text style={[isLarge ? styles.largeOriginal : styles.originalPrice]}>
          Rs. {originalPrice.toLocaleString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  currentPrice: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
  },
  originalPrice: {
    ...tokens.typography.caption,
    color: tokens.colors.text500,
    textDecorationLine: 'line-through',
  },
  largeCurrent: {
    ...tokens.typography.display,
    color: tokens.colors.navy900,
    fontSize: 24,
  },
  largeOriginal: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
    textDecorationLine: 'line-through',
  },
});
