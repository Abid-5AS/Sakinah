/**
 * Sakinah App - Application Constants
 */

export const APP_NAME = 'Sakinah';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Your Personal Spiritual Companion';

// Database
export const DATABASE_NAME = 'sakinah.db';
export const DATABASE_VERSION = 1;

// Storage Keys
export const STORAGE_KEYS = {
  USER_LANGUAGE: 'user_language',
  USER_THEME: 'user_theme',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  BIOMETRIC_ENABLED: 'biometric_enabled',
  MASTER_KEY: 'master_key',
  LAST_BACKUP: 'last_backup',
  FONT_SIZE_PREFERENCE: 'font_size_preference',
} as const;

// Supported Languages
export const LANGUAGES = {
  ENGLISH: 'en',
  BENGALI: 'bn',
} as const;

export const DEFAULT_LANGUAGE = LANGUAGES.ENGLISH;

// Pagination
export const PAGINATION = {
  JOURNAL_ENTRIES_PER_PAGE: 20,
  HADITH_PER_PAGE: 30,
  SEARCH_RESULTS_PER_PAGE: 20,
} as const;

// Security
export const SECURITY = {
  AUTO_LOCK_TIMEOUT: 300000, // 5 minutes in milliseconds
  MAX_FAILED_ATTEMPTS: 5,
  ENCRYPTION_ALGORITHM: 'AES-256',
} as const;

// Learning
export const LEARNING = {
  TOTAL_NAMES: 99,
  INITIAL_CARDS_PER_SESSION: 5,
  MAX_CARDS_PER_SESSION: 20,
  SRS_INTERVALS: [1, 3, 7, 14, 30, 60], // Days
} as const;

// NLP
export const NLP = {
  MIN_ENTRY_LENGTH: 10, // Minimum characters for analysis
  MAX_SUGGESTIONS: 3,
  CONFIDENCE_THRESHOLD: 0.5,
} as const;

// Animation Durations (ms)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  SPRING_CONFIG: {
    damping: 15,
    mass: 1,
    stiffness: 150,
  },
} as const;
