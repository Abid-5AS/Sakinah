/**
 * 99 Names List Screen
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { GlassCard } from '../../components/common/GlassCard';
import { Theme } from '../../../core/theme';
import { AsmaUlHusna } from '../../../core/types';
import namesData from '../../../assets/data/names/asma-ul-husna.json';

export const NamesListScreen: React.FC = () => {
  const [names, setNames] = useState<AsmaUlHusna[]>([]);

  useEffect(() => {
    setNames(namesData as AsmaUlHusna[]);
  }, []);

  const renderName = ({ item }: { item: AsmaUlHusna }) => (
    <TouchableOpacity style={styles.nameContainer}>
      <GlassCard elevation={2}>
        <View style={styles.nameContent}>
          <View style={styles.nameNumber}>
            <Text style={styles.numberText}>{item.id}</Text>
          </View>
          <View style={styles.nameDetails}>
            <Text style={styles.arabic}>{item.arabic}</Text>
            <Text style={styles.transliteration}>{item.transliteration}</Text>
            <Text style={styles.meaning}>{item.meaningEnglish}</Text>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Asma ul Husna</Text>
        <Text style={styles.subtitle}>The 99 Beautiful Names of Allah</Text>
      </View>

      <FlatList
        data={names}
        renderItem={renderName}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
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
  },
  nameContainer: {
    marginBottom: Theme.spacing.medium,
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.medium,
  },
  numberText: {
    ...Theme.typography.bodySmall,
    fontWeight: Theme.fontWeights.semibold,
    color: Theme.colors.primary.dark,
  },
  nameDetails: {
    flex: 1,
  },
  arabic: {
    fontSize: Theme.fontSizes.arabicTitle,
    color: Theme.colors.primary.main,
    marginBottom: Theme.spacing.xxSmall,
  },
  transliteration: {
    ...Theme.typography.titleSmall,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.xxSmall,
  },
  meaning: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.secondary,
  },
});
