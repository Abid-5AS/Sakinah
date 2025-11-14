/**
 * Journal Repository
 * Handles all journal entry data operations
 */

import { JournalEntry } from '../../core/types';
import { getDatabase } from '../local/database';
import { EncryptionService } from '../../services/encryption';

export class JournalRepository {
  /**
   * Create a new journal entry
   */
  static async createEntry(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    const db = getDatabase();
    const id = `journal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Encrypt content
    const encryptedContent = await EncryptionService.encrypt(entry.content);

    const now = Date.now();
    await db.runAsync(
      `INSERT INTO journal_entries (id, encrypted_content, created_at, updated_at, tags, mood, is_favorite)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        encryptedContent,
        entry.createdAt.getTime(),
        now,
        entry.tags?.join(',') || null,
        entry.mood || null,
        entry.isFavorite ? 1 : 0,
      ]
    );

    return {
      ...entry,
      id,
      updatedAt: new Date(now),
    };
  }

  /**
   * Get all journal entries
   */
  static async getAllEntries(limit: number = 50, offset: number = 0): Promise<JournalEntry[]> {
    const db = getDatabase();

    const rows = await db.getAllAsync<{
      id: string;
      encrypted_content: string;
      created_at: number;
      updated_at: number;
      tags: string | null;
      mood: string | null;
      is_favorite: number;
    }>(
      `SELECT * FROM journal_entries ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return Promise.all(
      rows.map(async (row) => ({
        id: row.id,
        content: await EncryptionService.decrypt(row.encrypted_content),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        tags: row.tags ? row.tags.split(',') : undefined,
        mood: row.mood as JournalEntry['mood'],
        isFavorite: row.is_favorite === 1,
      }))
    );
  }

  /**
   * Get entry by ID
   */
  static async getEntryById(id: string): Promise<JournalEntry | null> {
    const db = getDatabase();

    const row = await db.getFirstAsync<{
      id: string;
      encrypted_content: string;
      created_at: number;
      updated_at: number;
      tags: string | null;
      mood: string | null;
      is_favorite: number;
    }>(`SELECT * FROM journal_entries WHERE id = ?`, [id]);

    if (!row) return null;

    return {
      id: row.id,
      content: await EncryptionService.decrypt(row.encrypted_content),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      tags: row.tags ? row.tags.split(',') : undefined,
      mood: row.mood as JournalEntry['mood'],
      isFavorite: row.is_favorite === 1,
    };
  }

  /**
   * Update journal entry
   */
  static async updateEntry(id: string, updates: Partial<JournalEntry>): Promise<void> {
    const db = getDatabase();
    const now = Date.now();

    // Build update query
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.content !== undefined) {
      const encryptedContent = await EncryptionService.encrypt(updates.content);
      fields.push('encrypted_content = ?');
      values.push(encryptedContent);
    }

    if (updates.tags !== undefined) {
      fields.push('tags = ?');
      values.push(updates.tags.join(','));
    }

    if (updates.mood !== undefined) {
      fields.push('mood = ?');
      values.push(updates.mood);
    }

    if (updates.isFavorite !== undefined) {
      fields.push('is_favorite = ?');
      values.push(updates.isFavorite ? 1 : 0);
    }

    fields.push('updated_at = ?');
    values.push(now);

    values.push(id);

    await db.runAsync(
      `UPDATE journal_entries SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  /**
   * Delete journal entry
   */
  static async deleteEntry(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync(`DELETE FROM journal_entries WHERE id = ?`, [id]);
  }

  /**
   * Search journal entries
   */
  static async searchEntries(query: string): Promise<JournalEntry[]> {
    const db = getDatabase();

    // Get all entries and decrypt for search
    // Note: In production, implement full-text search properly
    const allEntries = await this.getAllEntries(200);

    const searchLower = query.toLowerCase();
    return allEntries.filter(
      (entry) =>
        entry.content.toLowerCase().includes(searchLower) ||
        entry.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  /**
   * Get favorite entries
   */
  static async getFavoriteEntries(): Promise<JournalEntry[]> {
    const db = getDatabase();

    const rows = await db.getAllAsync<{
      id: string;
      encrypted_content: string;
      created_at: number;
      updated_at: number;
      tags: string | null;
      mood: string | null;
      is_favorite: number;
    }>(`SELECT * FROM journal_entries WHERE is_favorite = 1 ORDER BY created_at DESC`);

    return Promise.all(
      rows.map(async (row) => ({
        id: row.id,
        content: await EncryptionService.decrypt(row.encrypted_content),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        tags: row.tags ? row.tags.split(',') : undefined,
        mood: row.mood as JournalEntry['mood'],
        isFavorite: true,
      }))
    );
  }
}
