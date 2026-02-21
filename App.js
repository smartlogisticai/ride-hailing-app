// ─── App.js ───────────────────────────────────────────────────────────────────
// Entry point for the Expo application.
// Handles splash screen, fonts, and safe area providers.

import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate asset loading / auth check (replace with real logic)
        await new Promise(r => setTimeout(r, 1200));
      } catch (err) {
        console.warn('App initialization error:', err);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) return null;

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={Platform.OS === 'android'}
      />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}
