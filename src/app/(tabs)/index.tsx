import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { tokens } from '../../theme/tokens';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Badge } from '../../components/Badge';
import { AccentButton } from '../../components/PrimaryButton';
import { SectionHeader } from '../../components/SectionHeader';
import { PriceText } from '../../components/PriceText';
import { Skeleton } from '../../components/Skeleton';
import { getHomeData } from '../../services/api';
import { Mall, Store, Product, Promotion, UserProfile } from '../../data/mockData';
import { Scan, Sparkles } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<{
    user: UserProfile;
    malls: Mall[];
    currentMall: Mall;
    stores: Store[];
    products: Product[];
    promotions: Promotion[];
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  React.useEffect(() => {
    getHomeData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <View style={styles.container}>
        <Skeleton height={60} />
        <View style={{ padding: 16, gap: 16 }}>
          <Skeleton height={140} radius={20} />
          <Skeleton height={40} />
          <Skeleton height={200} radius={20} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        mallName={data.currentMall.name + ', ' + data.currentMall.city}
        onSelectMall={() => router.push('/notifications')}
        onNotifications={() => router.push('/notifications')}
        avatarUrl={data.user.avatar}
        onProfile={() => router.push('/(tabs)/profile')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Mall Welcome Hero Banner */}
        <Card style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={{ flex: 1 }}>
              <Badge label="LIVE IN MALL • 42 COUPONS" variant="success" />
              <Text style={styles.heroTitle}>{data.currentMall.name}</Text>
              <Text style={styles.heroSubtitle}>Walk in & unlock instant bank discounts on clothing.</Text>
            </View>
            <Image source={{ uri: data.currentMall.image }} style={styles.heroImage} />
          </View>
          <View style={styles.heroActions}>
            <AccentButton title="Scan Tag Now" onPress={() => router.push('/scan')} />
          </View>
        </Card>

        {/* Quick Scan Action Banner */}
        <TouchableOpacity style={styles.scanBanner} onPress={() => router.push('/scan')}>
          <View style={styles.scanIconWrap}>
            <Scan size={24} color={tokens.colors.gold400} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.scanTitle}>Instant Price & Coupon Scanner</Text>
            <Text style={styles.scanSubtitle}>Point camera at any clothing tag or shelf item</Text>
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {['All', 'Jackets', 'Traditional', 'Shirts', 'Bottoms'].map((cat) => (
            <Chip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* Nearby Stores in Mall */}
        <SectionHeader title="Stores Around You" onSeeAll={() => router.push('/(tabs)/nearby')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storesRow}>
          {data.stores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.storeCard}
              onPress={() => router.push(`/store/${store.id}`)}
            >
              <Image source={{ uri: store.image }} style={styles.storeImage} />
              <View style={styles.storeInfo}>
                <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
                <Text style={styles.storeMeta}>Floor {store.floor} • {store.distanceMeters}m away</Text>
                <Badge label={store.activeDiscounts} variant="gold" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Verified Deals & Products */}
        <SectionHeader title="Verified Coupons & Price Drops" />
        <View style={styles.productsGrid}>
          {data.products
            .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
            .map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <Image source={{ uri: product.images[0] }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                  <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                  <PriceText currentPrice={product.currentPrice} originalPrice={product.originalPrice} />
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
  scrollContent: {
    padding: tokens.spacing.lg,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: tokens.colors.navy900,
    marginBottom: tokens.spacing.lg,
    borderWidth: 0,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  heroTitle: {
    ...tokens.typography.title,
    color: tokens.colors.white,
    marginTop: 6,
  },
  heroSubtitle: {
    ...tokens.typography.caption,
    color: tokens.colors.ice100,
    marginTop: 4,
  },
  heroImage: {
    width: 90,
    height: 90,
    borderRadius: tokens.radius.image,
  },
  heroActions: {
    marginTop: tokens.spacing.lg,
  },
  scanBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.navy700,
    borderRadius: tokens.radius.card,
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
    ...tokens.shadows.card,
  },
  scanIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: tokens.colors.navy900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanTitle: {
    ...tokens.typography.body,
    color: tokens.colors.white,
    fontWeight: '700',
  },
  scanSubtitle: {
    ...tokens.typography.caption,
    color: tokens.colors.gold400,
  },
  categoryRow: {
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.md,
  },
  storesRow: {
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  storeCard: {
    width: 180,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.card,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    overflow: 'hidden',
    ...tokens.shadows.card,
  },
  storeImage: {
    width: '100%',
    height: 100,
  },
  storeInfo: {
    padding: tokens.spacing.md,
    gap: 4,
  },
  storeName: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  storeMeta: {
    ...tokens.typography.caption,
    color: tokens.colors.text500,
    fontSize: 11,
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
    width: 110,
    height: 120,
  },
  productDetails: {
    flex: 1,
    padding: tokens.spacing.md,
    justifyContent: 'space-between',
  },
  productBrand: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  productName: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
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
