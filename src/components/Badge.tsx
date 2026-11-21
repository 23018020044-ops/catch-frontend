import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

interface BadgeProps {
  label: string;
  variant?: 'neutral' | 'gold' | 'success' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return { bg: tokens.colors.gold100, text: tokens.colors.navy900 };
      case 'success':
        return { bg: tokens.colors.successBg, text: tokens.colors.success };
      case 'danger':
        return { bg: tokens.colors.dangerBg, text: tokens.colors.danger };
      default:
        return { bg: tokens.colors.ice100, text: tokens.colors.navy900 };
    }
  };

  const current = getVariantStyles();

  return (
    <View style={[styles.badge, { backgroundColor: current.bg }]}>
      <Text style={[styles.text, { color: current.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: tokens.radius.small,
    alignSelf: 'flex-start',
  },
  text: {
    ...tokens.typography.micro,
  },
});
