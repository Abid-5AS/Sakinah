/**
 * Settings Screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Switch } from 'react-native';
import { GlassCard } from '../../components/common/GlassCard';
import { Theme } from '../../../core/theme';

export const SettingsScreen: React.FC = () => {
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <GlassCard style={styles.settingCard}>
            <View style={styles.setting}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Biometric Lock</Text>
                <Text style={styles.settingDescription}>
                  Use fingerprint or Face ID
                </Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#767577', true: Theme.colors.primary.light }}
                thumbColor={biometricEnabled ? Theme.colors.primary.main : '#f4f3f4'}
              />
            </View>
          </GlassCard>

          <GlassCard style={styles.settingCard}>
            <View style={styles.setting}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Auto-Lock</Text>
                <Text style={styles.settingDescription}>
                  Lock app when inactive
                </Text>
              </View>
              <Switch
                value={autoLockEnabled}
                onValueChange={setAutoLockEnabled}
                trackColor={{ false: '#767577', true: Theme.colors.primary.light }}
                thumbColor={autoLockEnabled ? Theme.colors.primary.main : '#f4f3f4'}
              />
            </View>
          </GlassCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <GlassCard style={styles.settingCard}>
            <Text style={styles.settingLabel}>Sakinah</Text>
            <Text style={styles.settingDescription}>Version 1.0.0</Text>
            <Text style={styles.motto}>Your Personal Spiritual Companion</Text>
          </GlassCard>
        </View>
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
  section: {
    marginBottom: Theme.spacing.xLarge,
  },
  sectionTitle: {
    ...Theme.typography.titleSmall,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.medium,
  },
  settingCard: {
    marginBottom: Theme.spacing.medium,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: Theme.spacing.medium,
  },
  settingLabel: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.xxSmall,
  },
  settingDescription: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.text.light.secondary,
  },
  motto: {
    ...Theme.typography.caption,
    color: Theme.colors.primary.main,
    marginTop: Theme.spacing.small,
    fontStyle: 'italic',
  },
});
