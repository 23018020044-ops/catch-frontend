import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { tokens } from '../theme/tokens';
import { PrimaryButton } from '../components/PrimaryButton';
import { Sparkles } from 'lucide-react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Sparkles size={40} color={tokens.colors.gold400} />
      </View>
      <Text style={styles.title}>Welcome to CATCH</Text>
      <Text style={styles.subtitle}>Contextual Automated Tracking, Comparison and Hub for Coupons in Pakistan Malls.</Text>
      <View style={{ width: '100%', marginTop: tokens.spacing.xl }}>
        <PrimaryButton title="Get Started" onPress={() => router.push('/(tabs)')} />
      </View>
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
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: tokens.colors.navy700,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacing.lg,
    borderWidth: 1,
    borderColor: tokens.colors.gold400,
  },
  title: {
    ...tokens.typography.display,
    color: tokens.colors.white,
    textAlign: 'center',
    marginBottom: tokens.spacing.sm,
  },
  subtitle: {
    ...tokens.typography.body,
    color: tokens.colors.ice100,
    textAlign: 'center',
  },
});
