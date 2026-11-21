import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ChevronDown, Bell } from 'lucide-react-native';
import { tokens } from '../theme/tokens';
import { triggerHaptic } from '../utils/haptics';

interface AppHeaderProps {
  mallName: string;
  onSelectMall: () => void;
  onNotifications: () => void;
  hasUnreadNotifications?: boolean;
  avatarUrl: string;
  onProfile: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  mallName,
  onSelectMall,
  onNotifications,
  hasUnreadNotifications = true,
  avatarUrl,
  onProfile,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mallPill}
        onPress={() => {
          triggerHaptic('light');
          onSelectMall();
        }}
        accessibilityRole="button"
        accessibilityLabel={`Selected mall: ${mallName}. Tap to change mall.`}
      >
        <View style={styles.mallDot} />
        <Text style={styles.mallText} numberOfLines={1}>
          {mallName}
        </Text>
        <ChevronDown size={14} color={tokens.colors.navy900} />
      </TouchableOpacity>

      <View style={styles.rightGroup}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            triggerHaptic('light');
            onNotifications();
          }}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Bell size={18} color={tokens.colors.navy900} />
          {hasUnreadNotifications && <View style={styles.badgeDot} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            triggerHaptic('light');
            onProfile();
          }}
          accessibilityRole="button"
          accessibilityLabel="User profile"
        >
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing.lg,
    backgroundColor: tokens.colors.surface,
  },
  mallPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.ice50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: tokens.radius.chip,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    maxWidth: '60%',
    gap: 6,
  },
  mallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.colors.success,
  },
  mallText: {
    ...tokens.typography.caption,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: tokens.colors.ice50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.colors.danger,
    borderWidth: 1,
    borderColor: tokens.colors.surface,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
});
