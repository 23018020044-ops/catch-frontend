import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: tokens.colors.border, true: tokens.colors.navy900 }}
        thumbColor={tokens.colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  textContainer: {
    flex: 1,
    marginRight: tokens.spacing.md,
  },
  label: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  description: {
    ...tokens.typography.caption,
    color: tokens.colors.text500,
    marginTop: 2,
  },
});
