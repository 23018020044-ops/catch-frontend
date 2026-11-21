import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tokens } from '../../theme/tokens';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Skeleton } from '../../components/Skeleton';
import { getStore, getStoreProducts } from '../../services/api';
import { Store, Product } from '../../data/mockData';
import { Image } from 'expo-image';
import { MapPin, Navigation, Sparkles } from 'lucide-react-native';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [store, setStore] = React.useState<Store | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (id) {
      Promise.all([getStore(id), getStoreProducts(id)]).then(([st, prods]) => {
        setStore(st);
        setProducts(prods);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !store) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Store Details" onBack={() => router.back()} />
        <View style={{ padding: 16, gap: 16 }}>
          <Skeleton height={200} radius={20} />
          <Skeleton height={100} radius={20} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title={store.name} onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: store.image }} style={styles.storeImage} />

        <Card style={styles.infoCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.storeTitle}>{store.name}</Text>
            <Badge label={store.isOpen ? 'Open Now' : 'Closed'} variant={store.isOpen ? 'success' : 'danger'} />
          </View>
          <Text style={styles.storeCat}>{store.category} • Floor {store.floor} ({store.shopNumber})</Text>

          <View style={styles.directionsRow}>
            <MapPin size={18} color={tokens.colors.gold400} />
            <Text style={styles.directionText}>{store.distanceMeters}m away • Indoor navigation ready</Text>
          </View>

          <PrimaryButton title="Start Indoor Navigation" onPress={() => {}} />
        </Card>

        <Text style={styles.sectionTitle}>Featured Deals in {store.name}</Text>
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <Image source={{ uri: product.images[0] }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.productPrice}>Rs. {product.currentPrice.toLocaleString()}</Text>
                <View style={styles.couponTag}>
                  <Sparkles size={12} color={tokens.colors.success} />
                  <Text style={styles.couponText} numberOfLines={1}>{product.verifiedCoupon.code}: {product.verifiedCoupon.discount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  storeImage: {
    width: '100%',
    height: 200,
    borderRadius: tokens.radius.card,
    marginBottom: tokens.spacing.md,
  },
  infoCard: {
    marginBottom: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeTitle: {
    ...tokens.typography.title,
    color: tokens.colors.navy900,
  },
  storeCat: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
  },
  directionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.navy900,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.small,
    gap: tokens.spacing.sm,
  },
  directionText: {
    ...tokens.typography.caption,
    color: tokens.colors.white,
    fontWeight: '700',
  },
  sectionTitle: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
    marginBottom: tokens.spacing.md,
  },
  productsGrid: {
    gap: tokens.spacing.md,
  },
  productCard: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.card,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    flexDirection: 'row',
    overflow: 'hidden',
    ...tokens.shadows.card,
  },
  productImage: {
    width: 100,
    height: 110,
  },
  productInfo: {
    flex: 1,
    padding: tokens.spacing.md,
    justifyContent: 'space-between',
  },
  productName: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  productPrice: {
    ...tokens.typography.caption,
    color: tokens.colors.navy700,
    fontWeight: '700',
  },
  couponTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.successBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: tokens.radius.small,
    gap: 4,
  },
  couponText: {
    ...tokens.typography.micro,
    color: tokens.colors.success,
    fontSize: 10,
  },
});

import { TouchableOpacity } from 'react-native';
