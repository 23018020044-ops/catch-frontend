import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { tokens } from '../../theme/tokens';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Skeleton } from '../../components/Skeleton';
import { getStores } from '../../services/api';
import { Store } from '../../data/mockData';
import { MapPin, Navigation, ArrowRight } from 'lucide-react-native';

export default function NearbyScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [stores, setStores] = React.useState<Store[]>([]);

  React.useEffect(() => {
    getStores().then((res) => {
      setStores(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={{ padding: 16, gap: 16 }}>
          <Skeleton height={200} radius={20} />
          <Skeleton height={100} radius={20} />
          <Skeleton height={100} radius={20} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Indoor Mall Map & Stores</Text>
      <Text style={styles.subtitle}>Lucky One Mall, Karachi • Ground & 1st Floor</Text>

      {/* Interactive Floor Map Graphic Preview */}
      <Card style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <MapPin size={20} color={tokens.colors.gold400} />
          <Text style={styles.mapTitle}>Live Indoor Navigation</Text>
          <Badge label="You are here: Floor 1" variant="success" />
        </View>
        <View style={styles.mapVisualContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=80' }}
            style={styles.mapImage}
          />
          <View style={styles.mapOverlay}>
            <View style={styles.pinPoint}>
              <Navigation size={16} color={tokens.colors.white} />
            </View>
            <Text style={styles.mapInstruction}>Outfitters is 45m away (1 min walk)</Text>
          </View>
        </View>
      </Card>

      <Text style={styles.sectionHeading}>All Stores in Mall</Text>
      <View style={styles.storeList}>
        {stores.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={styles.storeItem}
            onPress={() => router.push(`/store/${store.id}`)}
          >
            <Image source={{ uri: store.logo }} style={styles.storeLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeCat}>{store.category} • Floor {store.floor} ({store.shopNumber})</Text>
              <Badge label={store.activeDiscounts} variant="gold" />
            </View>
            <View style={styles.storeMetaRight}>
              <Text style={styles.distanceText}>{store.distanceMeters}m</Text>
              <ArrowRight size={16} color={tokens.colors.text500} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
    ...tokens.typography.display,
    color: tokens.colors.navy900,
  },
  subtitle: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
    marginBottom: tokens.spacing.lg,
  },
  mapCard: {
    backgroundColor: tokens.colors.navy900,
    marginBottom: tokens.spacing.xl,
    padding: tokens.spacing.md,
    borderWidth: 0,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.md,
  },
  mapTitle: {
    ...tokens.typography.section,
    color: tokens.colors.white,
    flex: 1,
  },
  mapVisualContainer: {
    height: 180,
    borderRadius: tokens.radius.image,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(20, 32, 74, 0.9)',
    borderRadius: tokens.radius.small,
    padding: tokens.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },
  pinPoint: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: tokens.colors.gold400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapInstruction: {
    ...tokens.typography.caption,
    color: tokens.colors.white,
    fontWeight: '700',
  },
  sectionHeading: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
    marginBottom: tokens.spacing.md,
  },
  storeList: {
    gap: tokens.spacing.md,
  },
  storeItem: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.card,
    padding: tokens.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    ...tokens.shadows.card,
  },
  storeLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  storeName: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  storeCat: {
    ...tokens.typography.caption,
    color: tokens.colors.text500,
    marginBottom: 4,
  },
  storeMetaRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  distanceText: {
    ...tokens.typography.caption,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
});
