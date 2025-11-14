/**
 * Journal Editor Screen
 * Create and edit journal entries
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { GlassButton } from '../../components/common/GlassButton';
import { Theme } from '../../../core/theme';
import { JournalRepository } from '../../../data/repositories/JournalRepository';

export const JournalEditorScreen: React.FC = () => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;

    try {
      setSaving(true);
      await JournalRepository.createEntry({
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFavorite: false,
      });
      setContent('');
      // Navigate back
    } catch (error) {
      console.error('Failed to save entry:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>New Entry</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="What's on your mind today? Reflect on your experiences..."
          placeholderTextColor={Theme.colors.text.light.tertiary}
          value={content}
          onChangeText={setContent}
          autoFocus
        />

        <View style={styles.footer}>
          <GlassButton
            title="Save"
            onPress={handleSave}
            variant="primary"
            disabled={!content.trim()}
            loading={saving}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.light.primary,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: Theme.spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.glass.darkLight,
  },
  title: {
    ...Theme.typography.titleMedium,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.xxSmall,
  },
  date: {
    ...Theme.typography.caption,
    color: Theme.colors.text.light.secondary,
  },
  input: {
    flex: 1,
    padding: Theme.spacing.large,
    ...Theme.typography.bodyLarge,
    color: Theme.colors.text.light.primary,
    textAlignVertical: 'top',
  },
  footer: {
    padding: Theme.spacing.large,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.glass.darkLight,
  },
});
