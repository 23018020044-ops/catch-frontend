import {
  MOCK_USER,
  MOCK_MALLS,
  MOCK_STORES,
  MOCK_PRODUCTS,
  MOCK_PRICE_HISTORY,
  MOCK_PROMOTIONS,
  MOCK_CLOSET,
  MOCK_NOTIFICATIONS,
  UserProfile,
  Mall,
  Store,
  Product,
  PriceHistoryPoint,
  Promotion,
  ClosetItem,
  NotificationItem,
} from '../data/mockData';

const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getHomeData() {
  await delay();
  return {
    user: MOCK_USER,
    malls: MOCK_MALLS,
    currentMall: MOCK_MALLS[0],
    stores: MOCK_STORES,
    products: MOCK_PRODUCTS,
    promotions: MOCK_PROMOTIONS,
  };
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay();
  const found = MOCK_PRODUCTS.find((p) => p.id === id);
  return found || MOCK_PRODUCTS[0];
}

export async function getSimilarProducts(productId: string): Promise<Product[]> {
  await delay();
  const target = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!target) return MOCK_PRODUCTS;
  return MOCK_PRODUCTS.filter((p) => p.id !== productId && p.category === target.category);
}

export async function getStores(): Promise<Store[]> {
  await delay();
  return MOCK_STORES;
}

export async function getStore(id: string): Promise<Store | null> {
  await delay();
  return MOCK_STORES.find((s) => s.id === id) || MOCK_STORES[0];
}

export async function getStoreProducts(storeId: string): Promise<Product[]> {
  await delay();
  return MOCK_PRODUCTS.filter((p) => p.storeId === storeId);
}

export async function getPriceHistory(productId: string): Promise<PriceHistoryPoint[]> {
  await delay();
  return MOCK_PRICE_HISTORY[productId] || MOCK_PRICE_HISTORY['p1'];
}

export async function getPromotions(): Promise<Promotion[]> {
  await delay();
  return MOCK_PROMOTIONS;
}

export async function getClosetItems(): Promise<ClosetItem[]> {
  await delay();
  return MOCK_CLOSET;
}

export async function getNotifications(): Promise<NotificationItem[]> {
  await delay();
  return MOCK_NOTIFICATIONS;
}
