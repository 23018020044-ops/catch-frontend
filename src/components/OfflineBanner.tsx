import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';
import { WifiOff } from 'lucide-react-native';

export const OfflineBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <WifiOff size={16} color={tokens.colors.white} />
      <Text style={styles.text}>You are offline. Showing cached mall deals.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.navy900,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.sm,
  },
  text: {
    ...tokens.typography.micro,
    color: tokens.colors.white,
    letterSpacing: 0.4,
  },
});
