import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tokens } from '../../theme/tokens';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { LineChart } from '../../components/LineChart';
import { Skeleton } from '../../components/Skeleton';
import { getPriceHistory, getProduct } from '../../services/api';
import { PriceHistoryPoint, Product } from '../../data/mockData';
import { TrendingDown, Calendar } from 'lucide-react-native';

export default function PriceHistoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [history, setHistory] = React.useState<PriceHistoryPoint[]>([]);
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    if (id) {
      Promise.all([getPriceHistory(id), getProduct(id)]).then(([hist, prod]) => {
        setHistory(hist);
        setProduct(prod);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !product) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Price History" onBack={() => router.back()} />
        <View style={{ padding: 16, gap: 16 }}>
          <Skeleton height={200} radius={20} />
          <Skeleton height={150} radius={20} />
        </View>
      </View>
    );
  }

  const prices = history.map((h) => h.price);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Real Price History" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.subtitle}>Tracked over last 60 days in Pakistani retail stores</Text>

        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <TrendingDown size={20} color={tokens.colors.success} />
            <Text style={styles.chartTitle}>Lowest Price in 30 Days</Text>
          </View>
          <LineChart data={prices} width={320} height={180} />
        </Card>

        <Text style={styles.sectionTitle}>Price Milestones</Text>
        <View style={styles.timeline}>
          {history.map((pt, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <View style={styles.rowBetween}>
                  <Text style={styles.timelineDate}>{pt.date}</Text>
                  <Text style={styles.timelinePrice}>Rs. {pt.price.toLocaleString()}</Text>
                </View>
                {pt.event && <Text style={styles.timelineEvent}>{pt.event}</Text>}
              </View>
            </View>
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
  title: {
    ...tokens.typography.title,
    color: tokens.colors.navy900,
  },
  subtitle: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
    marginBottom: tokens.spacing.lg,
  },
  chartCard: {
    marginBottom: tokens.spacing.xl,
    alignItems: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: tokens.spacing.md,
  },
  chartTitle: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
  },
  sectionTitle: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
    marginBottom: tokens.spacing.md,
  },
  timeline: {
    gap: tokens.spacing.md,
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: tokens.colors.navy900,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.card,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    ...tokens.shadows.card,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineDate: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  timelinePrice: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  timelineEvent: {
    ...tokens.typography.caption,
    color: tokens.colors.success,
    fontWeight: '700',
    marginTop: 2,
  },
});
