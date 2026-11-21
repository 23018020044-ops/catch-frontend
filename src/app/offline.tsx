import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { tokens } from '../theme/tokens';
import { PrimaryButton } from '../components/PrimaryButton';
import { WifiOff } from 'lucide-react-native';

export default function OfflineScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <WifiOff size={48} color={tokens.colors.gold400} />
      <Text style={styles.title}>You are Offline</Text>
      <Text style={styles.subtitle}>CATCH has cached your mall's verified coupons and store locations.</Text>
      <PrimaryButton title="Go to Dashboard" onPress={() => router.push('/(tabs)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.navy900,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing.xxl,
    gap: tokens.spacing.md,
  },
  title: {
    ...tokens.typography.display,
    color: tokens.colors.white,
    textAlign: 'center',
  },
  subtitle: {
    ...tokens.typography.body,
    color: tokens.colors.ice100,
    textAlign: 'center',
    marginBottom: tokens.spacing.lg,
  },
});
