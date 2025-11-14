/**
 * GlassCard Component
 * iOS liquid glass style card with blur effect
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react';
import { BlurView } from 'expo-blur';
import { Theme } from '../../../core/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  elevation?: 1 | 2 | 3 | 4;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 80,
  tint = 'light',
  elevation = 2,
}) => {
  const shadowStyle = getShadowStyle(elevation);

  return (
    <View style={[styles.container, shadowStyle, style]}>
      <BlurView intensity={intensity} tint={tint} style={styles.blur}>
        <View style={styles.content}>{children}</View>
      </BlurView>
    </View>
  );
};

const getShadowStyle = (elevation: number): ViewStyle => {
  const shadows = {
    1: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    2: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    3: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    },
    4: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.16,
      shadowRadius: 24,
      elevation: 12,
    },
  };

  return shadows[elevation];
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.xLarge,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  blur: {
    borderRadius: Theme.borderRadius.xLarge,
    overflow: 'hidden',
  },
  content: {
    padding: Theme.spacing.medium,
  },
});
