# Database Schema

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [User Database Schema](#user-database-schema)
4. [Content Database Schema](#content-database-schema)
5. [Analytics Database Schema](#analytics-database-schema)
6. [Relationships and Constraints](#relationships-and-constraints)
7. [Indexes and Performance](#indexes-and-performance)
8. [Migration Strategy](#migration-strategy)

## Overview

Sakinah uses a three-database architecture to separate concerns:

1. **User Database**: Encrypted, personal data (journal entries, progress, settings)
2. **Content Database**: Read-only, pre-loaded Islamic content (Quran, Hadith, Names)
3. **Analytics Database**: Local-only usage statistics (never transmitted)

### Technology Stack

- **Android**: Room (SQLite) + SQLCipher
- **iOS**: Core Data + SQLCipher
- **Encryption**: AES-256 for User Database
- **Size Estimates**:
  - User DB: 1-10 MB (grows with usage)
  - Content DB: 150-200 MB (pre-loaded)
  - Analytics DB: 1-5 MB

## Database Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE ARCHITECTURE                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  USER DATABASE (user_data.db) - ENCRYPTED                   │
│  • Journal entries                                           │
│  • Bookmarks and favorites                                   │
│  • Learning progress                                         │
│  • User settings                                             │
│  • Companion suggestions history                             │
│  Location: /data/data/com.sakinah/databases/                │
│  Encryption: SQLCipher with user master key                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CONTENT DATABASE (content.db) - READ-ONLY                  │
│  • Complete Quran with translations                          │
│  • Hadith collections                                        │
│  • Asma ul Husna (99 Names)                                 │
│  • Tafsir content                                            │
│  • Thematic indexes                                          │
│  Location: Copied from assets on first launch               │
│  Encryption: None (public content)                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ANALYTICS DATABASE (analytics.db) - LOCAL ONLY             │
│  • Feature usage statistics                                  │
│  • Performance metrics                                       │
│  • Error logs                                                │
│  • Crash reports (local)                                     │
│  Location: /data/data/com.sakinah/databases/                │
│  Encryption: Optional                                        │
│  Privacy: Never transmitted, user can view/delete            │
└─────────────────────────────────────────────────────────────┘
```

## User Database Schema

### 1. journal_entries

Stores user's private journal entries.

```sql
CREATE TABLE journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,  -- For sync (future feature)
    title TEXT,
    content TEXT NOT NULL,  -- ENCRYPTED at field level
    created_at INTEGER NOT NULL,  -- Unix timestamp (milliseconds)
    modified_at INTEGER NOT NULL,
    tags TEXT,  -- Comma-separated tags
    emotion TEXT,  -- User-selected emotion
    word_count INTEGER DEFAULT 0,
    is_favorite BOOLEAN DEFAULT 0,
    is_archived BOOLEAN DEFAULT 0,
    deleted_at INTEGER DEFAULT NULL  -- Soft delete
);

-- Indexes
CREATE INDEX idx_journal_created_at ON journal_entries(created_at DESC);
CREATE INDEX idx_journal_modified_at ON journal_entries(modified_at DESC);
CREATE INDEX idx_journal_favorite ON journal_entries(is_favorite) WHERE is_favorite = 1;
CREATE INDEX idx_journal_archived ON journal_entries(is_archived);

-- Full-text search
CREATE VIRTUAL TABLE journal_entries_fts USING fts5(
    title,
    content,
    tags,
    content=journal_entries,
    content_rowid=id
);
```

### 2. companion_suggestions

Stores AI suggestions for journal entries.

```sql
CREATE TABLE companion_suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    journal_entry_id INTEGER NOT NULL,
    suggestion_type TEXT NOT NULL,  -- 'name', 'verse', 'hadith'
    content_id INTEGER NOT NULL,  -- Reference to content DB
    relevance_score REAL DEFAULT 0.0,
    created_at INTEGER NOT NULL,
    user_feedback TEXT,  -- 'helpful', 'not_helpful', NULL
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE
);

CREATE INDEX idx_suggestions_entry ON companion_suggestions(journal_entry_id);
CREATE INDEX idx_suggestions_type ON companion_suggestions(suggestion_type);
```

### 3. learning_progress

Tracks user's progress in memorizing the 99 Names.

```sql
CREATE TABLE learning_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asma_id INTEGER NOT NULL,  -- Reference to content DB
    status TEXT NOT NULL,  -- 'not_started', 'learning', 'memorized'
    first_learned_at INTEGER,
    mastered_at INTEGER,
    review_count INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    last_reviewed_at INTEGER,
    next_review_at INTEGER,  -- Spaced repetition scheduling
    ease_factor REAL DEFAULT 2.5,  -- SRS algorithm parameter
    interval_days INTEGER DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (asma_id) REFERENCES asma_ul_husna(id) IN content.db
);

CREATE UNIQUE INDEX idx_learning_asma ON learning_progress(asma_id);
CREATE INDEX idx_learning_next_review ON learning_progress(next_review_at);
CREATE INDEX idx_learning_status ON learning_progress(status);
```

### 4. bookmarks

User bookmarks for Quran, Hadith, and Names.

```sql
CREATE TABLE bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,  -- 'quran', 'hadith', 'asma'
    content_id INTEGER NOT NULL,  -- Reference to content DB
    note TEXT,
    created_at INTEGER NOT NULL,
    folder TEXT DEFAULT 'default'
);

CREATE INDEX idx_bookmarks_type ON bookmarks(content_type);
CREATE INDEX idx_bookmarks_created ON bookmarks(created_at DESC);
CREATE INDEX idx_bookmarks_folder ON bookmarks(folder);
CREATE UNIQUE INDEX idx_bookmarks_unique ON bookmarks(content_type, content_id);
```

### 5. user_notes

User's personal notes on Islamic content.

```sql
CREATE TABLE user_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,  -- 'quran', 'hadith', 'asma'
    content_id INTEGER NOT NULL,
    note TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    modified_at INTEGER NOT NULL,
    FOREIGN KEY (content_type, content_id) REFERENCES bookmarks(content_type, content_id)
);

CREATE INDEX idx_notes_content ON user_notes(content_type, content_id);
CREATE INDEX idx_notes_modified ON user_notes(modified_at DESC);

-- Full-text search for notes
CREATE VIRTUAL TABLE user_notes_fts USING fts5(
    note,
    content=user_notes,
    content_rowid=id
);
```

### 6. user_settings

Application settings and preferences.

```sql
CREATE TABLE user_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),  -- Single row table
    language TEXT DEFAULT 'en',  -- 'en', 'bn', 'ar'
    theme TEXT DEFAULT 'system',  -- 'light', 'dark', 'system'
    font_size TEXT DEFAULT 'medium',  -- 'small', 'medium', 'large', 'xlarge'
    journal_font_family TEXT DEFAULT 'system',
    enable_biometric BOOLEAN DEFAULT 1,
    auto_lock_timeout INTEGER DEFAULT 300,  -- seconds
    show_arabic_in_library BOOLEAN DEFAULT 1,
    preferred_quran_translation TEXT DEFAULT 'sahih_international',
    notification_daily_reminder BOOLEAN DEFAULT 0,
    notification_reminder_time TEXT,  -- HH:MM format
    backup_enabled BOOLEAN DEFAULT 0,
    last_backup_at INTEGER,
    graduation_mode BOOLEAN DEFAULT 0,  -- User has "graduated"
    created_at INTEGER NOT NULL,
    modified_at INTEGER NOT NULL
);

INSERT INTO user_settings (id, created_at, modified_at)
VALUES (1, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);
```

### 7. reflection_themes

Weekly/monthly reflection summaries.

```sql
CREATE TABLE reflection_themes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    period_type TEXT NOT NULL,  -- 'week', 'month'
    period_start INTEGER NOT NULL,  -- Unix timestamp
    period_end INTEGER NOT NULL,
    dominant_emotions TEXT,  -- JSON array
    dominant_themes TEXT,  -- JSON array
    frequent_names TEXT,  -- JSON array of Asma IDs
    entry_count INTEGER DEFAULT 0,
    word_count INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL
);

CREATE INDEX idx_reflection_period ON reflection_themes(period_type, period_start);
```

## Content Database Schema

### 1. quran_verses

Complete Quran text with metadata.

```sql
CREATE TABLE quran_verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surah_number INTEGER NOT NULL,
    verse_number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    simple_text TEXT NOT NULL,  -- Simplified Arabic (no diacritics)
    juz INTEGER NOT NULL,
    hizb INTEGER NOT NULL,
    page INTEGER NOT NULL,
    manzil INTEGER NOT NULL,
    ruku INTEGER,
    sajda BOOLEAN DEFAULT 0,
    sajda_type TEXT,  -- 'obligatory', 'recommended', NULL
    UNIQUE(surah_number, verse_number)
);

CREATE INDEX idx_quran_surah ON quran_verses(surah_number, verse_number);
CREATE INDEX idx_quran_juz ON quran_verses(juz);
CREATE INDEX idx_quran_page ON quran_verses(page);

-- Full-text search for Arabic
CREATE VIRTUAL TABLE quran_verses_fts USING fts5(
    arabic_text,
    simple_text,
    content=quran_verses,
    content_rowid=id,
    tokenize='unicode61'
);
```

### 2. quran_translations

Multiple translations of Quran verses.

```sql
CREATE TABLE quran_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    verse_id INTEGER NOT NULL,
    language TEXT NOT NULL,  -- 'en', 'bn', 'ur'
    translator TEXT NOT NULL,  -- 'sahih_international', 'muhsin_khan', etc.
    translation_text TEXT NOT NULL,
    FOREIGN KEY (verse_id) REFERENCES quran_verses(id),
    UNIQUE(verse_id, translator)
);

CREATE INDEX idx_translation_verse ON quran_translations(verse_id);
CREATE INDEX idx_translation_lang ON quran_translations(language, translator);

-- Full-text search for translations
CREATE VIRTUAL TABLE quran_translations_fts USING fts5(
    translation_text,
    content=quran_translations,
    content_rowid=id
);
```

### 3. surah_metadata

Information about each Surah.

```sql
CREATE TABLE surah_metadata (
    surah_number INTEGER PRIMARY KEY,
    arabic_name TEXT NOT NULL,
    english_name TEXT NOT NULL,
    bengali_name TEXT,
    transliteration TEXT NOT NULL,
    translation TEXT NOT NULL,  -- Meaning of the name
    revelation_type TEXT NOT NULL,  -- 'Meccan', 'Medinan'
    revelation_order INTEGER NOT NULL,
    total_verses INTEGER NOT NULL,
    bismillah_included BOOLEAN DEFAULT 1
);
```

### 4. hadith_collections

Main Hadith collection metadata.

```sql
CREATE TABLE hadith_collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,  -- 'Sahih Bukhari', 'Sahih Muslim', etc.
    arabic_name TEXT,
    total_hadiths INTEGER NOT NULL,
    compiler TEXT NOT NULL,
    compiler_death_year INTEGER,  -- Hijri year
    description TEXT,
    UNIQUE(name)
);

INSERT INTO hadith_collections (id, name, arabic_name, total_hadiths, compiler, compiler_death_year) VALUES
(1, 'Sahih Bukhari', 'صحيح البخاري', 7563, 'Imam Muhammad al-Bukhari', 256),
(2, 'Sahih Muslim', 'صحيح مسلم', 7470, 'Imam Muslim ibn al-Hajjaj', 261),
(3, 'Sunan Abu Dawud', 'سنن أبي داود', 5274, 'Imam Abu Dawud', 275),
(4, 'Jami at-Tirmidhi', 'جامع الترمذي', 3956, 'Imam at-Tirmidhi', 279),
(5, 'Sunan an-Nasa''i', 'سنن النسائي', 5758, 'Imam an-Nasa''i', 303),
(6, 'Sunan Ibn Majah', 'سنن ابن ماجه', 4341, 'Imam Ibn Majah', 273);
```

### 5. hadith_entries

Individual Hadith narrations.

```sql
CREATE TABLE hadith_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    collection_id INTEGER NOT NULL,
    book_number INTEGER NOT NULL,
    hadith_number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    grade TEXT NOT NULL,  -- 'Sahih', 'Hasan', 'Daif', etc.
    graded_by TEXT,  -- Scholar who graded it
    chapter TEXT,
    FOREIGN KEY (collection_id) REFERENCES hadith_collections(id),
    UNIQUE(collection_id, book_number, hadith_number)
);

CREATE INDEX idx_hadith_collection ON hadith_entries(collection_id);
CREATE INDEX idx_hadith_grade ON hadith_entries(grade);

-- Full-text search
CREATE VIRTUAL TABLE hadith_entries_fts USING fts5(
    arabic_text,
    chapter,
    content=hadith_entries,
    content_rowid=id
);
```

### 6. hadith_translations

Translations of Hadith.

```sql
CREATE TABLE hadith_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hadith_id INTEGER NOT NULL,
    language TEXT NOT NULL,  -- 'en', 'bn', 'ur'
    translator TEXT NOT NULL,
    translation_text TEXT NOT NULL,
    FOREIGN KEY (hadith_id) REFERENCES hadith_entries(id),
    UNIQUE(hadith_id, language, translator)
);

CREATE INDEX idx_hadith_trans_hadith ON hadith_translations(hadith_id);
CREATE INDEX idx_hadith_trans_lang ON hadith_translations(language);

-- Full-text search
CREATE VIRTUAL TABLE hadith_translations_fts USING fts5(
    translation_text,
    content=hadith_translations,
    content_rowid=id
);
```

### 7. hadith_narrators

Chain of narration (Isnad).

```sql
CREATE TABLE hadith_narrators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hadith_id INTEGER NOT NULL,
    narrator_name TEXT NOT NULL,
    narrator_order INTEGER NOT NULL,  -- Position in chain
    FOREIGN KEY (hadith_id) REFERENCES hadith_entries(id)
);

CREATE INDEX idx_narrators_hadith ON hadith_narrators(hadith_id);
```

### 8. asma_ul_husna

The 99 Names of Allah.

```sql
CREATE TABLE asma_ul_husna (
    id INTEGER PRIMARY KEY,  -- 1-99
    arabic_name TEXT NOT NULL,
    transliteration TEXT NOT NULL,
    english_meaning TEXT NOT NULL,
    bengali_meaning TEXT,
    root_word TEXT,
    detailed_meaning TEXT NOT NULL,
    occurrences_in_quran INTEGER DEFAULT 0,
    category TEXT,  -- 'Mercy', 'Power', 'Knowledge', etc.
    related_names TEXT,  -- Comma-separated IDs
    example_verse_id INTEGER,
    example_hadith_id INTEGER,
    FOREIGN KEY (example_verse_id) REFERENCES quran_verses(id),
    FOREIGN KEY (example_hadith_id) REFERENCES hadith_entries(id)
);

-- Sample data
INSERT INTO asma_ul_husna VALUES
(1, 'ٱلرَّحْمَـٰنُ', 'Ar-Rahman', 'The Most Merciful', 'পরম করুণাময়', 'ر-ح-م', 'The One whose mercy encompasses all of creation...', 57, 'Mercy', '2,3', NULL, NULL),
(2, 'ٱلرَّحِيمُ', 'Ar-Raheem', 'The Most Compassionate', 'অসীম দয়ালু', 'ر-ح-م', 'The One who is especially merciful to the believers...', 115, 'Mercy', '1,3', NULL, NULL);
-- ... (continue for all 99 names)
```

### 9. tafsir_content

Scholarly commentary on Quran.

```sql
CREATE TABLE tafsir_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    verse_id INTEGER NOT NULL,
    tafsir_source TEXT NOT NULL,  -- 'Ibn Kathir', 'Maariful Quran', etc.
    language TEXT NOT NULL,
    tafsir_text TEXT NOT NULL,
    FOREIGN KEY (verse_id) REFERENCES quran_verses(id),
    UNIQUE(verse_id, tafsir_source, language)
);

CREATE INDEX idx_tafsir_verse ON tafsir_content(verse_id);
CREATE INDEX idx_tafsir_source ON tafsir_content(tafsir_source);

-- Full-text search
CREATE VIRTUAL TABLE tafsir_content_fts USING fts5(
    tafsir_text,
    content=tafsir_content,
    content_rowid=id
);
```

### 10. thematic_index

Thematic categorization of content.

```sql
CREATE TABLE thematic_index (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    theme TEXT NOT NULL,  -- 'patience', 'gratitude', 'hardship', etc.
    content_type TEXT NOT NULL,  -- 'verse', 'hadith', 'name'
    content_id INTEGER NOT NULL,
    relevance_score REAL DEFAULT 1.0,
    keywords TEXT,  -- Comma-separated
    UNIQUE(theme, content_type, content_id)
);

CREATE INDEX idx_theme_name ON thematic_index(theme);
CREATE INDEX idx_theme_type ON thematic_index(content_type);
```

## Analytics Database Schema

### 1. feature_usage

Tracks which features are used (for improving UX).

```sql
CREATE TABLE feature_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_name TEXT NOT NULL,
    action TEXT NOT NULL,  -- 'open', 'close', 'complete', etc.
    timestamp INTEGER NOT NULL,
    duration_ms INTEGER,  -- How long feature was used
    metadata TEXT  -- JSON for additional context
);

CREATE INDEX idx_usage_feature ON feature_usage(feature_name);
CREATE INDEX idx_usage_timestamp ON feature_usage(timestamp);
```

### 2. performance_metrics

Local performance monitoring.

```sql
CREATE TABLE performance_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_type TEXT NOT NULL,  -- 'app_launch', 'database_query', etc.
    duration_ms INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    metadata TEXT
);

CREATE INDEX idx_perf_type ON performance_metrics(metric_type);
CREATE INDEX idx_perf_timestamp ON performance_metrics(timestamp);
```

### 3. error_logs

Local error logging (for debugging).

```sql
CREATE TABLE error_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    error_type TEXT NOT NULL,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    timestamp INTEGER NOT NULL,
    device_info TEXT,  -- Anonymous device specs
    resolved BOOLEAN DEFAULT 0
);

CREATE INDEX idx_errors_timestamp ON error_logs(timestamp DESC);
CREATE INDEX idx_errors_resolved ON error_logs(resolved);
```

## Relationships and Constraints

### Entity Relationship Diagram

```
USER DATABASE:

journal_entries (1) ─────< (N) companion_suggestions
                                  │
                                  └─> content.asma_ul_husna (ref)
                                  └─> content.quran_verses (ref)
                                  └─> content.hadith_entries (ref)

asma_ul_husna (1) ─────< (1) learning_progress

[content_type + content_id] ─────< (N) bookmarks
[content_type + content_id] ─────< (N) user_notes

───────────────────────────────────────────────────────────

CONTENT DATABASE:

surah_metadata (1) ─────< (N) quran_verses (1) ─────< (N) quran_translations
                                                    └───< (N) tafsir_content

hadith_collections (1) ─────< (N) hadith_entries (1) ─────< (N) hadith_translations
                                                         └───< (N) hadith_narrators

asma_ul_husna (1) ───────────> quran_verses (example_verse)
              (1) ───────────> hadith_entries (example_hadith)

thematic_index ───────────> [multiple content types]
```

## Indexes and Performance

### Critical Indexes

```sql
-- Journal performance
CREATE INDEX idx_journal_created_at ON journal_entries(created_at DESC);
CREATE INDEX idx_journal_favorite_created ON journal_entries(is_favorite, created_at DESC)
    WHERE is_favorite = 1;

-- Learning progress
CREATE INDEX idx_learning_next_review ON learning_progress(next_review_at, status)
    WHERE status != 'not_started';

-- Content search
CREATE INDEX idx_quran_surah_verse ON quran_verses(surah_number, verse_number);
CREATE INDEX idx_hadith_collection_number ON hadith_entries(collection_id, hadith_number);

-- Thematic search
CREATE INDEX idx_theme_relevance ON thematic_index(theme, relevance_score DESC);
```

### Query Optimization

```sql
-- Example: Fetch journal entries for current month with suggestions
SELECT
    je.*,
    COUNT(cs.id) as suggestion_count
FROM journal_entries je
LEFT JOIN companion_suggestions cs ON je.id = cs.journal_entry_id
WHERE je.created_at >= ? AND je.created_at < ?
  AND je.deleted_at IS NULL
GROUP BY je.id
ORDER BY je.created_at DESC
LIMIT 50;

-- Example: Find verses related to a theme
SELECT
    qv.*,
    qt.translation_text,
    ti.relevance_score
FROM thematic_index ti
JOIN quran_verses qv ON ti.content_id = qv.id
JOIN quran_translations qt ON qv.id = qt.verse_id
WHERE ti.theme = ?
  AND ti.content_type = 'verse'
  AND qt.translator = 'sahih_international'
ORDER BY ti.relevance_score DESC
LIMIT 10;
```

## Migration Strategy

### Version Control

```sql
CREATE TABLE schema_version (
    version INTEGER PRIMARY KEY,
    applied_at INTEGER NOT NULL,
    description TEXT
);

INSERT INTO schema_version VALUES (1, strftime('%s', 'now') * 1000, 'Initial schema');
```

### Migration Example (v1 to v2)

```kotlin
// Android Room Migration
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        // Add new column
        database.execSQL("ALTER TABLE journal_entries ADD COLUMN emotion TEXT")

        // Update version
        database.execSQL(
            "INSERT INTO schema_version VALUES (2, ${System.currentTimeMillis()}, 'Add emotion field')"
        )
    }
}
```

```swift
// iOS Core Data Migration
// Use lightweight migration for simple changes
// Use heavyweight migration for complex changes

// In AppDelegate or similar
let storeDescription = NSPersistentStoreDescription()
storeDescription.shouldMigrateStoreAutomatically = true
storeDescription.shouldInferMappingModelAutomatically = true
```

### Data Integrity

```sql
-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Regular integrity checks
PRAGMA integrity_check;

-- Optimize database
VACUUM;
ANALYZE;
```

---

<div dir="rtl">
رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا
</div>

*"Our Lord, do not impose blame upon us if we forget or make a mistake."* - Quran 2:286
