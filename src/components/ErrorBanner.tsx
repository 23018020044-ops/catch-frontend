import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';
import { AlertTriangle } from 'lucide-react-native';

interface ErrorBannerProps {
  message: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <AlertTriangle size={20} color={tokens.colors.danger} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.dangerBg,
    borderRadius: tokens.radius.small,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    borderWidth: 1,
    borderColor: tokens.colors.danger,
    marginVertical: tokens.spacing.sm,
  },
  text: {
    ...tokens.typography.body,
    color: tokens.colors.danger,
    flex: 1,
    fontWeight: '700',
  },
});
