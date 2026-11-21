import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../theme/tokens';

interface ProductImageProps {
  uri: string;
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  uri,
  width = '100%',
  height = 200,
  style,
}) => {
  return (
    <Image
      source={{ uri }}
      style={[styles.image, { width: width as any, height: height as any }, style as any]}
      contentFit="cover"
      transition={200}
      placeholder={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=20' }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: tokens.radius.image,
    backgroundColor: tokens.colors.ice100,
  },
});
