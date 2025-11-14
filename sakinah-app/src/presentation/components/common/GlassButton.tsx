/**
 * GlassButton Component
 * iOS liquid glass style button with haptic feedback
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../../core/theme';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const handlePress = () => {
    if (!disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    }
  };

  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant);

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={[styles.container, sizeStyles.container, style]}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={[Theme.colors.primary.main, Theme.colors.primary.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              {icon}
              <Text style={[styles.text, sizeStyles.text, variantStyles.text, textStyle]}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, sizeStyles.container, style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <BlurView intensity={60} tint="light" style={styles.blur}>
        {loading ? (
          <ActivityIndicator color={Theme.colors.primary.main} />
        ) : (
          <>
            {icon}
            <Text style={[styles.text, sizeStyles.text, variantStyles.text, textStyle]}>
              {title}
            </Text>
          </>
        )}
      </BlurView>
    </TouchableOpacity>
  );
};

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  const sizes = {
    small: {
      container: { paddingHorizontal: Theme.spacing.medium, paddingVertical: Theme.spacing.small },
      text: { fontSize: Theme.fontSizes.bodySmall },
    },
    medium: {
      container: { paddingHorizontal: Theme.spacing.large, paddingVertical: Theme.spacing.medium },
      text: { fontSize: Theme.fontSizes.body },
    },
    large: {
      container: {
        paddingHorizontal: Theme.spacing.xLarge,
        paddingVertical: Theme.spacing.large,
      },
      text: { fontSize: Theme.fontSizes.bodyLarge },
    },
  };

  return sizes[size];
};

const getVariantStyles = (variant: 'primary' | 'secondary' | 'ghost') => {
  const variants = {
    primary: {
      text: { color: '#FFFFFF', fontWeight: Theme.fontWeights.semibold },
    },
    secondary: {
      text: { color: Theme.colors.primary.main, fontWeight: Theme.fontWeights.medium },
    },
    ghost: {
      text: { color: Theme.colors.text.light.primary, fontWeight: Theme.fontWeights.regular },
    },
  };

  return variants[variant];
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.large,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    gap: Theme.spacing.small,
  },
  blur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    gap: Theme.spacing.small,
  },
  text: {
    ...Theme.typography.body,
  },
});
