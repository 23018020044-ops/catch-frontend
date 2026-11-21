import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tokens } from '../../theme/tokens';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { PrimaryButton, AccentButton, GhostButton } from '../../components/PrimaryButton';
import { PriceText } from '../../components/PriceText';
import { Skeleton } from '../../components/Skeleton';
import { getProduct, getSimilarProducts } from '../../services/api';
import { Product } from '../../data/mockData';
import { Sparkles, TrendingDown, MapPin, Shirt, CheckCircle } from 'lucide-react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [similar, setSimilar] = React.useState<Product[]>([]);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [couponApplied, setCouponApplied] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      Promise.all([getProduct(id), getSimilarProducts(id)]).then(([prod, sim]) => {
        setProduct(prod);
        setSimilar(sim);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !product) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Product Details" onBack={() => router.back()} />
        <View style={{ padding: 16, gap: 16 }}>
          <Skeleton height={300} radius={20} />
          <Skeleton height={40} />
          <Skeleton height={100} radius={20} />
        </View>
      </View>
    );
  }

  const finalPrice = couponApplied ? product.currentPrice - 1200 : product.currentPrice;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={product.brand}
        onBack={() => router.back()}
        onShare={() => {}}
        onBookmark={() => setIsBookmarked(!isBookmarked)}
        isBookmarked={isBookmarked}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image source={{ uri: product.images[0] }} style={styles.mainImage} />

        <Card style={styles.mainCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Badge label={`Floor ${product.floor} • ${product.shopNumber}`} variant="neutral" />
          </View>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <PriceText currentPrice={finalPrice} originalPrice={product.originalPrice} size="large" />
            <TouchableOpacity onPress={() => router.push(`/price-history/${product.id}`)}>
              <Text style={styles.historyLink}>View Price History →</Text>
            </TouchableOpacity>
          </View>

          {/* Verified Coupon Box */}
          <View style={styles.couponBox}>
            <View style={styles.rowBetween}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Sparkles size={16} color={tokens.colors.success} />
                <Text style={styles.couponTitle}>Verified Bank Coupon</Text>
              </View>
              <Badge label={`Verified ${product.verifiedCoupon.verifiedMinutesAgo}m ago`} variant="success" />
            </View>
            <Text style={styles.couponDesc}>{product.verifiedCoupon.discount}</Text>
            <Text style={styles.couponCode}>Code: {product.verifiedCoupon.code}</Text>

            <PrimaryButton
              title={couponApplied ? 'Coupon Applied (Rs. 1,200 Off)' : `Apply ${product.verifiedCoupon.code}`}
              onPress={() => setCouponApplied(!couponApplied)}
            />
          </View>
        </Card>

        {/* Indoor Directions to Store */}
        <Card style={styles.navCard}>
          <MapPin size={22} color={tokens.colors.gold400} />
          <View style={{ flex: 1 }}>
            <Text style={styles.navCardTitle}>In-Store Navigation Available</Text>
            <Text style={styles.navCardSub}>{product.storeName} is on Floor {product.floor} (45m away)</Text>
          </View>
          <AccentButton title="Directions" onPress={() => router.push(`/store/${product.storeId}`)} />
        </Card>

        {/* Similar Items in Other Stores */}
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.sectionTitle}>Similar Items in Other Stores</Text>
          <TouchableOpacity onPress={() => router.push(`/similar/${product.id}`)}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarRow}>
          {similar.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.similarCard}
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <Image source={{ uri: item.images[0] }} style={styles.similarImage} />
              <View style={{ padding: 10, gap: 2 }}>
                <Text style={styles.similarBrand}>{item.brand}</Text>
                <Text style={styles.similarName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.similarPrice}>Rs. {item.currentPrice.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  mainImage: {
    width: '100%',
    height: 320,
    borderRadius: tokens.radius.card,
    marginBottom: tokens.spacing.md,
  },
  mainCard: {
    marginBottom: tokens.spacing.md,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  name: {
    ...tokens.typography.title,
    color: tokens.colors.navy900,
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: tokens.spacing.md,
  },
  historyLink: {
    ...tokens.typography.caption,
    color: tokens.colors.navy700,
    fontWeight: '700',
  },
  couponBox: {
    backgroundColor: tokens.colors.successBg,
    borderRadius: tokens.radius.card,
    padding: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.success,
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  },
  couponTitle: {
    ...tokens.typography.section,
    color: tokens.colors.success,
  },
  couponDesc: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  couponCode: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  navCard: {
    backgroundColor: tokens.colors.navy900,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
    borderWidth: 0,
  },
  navCardTitle: {
    ...tokens.typography.body,
    color: tokens.colors.white,
    fontWeight: '700',
  },
  navCardSub: {
    ...tokens.typography.caption,
    color: tokens.colors.ice100,
  },
  sectionHeaderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.md,
  },
  sectionTitle: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
  },
  seeAll: {
    ...tokens.typography.caption,
    color: tokens.colors.navy700,
    fontWeight: '700',
  },
  similarRow: {
    gap: tokens.spacing.md,
  },
  similarCard: {
    width: 160,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.card,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    overflow: 'hidden',
    ...tokens.shadows.card,
  },
  similarImage: {
    width: '100%',
    height: 140,
  },
  similarBrand: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  similarName: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
    fontSize: 13,
  },
  similarPrice: {
    ...tokens.typography.caption,
    color: tokens.colors.navy700,
    fontWeight: '700',
  },
});
