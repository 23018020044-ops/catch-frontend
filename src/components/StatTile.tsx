import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

interface StatTileProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export const StatTile: React.FC<StatTileProps> = ({ label, value, icon }) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.card,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    padding: tokens.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...tokens.shadows.card,
  },
  iconContainer: {
    marginBottom: tokens.spacing.xs,
  },
  value: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
  },
  label: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
    marginTop: 2,
  },
});
