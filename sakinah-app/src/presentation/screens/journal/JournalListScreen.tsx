/**
 * Journal List Screen
 * Displays all journal entries with liquid glass cards
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { GlassCard } from '../../components/common/GlassCard';
import { GlassButton } from '../../components/common/GlassButton';
import { Theme } from '../../../core/theme';
import { JournalEntry } from '../../../core/types';
import { JournalRepository } from '../../../data/repositories/JournalRepository';
import { format } from 'date-fns';

export const JournalListScreen: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await JournalRepository.getAllEntries();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load entries:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadEntries();
  };

  const handleCreateEntry = () => {
    // Navigate to editor
    console.log('Create new entry');
  };

  const getPreview = (content: string, maxLength: number = 150) => {
    return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity style={styles.entryContainer} activeOpacity={0.9}>
      <GlassCard elevation={2}>
        <View>
          <View style={styles.entryHeader}>
            <Text style={styles.entryDate}>
              {format(item.createdAt, 'EEEE, MMM d, yyyy')}
            </Text>
            {item.isFavorite && <Text style={styles.favoriteIcon}>⭐</Text>}
          </View>

          <Text style={styles.entryContent}>{getPreview(item.content)}</Text>

          {item.mood && (
            <View style={styles.moodContainer}>
              <Text style={styles.moodText}>{item.mood}</Text>
            </View>
          )}

          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 3).map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journal</Text>
        <Text style={styles.subtitle}>Your Private Spiritual Sanctuary</Text>
      </View>

      {loading && entries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading your journal...</Text>
        </View>
      ) : entries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Start Your Journey</Text>
          <Text style={styles.emptyText}>
            Begin reflecting on your spiritual experiences
          </Text>
          <GlassButton
            title="Create First Entry"
            onPress={handleCreateEntry}
            variant="primary"
            size="large"
            style={styles.createButton}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={entries}
            renderItem={renderEntry}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.fab}>
            <GlassButton
              title="+"
              onPress={handleCreateEntry}
              variant="primary"
              style={styles.fabButton}
              textStyle={styles.fabText}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.light.primary,
  },
  header: {
    padding: Theme.spacing.large,
    paddingTop: Theme.spacing.xLarge,
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
  listContent: {
    padding: Theme.spacing.medium,
    paddingBottom: 100,
  },
  entryContainer: {
    marginBottom: Theme.spacing.medium,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.small,
  },
  entryDate: {
    ...Theme.typography.caption,
    color: Theme.colors.text.light.secondary,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  entryContent: {
    ...Theme.typography.bodyLarge,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.small,
    lineHeight: Theme.typography.bodyLarge.lineHeight,
  },
  moodContainer: {
    marginTop: Theme.spacing.small,
  },
  moodText: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.primary.main,
    textTransform: 'capitalize',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xSmall,
    marginTop: Theme.spacing.small,
  },
  tag: {
    backgroundColor: Theme.colors.journal.highlight,
    paddingHorizontal: Theme.spacing.small,
    paddingVertical: Theme.spacing.xxSmall,
    borderRadius: Theme.borderRadius.small,
  },
  tagText: {
    ...Theme.typography.caption,
    color: Theme.colors.primary.main,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xLarge,
  },
  emptyTitle: {
    ...Theme.typography.titleMedium,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.small,
  },
  emptyText: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.secondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.large,
  },
  createButton: {
    marginTop: Theme.spacing.medium,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: Theme.spacing.large,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 32,
    lineHeight: 32,
  },
});
