import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { tokens } from '../../theme/tokens';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/Card';
import { ToggleRow } from '../../components/ToggleRow';
import { useUserStore, useSettingsStore } from '../../store/useStore';
import { Shield, CreditCard, Bell, User, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const toggleBank = useUserStore((s) => s.toggleBank);
  const locationConsent = useSettingsStore((s) => s.locationConsent);
  const setLocationConsent = useSettingsStore((s) => s.setLocationConsent);

  const availableBanks = ['HBL', 'Meezan Bank', 'SadaPay', 'NayaPay', 'Bank Alfalah', 'Standard Chartered'];

  return (
    <View style={styles.container}>
      <AppHeader
        mallName="Lucky One Mall, Karachi"
        onSelectMall={() => router.push('/notifications')}
        onNotifications={() => router.push('/notifications')}
        avatarUrl={profile.avatar}
        onProfile={() => {}}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.phone}>{profile.phone}</Text>
          </View>
        </View>

        {/* Bank & Wallet Preferences */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <CreditCard size={20} color={tokens.colors.navy900} />
            <Text style={styles.cardTitle}>My Cards & Wallets for Discounts</Text>
          </View>
          <Text style={styles.cardSubtitle}>Select your cards to auto-verify highest bank discount coupons.</Text>
          <View style={styles.bankGrid}>
            {availableBanks.map((bank) => {
              const selected = profile.selectedBanks.includes(bank);
              return (
                <TouchableOpacity
                  key={bank}
                  style={[styles.bankChip, selected && styles.bankChipSelected]}
                  onPress={() => toggleBank(bank)}
                >
                  <Text style={[styles.bankText, selected && styles.bankTextSelected]}>{bank}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Body Measurements */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <User size={20} color={tokens.colors.navy900} />
            <Text style={styles.cardTitle}>Body Measurements & Fit</Text>
          </View>
          <View style={styles.measurementsRow}>
            <View style={styles.measureBox}>
              <Text style={styles.measureVal}>{profile.measurements.chest}</Text>
              <Text style={styles.measureLabel}>Chest</Text>
            </View>
            <View style={styles.measureBox}>
              <Text style={styles.measureVal}>{profile.measurements.waist}</Text>
              <Text style={styles.measureLabel}>Waist</Text>
            </View>
            <View style={styles.measureBox}>
              <Text style={styles.measureVal}>{profile.measurements.shoe}</Text>
              <Text style={styles.measureLabel}>Shoe Size</Text>
            </View>
          </View>
        </Card>

        {/* Settings */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Bell size={20} color={tokens.colors.navy900} />
            <Text style={styles.cardTitle}>Shopping Assistant Settings</Text>
          </View>
          <ToggleRow
            label="Location Consent"
            description="Allow indoor mall tracking and store distance calculation"
            value={locationConsent}
            onValueChange={setLocationConsent}
          />
        </Card>

        <TouchableOpacity style={styles.devLink} onPress={() => router.push('/dev/components')}>
          <Shield size={18} color={tokens.colors.navy900} />
          <Text style={styles.devLinkText}>View Design System Components (/dev/components)</Text>
          <ChevronRight size={16} color={tokens.colors.navy900} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.ice50,
  },
  content: {
    padding: tokens.spacing.lg,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.lg,
    marginBottom: tokens.spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: tokens.colors.border,
  },
  name: {
    ...tokens.typography.title,
    color: tokens.colors.navy900,
  },
  phone: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
  },
  card: {
    marginBottom: tokens.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.xs,
  },
  cardTitle: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
  },
  cardSubtitle: {
    ...tokens.typography.caption,
    color: tokens.colors.text500,
    marginBottom: tokens.spacing.md,
  },
  bankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
  bankChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: tokens.radius.chip,
    backgroundColor: tokens.colors.ice50,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  bankChipSelected: {
    backgroundColor: tokens.colors.navy900,
    borderColor: tokens.colors.navy900,
  },
  bankText: {
    ...tokens.typography.caption,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  bankTextSelected: {
    color: tokens.colors.white,
  },
  measurementsRow: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
    marginTop: tokens.spacing.sm,
  },
  measureBox: {
    flex: 1,
    backgroundColor: tokens.colors.ice50,
    borderRadius: tokens.radius.card,
    padding: tokens.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  measureVal: {
    ...tokens.typography.title,
    color: tokens.colors.navy900,
  },
  measureLabel: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
    marginTop: 2,
  },
  devLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.gold100,
    padding: tokens.spacing.lg,
    borderRadius: tokens.radius.card,
    gap: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.gold400,
  },
  devLinkText: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
    flex: 1,
  },
});
