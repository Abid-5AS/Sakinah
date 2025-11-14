/**
 * Sakinah App - Typography System
 * Font definitions for Latin, Arabic, and Bengali scripts
 */

export const FontSizes = {
  // Display (Names of Allah)
  displayLarge: 52,
  displayMedium: 44,
  displaySmall: 36,

  // Title (Section Headers)
  titleLarge: 28,
  titleMedium: 22,
  titleSmall: 20,

  // Body (Main Content)
  bodyLarge: 17, // iOS standard
  body: 15,
  bodySmall: 13,

  // Caption
  caption: 12,
  captionSmall: 11,

  // Arabic
  arabicDisplay: 48,
  arabicTitle: 28,
  arabicBody: 20,

  // Bengali
  bengaliTitle: 24,
  bengaliBody: 17,
} as const;

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

export const Typography = {
  // Display styles
  displayLarge: {
    fontSize: FontSizes.displayLarge,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.displayLarge * LineHeights.tight,
  },
  displayMedium: {
    fontSize: FontSizes.displayMedium,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.displayMedium * LineHeights.tight,
  },
  displaySmall: {
    fontSize: FontSizes.displaySmall,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.displaySmall * LineHeights.tight,
  },

  // Title styles
  titleLarge: {
    fontSize: FontSizes.titleLarge,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.titleLarge * LineHeights.normal,
  },
  titleMedium: {
    fontSize: FontSizes.titleMedium,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.titleMedium * LineHeights.normal,
  },
  titleSmall: {
    fontSize: FontSizes.titleSmall,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.titleSmall * LineHeights.normal,
  },

  // Body styles
  bodyLarge: {
    fontSize: FontSizes.bodyLarge,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.bodyLarge * LineHeights.relaxed,
    letterSpacing: LetterSpacing.wide,
  },
  body: {
    fontSize: FontSizes.body,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.body * LineHeights.normal,
  },
  bodySmall: {
    fontSize: FontSizes.bodySmall,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.bodySmall * LineHeights.normal,
  },

  // Caption styles
  caption: {
    fontSize: FontSizes.caption,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.caption * LineHeights.normal,
  },
  captionSmall: {
    fontSize: FontSizes.captionSmall,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.captionSmall * LineHeights.normal,
  },

  // Arabic typography
  arabicDisplay: {
    fontSize: FontSizes.arabicDisplay,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.arabicDisplay * LineHeights.relaxed,
  },
  arabicTitle: {
    fontSize: FontSizes.arabicTitle,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.arabicTitle * LineHeights.relaxed,
  },
  arabicBody: {
    fontSize: FontSizes.arabicBody,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.arabicBody * LineHeights.relaxed,
  },

  // Bengali typography
  bengaliTitle: {
    fontSize: FontSizes.bengaliTitle,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.bengaliTitle * LineHeights.normal,
  },
  bengaliBody: {
    fontSize: FontSizes.bengaliBody,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.bengaliBody * LineHeights.relaxed,
  },
} as const;
