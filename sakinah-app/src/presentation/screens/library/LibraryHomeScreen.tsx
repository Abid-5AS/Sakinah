/**
 * Library Home Screen
 * Gateway to Quran, Hadith, and 99 Names
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { GlassCard } from '../../components/common/GlassCard';
import { Theme } from '../../../core/theme';

export const LibraryHomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Library</Text>
          <Text style={styles.subtitle}>Knowledge Vault of Islamic Wisdom</Text>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardIcon}>📿</Text>
            <Text style={styles.cardTitle}>99 Names of Allah</Text>
            <Text style={styles.cardDescription}>
              Learn and reflect on Asma ul Husna
            </Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardIcon}>📖</Text>
            <Text style={styles.cardTitle}>Quran</Text>
            <Text style={styles.cardDescription}>
              Read and understand the Divine Book
            </Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardIcon}>📚</Text>
            <Text style={styles.cardTitle}>Hadith</Text>
            <Text style={styles.cardDescription}>
              Authentic sayings of Prophet Muhammad ﷺ
            </Text>
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.light.primary,
  },
  content: {
    padding: Theme.spacing.large,
  },
  header: {
    marginBottom: Theme.spacing.large,
  },
  title: {
    ...Theme.typography.titleLarge,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.xxSmall,
  },
  subtitle: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.secondary,
  },
  card: {
    marginBottom: Theme.spacing.medium,
  },
  cardContent: {
    alignItems: 'center',
    padding: Theme.spacing.large,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: Theme.spacing.medium,
  },
  cardTitle: {
    ...Theme.typography.titleSmall,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.small,
  },
  cardDescription: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.secondary,
    textAlign: 'center',
  },
});
