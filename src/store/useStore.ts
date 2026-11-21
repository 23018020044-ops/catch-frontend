import { create } from 'zustand';
import { UserProfile, MOCK_USER } from '../data/mockData';

interface UserState {
  profile: UserProfile;
  updateProfile: (partial: Partial<UserProfile>) => void;
  toggleBank: (bankName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: MOCK_USER,
  updateProfile: (partial) =>
    set((state) => ({
      profile: { ...state.profile, ...partial },
    })),
  toggleBank: (bankName) =>
    set((state) => {
      const exists = state.profile.selectedBanks.includes(bankName);
      const selectedBanks = exists
        ? state.profile.selectedBanks.filter((b) => b !== bankName)
        : [...state.profile.selectedBanks, bankName];
      return { profile: { ...state.profile, selectedBanks } };
    }),
}));

interface ClosetState {
  items: Array<{
    id: string;
    name: string;
    brand: string;
    category: string;
    size: string;
    pricePaid: number;
    dateAdded: string;
    image: string;
  }>;
  addItem: (item: {
    name: string;
    brand: string;
    category: string;
    size: string;
    pricePaid: number;
    image: string;
  }) => void;
  removeItem: (id: string) => void;
}

export const useClosetStore = create<ClosetState>((set) => ({
  items: [
    {
      id: 'c1',
      name: 'Slim Fit Black Jeans',
      brand: 'Levis',
      category: 'Bottoms',
      size: '32',
      pricePaid: 5500,
      dateAdded: '12 Oct 2024',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
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
  ],
  addItem: (item) =>
    set((state) => ({
      items: [
        {
          ...item,
          id: `closet-${Date.now()}`,
          dateAdded: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        },
        ...state.items,
      ],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
}));

interface SettingsState {
  alertLimit: number;
  locationConsent: boolean;
  setAlertLimit: (limit: number) => void;
  setLocationConsent: (consent: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  alertLimit: 15,
  locationConsent: true,
  setAlertLimit: (alertLimit) => set({ alertLimit }),
  setLocationConsent: (locationConsent) => set({ locationConsent }),
}));
