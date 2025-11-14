/**
 * Sakinah App - Color System
 * Inspired by nature and tranquility for iOS liquid glass aesthetic
 */

export const Colors = {
  // Primary Colors (Teal)
  primary: {
    light: '#82D5D5',
    main: '#006A6A',
    dark: '#004D4D',
  },

  // Secondary Colors (Warm Gray)
  secondary: {
    light: '#B0C7C7',
    main: '#4A5F5F',
    dark: '#2D3A3A',
  },

  // Accent Colors
  accent: {
    light: '#C6C65A',
    main: '#5B5C00',
    gold: '#D4AF37',
  },

  // Semantic Colors - Journal
  journal: {
    card: 'rgba(0, 106, 106, 0.08)',
    highlight: 'rgba(0, 106, 106, 0.15)',
    text: '#004D4D',
  },

  // Semantic Colors - Library
  library: {
    quran: 'rgba(91, 92, 0, 0.08)',
    hadith: 'rgba(74, 95, 95, 0.08)',
    asma: 'rgba(0, 106, 106, 0.12)',
  },

  // Learning Status Colors
  learning: {
    memorized: '#4CAF50',
    learning: '#FF9800',
    notStarted: '#9E9E9E',
  },

  // Background Colors (Dynamic)
  background: {
    light: {
      primary: '#FAFCFC',
      secondary: '#F5F8F8',
      tertiary: '#EDF2F2',
    },
    dark: {
      primary: '#191C1C',
      secondary: '#252929',
      tertiary: '#303535',
    },
  },

  // Text Colors (Dynamic)
  text: {
    light: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.60)',
      tertiary: 'rgba(0, 0, 0, 0.38)',
      disabled: 'rgba(0, 0, 0, 0.25)',
    },
    dark: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.70)',
      tertiary: 'rgba(255, 255, 255, 0.50)',
      disabled: 'rgba(255, 255, 255, 0.30)',
    },
  },

  // Special Occasions
  special: {
    ramadan: '#FFD700',
    jumah: '#009688',
  },

  // System Colors
  system: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },

  // Blur/Glass Effect Colors
  glass: {
    light: 'rgba(255, 255, 255, 0.70)',
    lightDark: 'rgba(255, 255, 255, 0.50)',
    dark: 'rgba(0, 0, 0, 0.30)',
    darkLight: 'rgba(0, 0, 0, 0.15)',
  },
};

export type ColorScheme = 'light' | 'dark';

export const getThemedColors = (scheme: ColorScheme) => ({
  ...Colors,
  background: Colors.background[scheme],
  text: Colors.text[scheme],
});
