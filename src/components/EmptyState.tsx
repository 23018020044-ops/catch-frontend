import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';
import { GhostButton } from './PrimaryButton';
import { AlertCircle } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  buttonTitle?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, buttonTitle, onAction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AlertCircle size={32} color={tokens.colors.text500} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {buttonTitle && onAction && (
        <View style={styles.buttonWrapper}>
          <GhostButton title={buttonTitle} onPress={onAction} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: tokens.colors.ice50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  title: {
    ...tokens.typography.title,
    color: tokens.colors.navy900,
    textAlign: 'center',
    marginBottom: tokens.spacing.xs,
  },
  message: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
    textAlign: 'center',
    marginBottom: tokens.spacing.lg,
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 200,
  },
});
