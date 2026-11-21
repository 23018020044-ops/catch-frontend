export interface UserProfile {
  name: string;
  phone: string;
  avatar: string;
  mallId: string;
  selectedBanks: string[];
  measurements: {
    chest: string;
    waist: string;
    shoulders: string;
    shoe: string;
    preferredFit: 'Slim' | 'Regular' | 'Oversized';
  };
  alertLimit: number;
  locationConsent: boolean;
}

export interface Mall {
  id: string;
  name: string;
  city: string;
  floors: number;
  activeCouponsCount: number;
  image: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  mallId: string;
  floor: number;
  shopNumber: string;
  logo: string;
  image: string;
  distanceMeters: number;
  activeDiscounts: string;
  isOpen: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  storeId: string;
  storeName: string;
  currentPrice: number;
  originalPrice: number;
  discountPercent: number;
  category: string;
  images: string[];
  verifiedCoupon: {
    code: string;
    discount: string;
    validUntil: string;
    bankOrWallet: string;
    verifiedMinutesAgo: number;
  };
  rating: number;
  sizesAvailable: string[];
  colors: string[];
  inStock: boolean;
  floor: number;
  shopNumber: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  event?: string;
}

export interface Promotion {
  id: string;
  title: string;
  brand: string;
  storeId: string;
  code: string;
  discount: string;
  expires: string;
  bankLogo: string;
  category: string;
}

export interface ClosetItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  size: string;
  pricePaid: number;
  dateAdded: string;
  image: string;
  matchedProductId?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'price_drop' | 'coupon' | 'store' | 'closet';
}

export const MOCK_USER: UserProfile = {
  name: 'Hamza Khan',
  phone: '+92 300 1234567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  mallId: 'mall-1',
  selectedBanks: ['HBL', 'Meezan Bank', 'SadaPay', 'Nayapay'],
  measurements: {
    chest: '40"',
    waist: '32"',
    shoulders: '18"',
    shoe: '10 UK',
    preferredFit: 'Regular',
  },
  alertLimit: 15,
  locationConsent: true,
};

export const MOCK_MALLS: Mall[] = [
  {
    id: 'mall-1',
    name: 'Lucky One Mall',
    city: 'Karachi',
    floors: 4,
    activeCouponsCount: 42,
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=80',
  },
  {
    id: 'mall-2',
    name: 'Packages Mall',
    city: 'Lahore',
    floors: 3,
    activeCouponsCount: 35,
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80',
  },
  {
    id: 'mall-3',
    name: 'Centaurus Mall',
    city: 'Islamabad',
    floors: 4,
    activeCouponsCount: 28,
    image: 'https://images.unsplash.com/photo-1567449339001-7d229eb0c946?w=800&q=80',
  },
];

export const MOCK_STORES: Store[] = [
  {
    id: 'store-1',
    name: 'Outfitters',
    category: 'Western Wear',
    mallId: 'mall-1',
    floor: 1,
    shopNumber: 'Shop 104',
    logo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    distanceMeters: 45,
    activeDiscounts: 'Flat 20% + 15% HBL',
    isOpen: true,
  },
  {
    id: 'store-2',
    name: 'Gul Ahmed',
    category: 'Traditional & Casual',
    mallId: 'mall-1',
    floor: 2,
    shopNumber: 'Shop 210',
    logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    distanceMeters: 120,
    activeDiscounts: 'Up to 50% Off',
    isOpen: true,
  },
  {
    id: 'store-3',
    name: 'Ethnic by Outfitters',
    category: 'Fusion Wear',
    mallId: 'mall-1',
    floor: 1,
    shopNumber: 'Shop 112',
    logo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    distanceMeters: 80,
    activeDiscounts: 'Buy 2 Get 1 Free',
    isOpen: true,
  },
  {
    id: 'store-4',
    name: 'Breakout',
    category: 'Youth Streetwear',
    mallId: 'mall-1',
    floor: 2,
    shopNumber: 'Shop 225',
    logo: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    distanceMeters: 150,
    activeDiscounts: '25% Meezan Card',
    isOpen: true,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Structured Oversized Denim Jacket',
    brand: 'Outfitters',
    storeId: 'store-1',
    storeName: 'Outfitters',
    currentPrice: 4494,
    originalPrice: 6420,
    discountPercent: 30,
    category: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&q=80',
    ],
    verifiedCoupon: {
      code: 'HBLCASUAL30',
      discount: 'Rs. 1,200 extra off via HBL Debit',
      validUntil: 'Tomorrow, 11 PM',
      bankOrWallet: 'HBL',
      verifiedMinutesAgo: 4,
    },
    rating: 4.8,
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    colors: ['#2B3E50', '#5C768D', '#111111'],
    inStock: true,
    floor: 1,
    shopNumber: 'Shop 104',
  },
  {
    id: 'p2',
    name: 'Embroidery Lawn Kurta 3-Piece',
    brand: 'Gul Ahmed',
    storeId: 'store-2',
    storeName: 'Gul Ahmed',
    currentPrice: 5850,
    originalPrice: 7800,
    discountPercent: 25,
    category: 'Traditional',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
    ],
    verifiedCoupon: {
      code: 'SADALAWN20',
      discount: '20% cashback on SadaPay',
      validUntil: 'Sunday',
      bankOrWallet: 'SadaPay',
      verifiedMinutesAgo: 12,
    },
    rating: 4.6,
    sizesAvailable: ['XS', 'S', 'M', 'L'],
    colors: ['#FFFFFF', '#E6C2BF', '#A8C3B6'],
    inStock: true,
    floor: 2,
    shopNumber: 'Shop 210',
  },
  {
    id: 'p3',
    name: 'Minimalist Relaxed Fit Linen Shirt',
    brand: 'Ethnic',
    storeId: 'store-3',
    storeName: 'Ethnic by Outfitters',
    currentPrice: 3200,
    originalPrice: 4000,
    discountPercent: 20,
    category: 'Shirts',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    ],
    verifiedCoupon: {
      code: 'MEEZAN25',
      discount: '25% off with Meezan Visa',
      validUntil: 'End of Month',
      bankOrWallet: 'Meezan Bank',
      verifiedMinutesAgo: 25,
    },
    rating: 4.7,
    sizesAvailable: ['S', 'M', 'L'],
    colors: ['#F5F5DC', '#D2B48C', '#808080'],
    inStock: true,
    floor: 1,
    shopNumber: 'Shop 112',
  },
  {
    id: 'p4',
    name: 'Urban Street Cargo Trousers',
    brand: 'Breakout',
    storeId: 'store-4',
    storeName: 'Breakout',
    currentPrice: 4990,
    originalPrice: 6500,
    discountPercent: 23,
    category: 'Bottoms',
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
    ],
    verifiedCoupon: {
      code: 'NAYAPAY15',
      discount: 'Rs. 800 off via NayaPay',
      validUntil: 'Today',
      bankOrWallet: 'NayaPay',
      verifiedMinutesAgo: 8,
    },
    rating: 4.5,
    sizesAvailable: ['30', '32', '34', '36'],
    colors: ['#2F4F4F', '#708090', '#000000'],
    inStock: true,
    floor: 2,
    shopNumber: 'Shop 225',
  },
];

export const MOCK_PRICE_HISTORY: Record<string, PriceHistoryPoint[]> = {
  p1: [
    { date: '1 Nov', price: 6420, event: 'Original Launch' },
    { date: '10 Nov', price: 6420 },
    { date: '20 Nov', price: 5800, event: 'Mid-Season Sale' },
    { date: '1 Dec', price: 5200 },
    { date: '10 Dec', price: 4494, event: 'Current Lowest Price' },
  ],
  p2: [
    { date: '5 Nov', price: 7800, event: 'New Arrival' },
    { date: '15 Nov', price: 7800 },
    { date: '28 Nov', price: 6500 },
    { date: '8 Dec', price: 5850, event: 'Weekend Special' },
  ],
};

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: 'HBL Weekend Mega Discount',
    brand: 'Outfitters',
    storeId: 'store-1',
    code: 'HBLWKND30',
    discount: '30% Off on All Outerwear',
    expires: 'In 2 days',
    bankLogo: 'HBL',
    category: 'Jackets',
  },
  {
    id: 'promo-2',
    title: 'Meezan Platinum Card Benefit',
    brand: 'Gul Ahmed',
    storeId: 'store-2',
    code: 'MEEZAN50',
    discount: 'Flat Rs. 1,500 off on purchases above Rs. 5,000',
    expires: 'Today',
    bankLogo: 'Meezan',
    category: 'Traditional',
  },
  {
    id: 'promo-3',
    title: 'SadaPay Instant Cashback',
    brand: 'Ethnic',
    storeId: 'store-3',
    code: 'SADAFLASH',
    discount: '20% Instant Cashback',
    expires: 'Tomorrow',
    bankLogo: 'SadaPay',
    category: 'Shirts',
  },
];

export const MOCK_CLOSET: ClosetItem[] = [
  {
    id: 'c1',
    name: 'Slim Fit Black Jeans',
    brand: 'Levis',
    category: 'Bottoms',
    size: '32',
    pricePaid: 5500,
    dateAdded: '12 Oct 2024',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
    matchedProductId: 'p4',
  },
  {
    id: 'c2',
    name: 'Classic White Sneaker',
    brand: 'Nike',
    category: 'Shoes',
    size: '10 UK',
    pricePaid: 14000,
    dateAdded: '20 Sep 2024',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80',
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Price Drop Alert!',
    message: 'Structured Oversized Denim Jacket at Outfitters dropped by Rs. 800.',
    time: '10m ago',
    read: false,
    type: 'price_drop',
  },
  {
    id: 'n2',
    title: 'New HBL Coupon Verified',
    message: 'Use code HBLCASUAL30 for extra Rs. 1,200 off near you.',
    time: '1h ago',
    read: false,
    type: 'coupon',
  },
  {
    id: 'n3',
    title: 'Closet Match Found',
    message: 'We found Urban Street Cargo Trousers that match your Slim Fit Black Jeans!',
    time: '3h ago',
    read: true,
    type: 'closet',
  },
];
