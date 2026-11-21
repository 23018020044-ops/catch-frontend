import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';
import { triggerHaptic } from '../utils/haptics';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSeeAll }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity
          onPress={() => {
            triggerHaptic('light');
            onSeeAll();
          }}
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.md,
    marginTop: tokens.spacing.lg,
  },
  title: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
  },
  seeAll: {
    ...tokens.typography.caption,
    color: tokens.colors.navy700,
    fontWeight: '700',
  },
});
