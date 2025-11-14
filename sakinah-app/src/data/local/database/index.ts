/**
 * SQLite Database Setup
 * Manages local encrypted database for journal entries and user data
 */

import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME } from '../../../core/constants/app';

let database: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (database) {
    return database;
  }

  try {
    database = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await createTables(database);
    return database;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!database) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return database;
};

const createTables = async (db: SQLite.SQLiteDatabase) => {
  // Journal entries table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS journal_entries (
      id TEXT PRIMARY KEY,
      encrypted_content TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      tags TEXT,
      mood TEXT,
      is_favorite INTEGER DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_journal_created_at ON journal_entries(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_journal_favorite ON journal_entries(is_favorite);
  `);

  // Learning progress table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS learning_progress (
      name_id INTEGER PRIMARY KEY,
      status TEXT NOT NULL,
      last_reviewed INTEGER,
      next_review INTEGER,
      review_count INTEGER DEFAULT 0,
      ease REAL DEFAULT 2.5,
      interval INTEGER DEFAULT 1
    );
  `);

  // Bookmarks table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      item_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      notes TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_bookmarks_type ON bookmarks(type);
  `);

  // Companion suggestions table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS companion_suggestions (
      id TEXT PRIMARY KEY,
      entry_id TEXT NOT NULL,
      suggested_names TEXT,
      suggested_verses TEXT,
      suggested_hadith TEXT,
      confidence REAL,
      themes TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_suggestions_entry ON companion_suggestions(entry_id);
  `);

  // User settings table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
};

export const closeDatabase = async () => {
  if (database) {
    await database.closeAsync();
    database = null;
  }
};
