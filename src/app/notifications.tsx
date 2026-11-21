import { useRouter } from 'expo-router';
import { CheckCircle, Tag, TrendingDown } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { Skeleton } from '../components/Skeleton';
import { NotificationItem } from '../data/mockData';
import { getNotifications } from '../services/api';
import { tokens } from '../theme/tokens';

export default function NotificationsScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);

  React.useEffect(() => {
    getNotifications().then((res) => {
      setNotifications(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Notifications" onBack={() => router.back()} />
        <View style={{ padding: 16, gap: 16 }}>
          <Skeleton height={80} radius={16} />
          <Skeleton height={80} radius={16} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Notifications & Price Alerts" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {notifications.map((item) => (
            <Card key={item.id} style={styles.card}>
              <View style={styles.iconWrap}>
                {item.type === 'price_drop' && <TrendingDown size={20} color={tokens.colors.success} />}
                {item.type === 'coupon' && <Tag size={20} color={tokens.colors.gold400} />}
                {item.type === 'closet' && <CheckCircle size={20} color={tokens.colors.navy900} />}
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
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
  list: {
    gap: tokens.spacing.md,
  },
  card: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: tokens.colors.ice50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    ...tokens.typography.body,
    color: tokens.colors.navy900,
    fontWeight: '700',
  },
  timeText: {
    ...tokens.typography.micro,
    color: tokens.colors.text500,
  },
  message: {
    ...tokens.typography.caption,
    color: tokens.colors.text500,
  },
});
