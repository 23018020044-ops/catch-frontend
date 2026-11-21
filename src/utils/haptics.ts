import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const triggerHaptic = (style: 'light' | 'medium' | 'heavy' | 'selection' = 'light') => {
  if (Platform.OS === 'web') return;
  try {
    if (style === 'selection') {
      Haptics.selectionAsync();
    } else if (style === 'light') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (style === 'medium') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (style === 'heavy') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  } catch (e) {
    // ignore on unsupported devices
  }
};
