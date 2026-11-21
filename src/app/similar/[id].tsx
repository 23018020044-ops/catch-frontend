import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { PriceText } from '../../components/PriceText';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Skeleton } from '../../components/Skeleton';
import { Product } from '../../data/mockData';
import { getProduct, getSimilarProducts } from '../../services/api';
import { tokens } from '../../theme/tokens';

export default function SimilarProductsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [target, setTarget] = React.useState<Product | null>(null);

  React.useEffect(() => {
    if (id) {
      Promise.all([getSimilarProducts(id), getProduct(id)]).then(([sim, prod]) => {
        setProducts(sim);
        setTarget(prod);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !target) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Similar Items" onBack={() => router.back()} />
        <View style={{ padding: 16, gap: 16 }}>
          <Skeleton height={150} radius={20} />
          <Skeleton height={100} radius={20} />
          <Skeleton height={100} radius={20} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Similar Items in Other Stores" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Comparing alternatives for {target.name}</Text>

        <View style={styles.grid}>
          {products.map((item) => (
            <Card
              key={item.id}
              style={styles.card}
            >
              <Image source={{ uri: item.images[0] }} style={styles.image} />
              <View style={styles.details}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.brand}>{item.brand}</Text>
                  <Badge label={item.storeName} variant="gold" />
                </View>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <PriceText currentPrice={item.currentPrice} originalPrice={item.originalPrice} />
                <View style={styles.couponTag}>
                  <Sparkles size={12} color={tokens.colors.success} />
                  <Text style={styles.couponText} numberOfLines={1}>{item.verifiedCoupon.code}: {item.verifiedCoupon.discount}</Text>
                </View>
              </View>
            </Card>
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
  subtitle: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
    marginBottom: tokens.spacing.lg,
  },
  grid: {
    gap: tokens.spacing.md,
  },
  card: {
    flexDirection: 'row',
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: tokens.radius.image,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brand: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  name: {
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
