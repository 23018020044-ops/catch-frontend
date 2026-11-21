import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, MapPin, Scan, Shirt, User } from 'lucide-react-native';
import { tokens } from '../theme/tokens';
import { triggerHaptic } from '../utils/haptics';

interface BottomNavProps {
  currentTab: 'home' | 'nearby' | 'closet' | 'profile';
  onTabPress: (tab: 'home' | 'nearby' | 'scan' | 'closet' | 'profile') => void;
  closetCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabPress, closetCount = 2 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          triggerHaptic('selection');
          onTabPress('home');
        }}
        accessibilityRole="button"
        accessibilityLabel="Home tab"
      >
        <Home size={22} color={currentTab === 'home' ? tokens.colors.navy900 : tokens.colors.text500} />
        <Text style={[styles.navText, currentTab === 'home' && styles.activeText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          triggerHaptic('selection');
          onTabPress('nearby');
        }}
        accessibilityRole="button"
        accessibilityLabel="Nearby stores and deals tab"
      >
        <MapPin size={22} color={currentTab === 'nearby' ? tokens.colors.navy900 : tokens.colors.text500} />
        <Text style={[styles.navText, currentTab === 'nearby' && styles.activeText]}>Nearby</Text>
      </TouchableOpacity>

      {/* Raised circular Scan button */}
      <View style={styles.scanWrapper}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            triggerHaptic('medium');
            onTabPress('scan');
          }}
          accessibilityRole="button"
          accessibilityLabel="Scan clothing tag or item"
        >
          <Scan size={26} color={tokens.colors.gold400} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          triggerHaptic('selection');
          onTabPress('closet');
        }}
        accessibilityRole="button"
        accessibilityLabel="Digital closet tab"
      >
        <View style={styles.iconContainer}>
          <Shirt size={22} color={currentTab === 'closet' ? tokens.colors.navy900 : tokens.colors.text500} />
          {closetCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{closetCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.navText, currentTab === 'closet' && styles.activeText]}>Closet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          triggerHaptic('selection');
          onTabPress('profile');
        }}
        accessibilityRole="button"
        accessibilityLabel="User profile tab"
      >
        <User size={22} color={currentTab === 'profile' ? tokens.colors.navy900 : tokens.colors.text500} />
        <Text style={[styles.navText, currentTab === 'profile' && styles.activeText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 68,
    flexDirection: 'row',
    backgroundColor: tokens.colors.surface,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
    paddingHorizontal: tokens.spacing.md,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  navText: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
    fontSize: 10,
  },
  activeText: {
    color: tokens.colors.navy900,
    fontWeight: '800',
  },
  scanWrapper: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  scanButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: tokens.colors.navy900,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: tokens.colors.gold400,
    ...tokens.shadows.button,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: tokens.colors.gold400,
    paddingHorizontal: 4,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: tokens.colors.navy900,
  },
});
