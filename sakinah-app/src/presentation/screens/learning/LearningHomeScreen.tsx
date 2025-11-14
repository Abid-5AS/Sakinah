/**
 * Learning Home Screen
 * Flashcards and spaced repetition system
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { GlassCard } from '../../components/common/GlassCard';
import { GlassButton } from '../../components/common/GlassButton';
import { Theme } from '../../../core/theme';

export const LearningHomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Learning</Text>
          <Text style={styles.subtitle}>Master the 99 Names</Text>
        </View>

        <GlassCard style={styles.card} elevation={3}>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Memorized</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Learning</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>74</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
          </View>
        </GlassCard>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Practice</Text>
          <GlassCard style={styles.practiceCard}>
            <Text style={styles.practiceText}>5 cards due for review</Text>
            <GlassButton
              title="Start Practice"
              onPress={() => console.log('Start practice')}
              variant="primary"
              style={styles.practiceButton}
            />
          </GlassCard>
        </View>

        <View style={styles.section}>
          <GlassButton
            title="Browse All Names"
            onPress={() => console.log('Browse')}
            variant="secondary"
            size="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.light.primary,
  },
  content: {
    flex: 1,
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
    marginBottom: Theme.spacing.large,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Theme.spacing.medium,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    ...Theme.typography.displaySmall,
    color: Theme.colors.primary.main,
    fontWeight: Theme.fontWeights.bold,
  },
  statLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.text.light.secondary,
    marginTop: Theme.spacing.xxSmall,
  },
  statDivider: {
    width: 1,
    backgroundColor: Theme.colors.glass.darkLight,
  },
  section: {
    marginBottom: Theme.spacing.large,
  },
  sectionTitle: {
    ...Theme.typography.titleSmall,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.medium,
  },
  practiceCard: {
    padding: Theme.spacing.large,
    alignItems: 'center',
  },
  practiceText: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.medium,
  },
  practiceButton: {
    marginTop: Theme.spacing.small,
  },
});
