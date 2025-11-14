/**
 * Onboarding Screen
 * Welcome and introduction to Sakinah
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../../components/common/GlassCard';
import { GlassButton } from '../../components/common/GlassButton';
import { Theme } from '../../../core/theme';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation?: any;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Welcome to Sakinah',
      subtitle: 'سَكِينَة',
      description: 'Your personal sanctuary for spiritual reflection and growth',
      icon: '🌙',
    },
    {
      title: 'Private & Secure',
      subtitle: 'Your thoughts, your space',
      description: 'All your journal entries are encrypted and stored only on your device',
      icon: '🔒',
    },
    {
      title: 'Learn & Grow',
      subtitle: 'Deepen your connection',
      description: 'Explore the 99 Names of Allah, Quran, and authentic Hadith',
      icon: '📿',
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Navigate to main app
      navigation?.navigate('Main');
    }
  };

  const currentContent = pages[currentPage];

  return (
    <LinearGradient
      colors={[Theme.colors.primary.light, Theme.colors.primary.main]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{currentContent.icon}</Text>
          </View>

          <GlassCard style={styles.card} intensity={100}>
            <View style={styles.cardContent}>
              <Text style={styles.subtitle}>{currentContent.subtitle}</Text>
              <Text style={styles.title}>{currentContent.title}</Text>
              <Text style={styles.description}>{currentContent.description}</Text>
            </View>
          </GlassCard>

          <View style={styles.pagination}>
            {pages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentPage && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          <GlassButton
            title={currentPage === pages.length - 1 ? "Let's Begin" : 'Next'}
            onPress={handleNext}
            variant="primary"
            size="large"
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xLarge,
  },
  iconContainer: {
    marginBottom: Theme.spacing.xLarge,
  },
  icon: {
    fontSize: 80,
  },
  card: {
    width: '100%',
    marginBottom: Theme.spacing.xLarge,
  },
  cardContent: {
    padding: Theme.spacing.xLarge,
    alignItems: 'center',
  },
  subtitle: {
    ...Theme.typography.arabicTitle,
    color: Theme.colors.primary.main,
    marginBottom: Theme.spacing.small,
  },
  title: {
    ...Theme.typography.titleLarge,
    color: Theme.colors.text.light.primary,
    marginBottom: Theme.spacing.medium,
    textAlign: 'center',
  },
  description: {
    ...Theme.typography.body,
    color: Theme.colors.text.light.secondary,
    textAlign: 'center',
    lineHeight: Theme.typography.body.lineHeight,
  },
  pagination: {
    flexDirection: 'row',
    gap: Theme.spacing.small,
    marginBottom: Theme.spacing.xLarge,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  paginationDotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 24,
  },
  button: {
    width: '100%',
  },
});
