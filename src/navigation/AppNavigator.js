// ─── AppNavigator.js ──────────────────────────────────────────────────────────
// Root navigation structure:
//   Auth Stack → Main Tabs
//   Main Tabs:
//     Home (Dashboard)
//     Booking (Map + Fare Search) → FareSelection → Checkout
//     Activities
//     Chat

import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ── Screens ───────────────────────────────────────────────────────────────────
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BookingScreen from '../screens/BookingScreen';
import FareSelectionScreen from '../screens/FareSelectionScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ── Tab bar icon (no external icon lib) ──────────────────────────────────────
const TabIcon = ({ emoji, label, focused }) => (
  <View style={tabStyles.icon}>
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.3 }}>{emoji}</Text>
  </View>
);

// ── Booking Stack (has sub-screens) ──────────────────────────────────────────
const BookingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BookingMap" component={BookingScreen} />
    <Stack.Screen name="FareSelection" component={FareSelectionScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

// ── Placeholder screens for other tabs ───────────────────────────────────────
const PlaceholderScreen = ({ title }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
    <Text style={{ fontSize: 16, color: '#828282' }}>{title}</Text>
  </View>
);

const ActivitiesScreen = () => <PlaceholderScreen title="Actividad" />;
const ChatScreen = () => <PlaceholderScreen title="Chat" />;
const ProfileScreen = () => <PlaceholderScreen title="Perfil" />;

// ── Bottom Tab Navigator ──────────────────────────────────────────────────────
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 78,
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(255,255,255,0.96)',
        // iOS blur effect:
        // backdropFilter: 'blur(10px)', // works on web
      },
    })}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Inicio" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Booking"
      component={BookingStack}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" label="Buscar" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Activities"
      component={ActivitiesScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon emoji="↔️" label="Viajes" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Wallet"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon emoji="💳" label="Wallet" focused={focused} />,
      }}
    />
  </Tab.Navigator>
);

// ── Root Navigator ────────────────────────────────────────────────────────────
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

const tabStyles = StyleSheet.create({
  icon: { alignItems: 'center', justifyContent: 'center' },
});

export default AppNavigator;
