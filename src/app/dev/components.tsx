import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { tokens } from '../../theme/tokens';
import { AppHeader } from '../../components/AppHeader';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Badge } from '../../components/Badge';
import { PrimaryButton, AccentButton, GhostButton } from '../../components/PrimaryButton';
import { SectionHeader } from '../../components/SectionHeader';
import { PriceText } from '../../components/PriceText';
import { StatTile } from '../../components/StatTile';
import { ToggleRow } from '../../components/ToggleRow';
import { EmptyState } from '../../components/EmptyState';
import { ErrorBanner } from '../../components/ErrorBanner';
import { OfflineBanner } from '../../components/OfflineBanner';
import { Skeleton } from '../../components/Skeleton';
import { LineChart } from '../../components/LineChart';
import { ProductImage } from '../../components/ProductImage';
import { ShoppingBag } from 'lucide-react-native';

export default function DevComponentsScreen() {
  const [toggleVal, setToggleVal] = React.useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>CATCH Design System Components</Text>
      <Text style={styles.subheading}>Visual check for all shared components</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AppHeader</Text>
        <AppHeader
          mallName="Lucky One Mall, Karachi"
          onSelectMall={() => {}}
          onNotifications={() => {}}
          avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
          onProfile={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ScreenHeader</Text>
        <ScreenHeader title="Product Details" onBack={() => {}} onShare={() => {}} onBookmark={() => {}} isBookmarked />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OfflineBanner</Text>
        <OfflineBanner />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Card & ProductImage</Text>
        <Card>
          <ProductImage uri="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80" height={150} />
          <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Structured Denim Jacket</Text>
          <PriceText currentPrice={4494} originalPrice={6420} />
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chips</Text>
        <View style={styles.row}>
          <Chip label="All" selected />
          <Chip label="Jackets" />
          <Chip label="HBL Bank" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.row}>
          <Badge label="Verified Coupon" variant="success" />
          <Badge label="HBL 30% Off" variant="gold" />
          <Badge label="Limited Stock" variant="danger" />
          <Badge label="Standard" variant="neutral" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>
        <View style={{ gap: 10 }}>
          <PrimaryButton title="Apply HBL Coupon" onPress={() => {}} />
          <AccentButton title="Scan Tag Now" onPress={() => {}} />
          <GhostButton title="View Price History" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SectionHeader</Text>
        <SectionHeader title="Nearby Stores" onSeeAll={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>StatTile</Text>
        <View style={styles.row}>
          <StatTile label="Active Coupons" value="42" icon={<ShoppingBag size={20} color={tokens.colors.navy900} />} />
          <StatTile label="Floor" value="1st Floor" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ToggleRow</Text>
        <ToggleRow label="Price Drop Notifications" description="Get notified when prices drop" value={toggleVal} onValueChange={setToggleVal} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ErrorBanner</Text>
        <ErrorBanner message="Unable to connect to location services." />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skeleton</Text>
        <Skeleton width="100%" height={40} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LineChart</Text>
        <LineChart data={[6420, 5800, 5200, 4494]} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EmptyState</Text>
        <EmptyState title="No Items Found" message="Your closet is empty. Add your first item." buttonTitle="Add Item" onAction={() => {}} />
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
    paddingBottom: 60,
  },
  heading: {
    ...tokens.typography.display,
    color: tokens.colors.navy900,
    marginBottom: 4,
  },
  subheading: {
    ...tokens.typography.body,
    color: tokens.colors.text500,
    marginBottom: tokens.spacing.xl,
  },
  section: {
    marginBottom: tokens.spacing.xl,
  },
  sectionTitle: {
    ...tokens.typography.section,
    color: tokens.colors.navy900,
    marginBottom: tokens.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
});
