/**
 * Sakinah App - Core Type Definitions
 */

// Base types
export type Language = 'en' | 'bn';
export type ThemeMode = 'light' | 'dark' | 'auto';

// Journal types
export interface JournalEntry {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  mood?: Mood;
  isFavorite: boolean;
  encryptedContent?: string;
}

export type Mood = 'grateful' | 'worried' | 'joyful' | 'sad' | 'peaceful' | 'anxious' | 'hopeful';

// Library types - 99 Names
export interface AsmaUlHusna {
  id: number;
  arabic: string;
  transliteration: string;
  meaningEnglish: string;
  meaningBengali: string;
  explanationEnglish: string;
  explanationBengali: string;
  rootWord?: string;
  relatedNames?: number[];
  verses?: string[];
  hadith?: string[];
}

// Library types - Quran
export interface QuranVerse {
  id: string;
  surahNumber: number;
  verseNumber: number;
  arabic: string;
  translationEnglish: string;
  translationBengali: string;
  transliteration?: string;
  tafsir?: string;
}

export interface Surah {
  number: number;
  name: string;
  nameArabic: string;
  englishName: string;
  bengaliName: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfVerses: number;
}

// Library types - Hadith
export interface Hadith {
  id: string;
  collection: HadithCollection;
  bookNumber: number;
  hadithNumber: number;
  arabic: string;
  translationEnglish: string;
  translationBengali: string;
  narrator: string;
  authenticity: Authenticity;
  chapter: string;
  theme: string[];
}

export type HadithCollection =
  | 'bukhari'
  | 'muslim'
  | 'abudawud'
  | 'tirmidhi'
  | 'nasai'
  | 'ibnmajah';

export type Authenticity = 'sahih' | 'hasan' | 'daif';

// Learning types
export interface LearningProgress {
  nameId: number;
  status: LearningStatus;
  lastReviewed?: Date;
  nextReview?: Date;
  reviewCount: number;
  ease: number; // SRS ease factor
  interval: number; // Days until next review
}

export type LearningStatus = 'not_started' | 'learning' | 'memorized';

export interface Flashcard {
  id: string;
  nameId: number;
  front: string;
  back: string;
  type: FlashcardType;
}

export type FlashcardType = 'arabic_to_meaning' | 'meaning_to_arabic' | 'transliteration';

// Companion types
export interface CompanionSuggestion {
  id: string;
  entryId: string;
  names: AsmaUlHusna[];
  verses: QuranVerse[];
  hadith: Hadith[];
  confidence: number;
  themes: string[];
  createdAt: Date;
}

export interface AnalysisResult {
  keywords: string[];
  emotions: Mood[];
  themes: string[];
  suggestedNames: number[];
}

// Auth types
export interface UserSettings {
  language: Language;
  theme: ThemeMode;
  fontSize: FontSize;
  biometricEnabled: boolean;
  autoLockEnabled: boolean;
  autoLockTimeout: number;
}

export type FontSize = 'small' | 'medium' | 'large' | 'extraLarge';

// Bookmark types
export interface Bookmark {
  id: string;
  type: 'name' | 'verse' | 'hadith';
  itemId: string;
  createdAt: Date;
  notes?: string;
}

// Search types
export interface SearchResult {
  id: string;
  type: 'name' | 'verse' | 'hadith' | 'journal';
  title: string;
  preview: string;
  item: AsmaUlHusna | QuranVerse | Hadith | JournalEntry;
  relevance: number;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Journal: undefined;
  Library: undefined;
  Learning: undefined;
  Companion: undefined;
  Settings: undefined;
};

export type LibraryStackParamList = {
  LibraryHome: undefined;
  Names: undefined;
  NameDetail: { nameId: number };
  Quran: undefined;
  QuranReader: { surahNumber: number };
  Hadith: undefined;
  HadithDetail: { hadithId: string };
  Search: undefined;
};

export type JournalStackParamList = {
  JournalList: undefined;
  JournalEntry: { entryId?: string };
  JournalDetail: { entryId: string };
};

export type LearningStackParamList = {
  LearningHome: undefined;
  Flashcards: undefined;
  Progress: undefined;
  ConnectionMap: undefined;
};
