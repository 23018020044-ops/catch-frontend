import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react-native';
import { tokens } from '../theme/tokens';
import { triggerHaptic } from '../utils/haptics';

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  onShare,
  onBookmark,
  isBookmarked = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => {
          triggerHaptic('light');
          onBack();
        }}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <ArrowLeft size={20} color={tokens.colors.navy900} />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightActions}>
        {onShare && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              triggerHaptic('light');
              onShare();
            }}
            accessibilityRole="button"
            accessibilityLabel="Share item"
          >
            <Share2 size={18} color={tokens.colors.navy900} />
          </TouchableOpacity>
        )}
        {onBookmark && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              triggerHaptic('selection');
              onBookmark();
            }}
            accessibilityRole="button"
            accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark item'}
          >
            <Bookmark
              size={18}
              color={isBookmarked ? tokens.colors.gold400 : tokens.colors.navy900}
              fill={isBookmarked ? tokens.colors.gold400 : 'transparent'}
            />
          </TouchableOpacity>
        )}
        {!onShare && !onBookmark && <View style={{ width: 38 }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing.lg,
    backgroundColor: tokens.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
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
  },
  title: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: tokens.spacing.md,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },
});
