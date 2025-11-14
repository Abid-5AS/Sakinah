/**
 * Sakinah App - Main Entry Point
 * A privacy-first spiritual companion for Muslims
 * بسم الله الرحمن الرحيم
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/presentation/navigation';
import { initDatabase } from './src/data/local/database';
import { EncryptionService } from './src/services/encryption';
import { Theme } from './src/core/theme';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize encryption service
      await EncryptionService.initializeMasterKey();
      console.log('✅ Encryption initialized');

      // Initialize database
      await initDatabase();
      console.log('✅ Database initialized');

      // Small delay for splash effect
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsReady(true);
    } catch (err) {
      console.error('Failed to initialize app:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to initialize app:</Text>
        <Text style={styles.errorDetails}>{error}</Text>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={styles.container}>
        <View style={styles.splashContent}>
          <Text style={styles.splashTitle}>سَكِينَة</Text>
          <Text style={styles.splashSubtitle}>Sakinah</Text>
          <Text style={styles.splashDescription}>Your Personal Spiritual Companion</Text>
          <ActivityIndicator
            size="large"
            color={Theme.colors.primary.main}
            style={styles.loader}
          />
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    padding: Theme.spacing.xLarge,
  },
  splashTitle: {
    fontSize: 48,
    color: Theme.colors.primary.main,
    marginBottom: Theme.spacing.small,
  },
  splashSubtitle: {
    ...Theme.typography.titleLarge,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.xSmall,
  },
  splashDescription: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.secondary,
    marginBottom: Theme.spacing.xLarge,
  },
  loader: {
    marginTop: Theme.spacing.xLarge,
  },
  errorText: {
    ...Theme.typography.titleMedium,
    color: Theme.colors.system.error,
    marginBottom: Theme.spacing.small,
  },
  errorDetails: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.secondary,
    textAlign: 'center',
    padding: Theme.spacing.large,
  },
});
