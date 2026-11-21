import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';
import { triggerHaptic } from '../utils/haptics';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onPress, icon }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected ? styles.selectedChip : styles.unselectedChip]}
      onPress={() => {
        triggerHaptic('selection');
        onPress?.();
      }}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      {icon}
      <Text style={[styles.label, selected ? styles.selectedLabel : styles.unselectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: tokens.radius.chip,
    gap: 6,
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: tokens.colors.navy900,
    borderColor: tokens.colors.navy900,
  },
  unselectedChip: {
    backgroundColor: tokens.colors.ice50,
    borderColor: tokens.colors.border,
  },
  label: {
    ...tokens.typography.caption,
    fontWeight: '700',
  },
  selectedLabel: {
    color: tokens.colors.white,
  },
  unselectedLabel: {
    color: tokens.colors.navy900,
  },
});
