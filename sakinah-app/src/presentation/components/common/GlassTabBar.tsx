/**
 * GlassTabBar Component
 * iOS liquid glass style bottom tab bar
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Theme } from '../../../core/theme';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface GlassTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export const GlassTabBar: React.FC<GlassTabBarProps> = ({ tabs, activeTab, onTabPress }) => {
  const handleTabPress = (tabId: string) => {
    if (tabId !== activeTab) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onTabPress(tabId);
    }
  };

  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => handleTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  isActive && styles.tabContentActive,
                ]}
              >
                <View style={styles.iconContainer}>
                  {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
                </View>
                <Text
                  style={[
                    styles.label,
                    isActive ? styles.labelActive : styles.labelInactive,
                  ]}
                >
                  {tab.label}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Theme.spacing.medium,
    left: Theme.spacing.medium,
    right: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.xLarge,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.xSmall,
    paddingVertical: Theme.spacing.xSmall,
  },
  tab: {
    flex: 1,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.small,
    borderRadius: Theme.borderRadius.large,
  },
  tabContentActive: {
    backgroundColor: Theme.colors.glass.lightDark,
  },
  iconContainer: {
    marginBottom: Theme.spacing.xxSmall,
  },
  label: {
    fontSize: Theme.fontSizes.captionSmall,
  },
  labelActive: {
    color: Theme.colors.primary.main,
    fontWeight: Theme.fontWeights.semibold,
  },
  labelInactive: {
    color: Theme.colors.text.light.secondary,
    fontWeight: Theme.fontWeights.regular,
  },
});
