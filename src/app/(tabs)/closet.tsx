import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { tokens } from '../../theme/tokens';
import { AppHeader } from '../../components/AppHeader';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { PrimaryButton, GhostButton } from '../../components/PrimaryButton';
import { Skeleton } from '../../components/Skeleton';
import { EmptyState } from '../../components/EmptyState';
import { useClosetStore } from '../../store/useStore';
import { Shirt, Plus, Trash2, ExternalLink } from 'lucide-react-native';

export default function ClosetScreen() {
  const router = useRouter();
  const closetItems = useClosetStore((s) => s.items);
  const removeItem = useClosetStore((s) => s.removeItem);

  return (
    <View style={styles.container}>
      <AppHeader
        mallName="Lucky One Mall, Karachi"
        onSelectMall={() => router.push('/notifications')}
        onNotifications={() => router.push('/notifications')}
        avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
        onProfile={() => router.push('/(tabs)/profile')}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Digital Closet</Text>
            <Text style={styles.subtitle}>{closetItems.length} items cataloged • Outfit Matching Active</Text>
          </View>
          <PrimaryButton title="+ Add" onPress={() => router.push('/scan')} />
        </View>

        {closetItems.length === 0 ? (
          <EmptyState
            title="Your closet is empty"
            message="Scan clothing tags in stores or add items manually to unlock AI outfit matching."
            buttonTitle="Scan Tag"
            onAction={() => router.push('/scan')}
          />
        ) : (
          <View style={styles.grid}>
            {closetItems.map((item) => (
              <Card key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemContent}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemMeta}>Size: {item.size} • Rs. {item.pricePaid.toLocaleString()}</Text>
                  </View>
                  <View style={styles.itemActions}>
                    <GhostButton title="Find Match" onPress={() => router.push('/similar/p1')} />
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => removeItem(item.id)}
                      accessibilityRole="button"
                      accessibilityLabel="Remove item from closet"
                    >
                      <Trash2 size={16} color={tokens.colors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.lg,
  },
  title: {
    ...tokens.typography.display,
    color: tokens.colors.navy900,
  },
  subtitle: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
  },
  grid: {
    gap: tokens.spacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 90,
    borderRadius: tokens.radius.image,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
    height: 90,
  },
  itemBrand: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  itemName: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  itemMeta: {
    ...tokens.typography.caption,
    color: tokens.colors.text500,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  deleteBtn: {
    padding: 8,
    borderRadius: tokens.radius.small,
    backgroundColor: tokens.colors.dangerBg,
  },
});
