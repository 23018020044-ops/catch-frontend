import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { BottomNav } from '../../components/BottomNav';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        const currentRoute = props.state.routes[props.state.index].name;
        let tab: 'home' | 'nearby' | 'closet' | 'profile' = 'home';
        if (currentRoute === 'nearby') tab = 'nearby';
        if (currentRoute === 'closet') tab = 'closet';
        if (currentRoute === 'profile') tab = 'profile';

        return (
          <BottomNav
            currentTab={tab}
            onTabPress={(t) => {
              if (t === 'scan') {
                router.push('/scan');
              } else if (t === 'home') {
                router.push('/(tabs)');
              } else {
                router.push(`/(tabs)/${t}`);
              }
            }}
          />
        );
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="nearby" />
      <Tabs.Screen name="closet" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
