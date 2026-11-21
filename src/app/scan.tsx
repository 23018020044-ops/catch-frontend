import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { tokens } from '../theme/tokens';
import { ScreenHeader } from '../components/ScreenHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { Camera, RefreshCw } from 'lucide-react-native';

export default function ScanScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Scan Tag / Item" onBack={() => router.back()} />

      <View style={styles.cameraBox}>
        <View style={styles.viewfinder}>
          <Camera size={48} color={tokens.colors.gold400} />
          <Text style={styles.viewfinderText}>Align clothing barcode or tag within frame</Text>
        </View>

        <View style={styles.controls}>
          <PrimaryButton title="Simulate Successful Scan" onPress={() => router.push('/product/p1')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.navy900,
  },
  cameraBox: {
    flex: 1,
    padding: tokens.spacing.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewfinder: {
    width: '100%',
    flex: 1,
    borderWidth: 2,
    borderColor: tokens.colors.gold400,
    borderRadius: tokens.radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.md,
    borderStyle: 'dashed',
    marginVertical: tokens.spacing.xl,
    padding: tokens.spacing.xxl,
  },
  viewfinderText: {
    ...tokens.typography.body,
    color: tokens.colors.white,
    textAlign: 'center',
  },
  controls: {
    width: '100%',
    marginBottom: tokens.spacing.xxl,
  },
});
