/**
 * Main Navigation Structure
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { GlassTabBar } from '../components/common/GlassTabBar';
import { Theme } from '../../core/theme';

// Import screens (we'll create these)
import { JournalListScreen } from '../screens/journal/JournalListScreen';
import { JournalEditorScreen } from '../screens/journal/JournalEditorScreen';
import { LibraryHomeScreen } from '../screens/library/LibraryHomeScreen';
import { NamesListScreen } from '../screens/library/NamesListScreen';
import { LearningHomeScreen } from '../screens/learning/LearningHomeScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';

// Navigation types
import { RootStackParamList, MainTabParamList } from '../../core/types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Tab bar icons (simplified for now)
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => (
  <View
    style={{
      width: 24,
      height: 24,
      backgroundColor: focused ? Theme.colors.primary.main : Theme.colors.text.light.secondary,
      borderRadius: 12,
    }}
  />
);

function MainTabs() {
  const tabs = [
    {
      id: 'Journal',
      label: 'Journal',
      icon: <TabIcon name="journal" focused={false} />,
      activeIcon: <TabIcon name="journal" focused={true} />,
    },
    {
      id: 'Library',
      label: 'Library',
      icon: <TabIcon name="library" focused={false} />,
      activeIcon: <TabIcon name="library" focused={true} />,
    },
    {
      id: 'Learning',
      label: 'Learning',
      icon: <TabIcon name="learning" focused={false} />,
      activeIcon: <TabIcon name="learning" focused={true} />,
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: <TabIcon name="settings" focused={false} />,
      activeIcon: <TabIcon name="settings" focused={true} />,
    },
  ];

  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        const activeTab = props.state.routes[props.state.index].name;
        return (
          <GlassTabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={(tabId) => {
              const index = tabs.findIndex((t) => t.id === tabId);
              if (index !== -1) {
                props.navigation.navigate(tabId as any);
              }
            }}
          />
        );
      }}
    >
      <MainTab.Screen name="Journal" component={JournalListScreen} />
      <MainTab.Screen name="Library" component={LibraryHomeScreen} />
      <MainTab.Screen name="Learning" component={LearningHomeScreen} />
      <MainTab.Screen name="Settings" component={SettingsScreen} />
    </MainTab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        <RootStack.Screen name="Main" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
