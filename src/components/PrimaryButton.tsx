import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { tokens } from '../theme/tokens';
import { triggerHaptic } from '../utils/haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ title, onPress, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.primary, (disabled || loading) && styles.disabled]}
      onPress={() => {
        triggerHaptic('medium');
        onPress();
      }}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={tokens.colors.white} />
      ) : (
        <Text style={styles.primaryText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export const AccentButton: React.FC<ButtonProps> = ({ title, onPress, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.accent, (disabled || loading) && styles.disabled]}
      onPress={() => {
        triggerHaptic('medium');
        onPress();
      }}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={tokens.colors.navy900} />
      ) : (
        <Text style={styles.accentText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export const GhostButton: React.FC<ButtonProps> = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.ghost, disabled && styles.disabled]}
      onPress={() => {
        triggerHaptic('light');
        onPress();
      }}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.ghostText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    height: 50,
    backgroundColor: tokens.colors.navy900,
    borderRadius: tokens.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.xl,
    ...tokens.shadows.button,
  },
  primaryText: {
    ...tokens.typography.body,
    color: tokens.colors.white,
    fontWeight: '700',
  },
  accent: {
    height: 50,
    backgroundColor: tokens.colors.gold400,
    borderRadius: tokens.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.xl,
    ...tokens.shadows.button,
  },
  accentText: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  ghost: {
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: tokens.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.xl,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  ghostText: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});
