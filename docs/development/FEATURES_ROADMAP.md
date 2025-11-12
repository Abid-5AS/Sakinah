# Features Roadmap

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Feature Overview](#feature-overview)
2. [MVP (Phase 1)](#mvp-phase-1)
3. [Phase 2 - Enhancement](#phase-2---enhancement)
4. [Phase 3 - Advanced Features](#phase-3---advanced-features)
5. [Phase 4 - Community & Growth](#phase-4---community--growth)
6. [Future Considerations](#future-considerations)

## Feature Overview

Features are organized by the Four Pillars of Sakinah and prioritized using the MoSCoW method:
- **Must Have**: Essential for MVP
- **Should Have**: Important but not critical
- **Could Have**: Nice to have
- **Won't Have**: Out of scope

## MVP (Phase 1)

**Timeline**: 3-4 months
**Goal**: Launch functional app with core features

### Pillar 1: The Sanctuary (Journal)

#### Must Have
- [ ] **Journal Entry Creation**
  - Text editor with markdown support
  - Auto-save functionality
  - Date and time stamping
  - Character/word count

- [ ] **Journal Entry Management**
  - View all entries in chronological order
  - Edit existing entries
  - Delete entries (with confirmation)
  - Search entries by text

- [ ] **Security**
  - App-level biometric lock (fingerprint/Face ID)
  - Passcode fallback
  - Encrypted database (SQLCipher)
  - Field-level encryption for journal content

- [ ] **Basic UI**
  - Entry list view
  - Entry detail view
  - Simple, clean editor
  - Material 3 (Android) / SwiftUI (iOS)

#### Should Have
- [ ] Entry tagging system (#gratitude, #challenge, etc.)
- [ ] Entry emotions/mood selection
- [ ] Favorite/star entries
- [ ] Dark mode support

#### Could Have
- [ ] Entry templates
- [ ] Rich text formatting toolbar
- [ ] Entry export (encrypted PDF)

#### Won't Have (MVP)
- Voice notes
- Image attachments
- Handwriting support
- Cloud sync

---

### Pillar 2: The Library (Knowledge Vault)

#### Must Have
- [ ] **Quran Module**
  - Complete Quran text (Arabic)
  - English translation (Sahih International)
  - Bengali translation
  - Surah and verse navigation
  - Basic search by verse number

- [ ] **Hadith Module**
  - Sahih Bukhari collection
  - Sahih Muslim collection
  - Browse by book and chapter
  - Authenticity grade display
  - Basic search by hadith number

- [ ] **99 Names Module**
  - List of all 99 Names
  - Arabic name with transliteration
  - English meaning
  - Bengali meaning
  - Basic explanation for each name
  - Simple list and grid views

- [ ] **General**
  - Bookmark functionality
  - Favorites system
  - Basic search across all content

#### Should Have
- [ ] Additional Hadith collections (Abu Dawud, Tirmidhi)
- [ ] Word-by-word Quran view (prep for future)
- [ ] Tafsir for key verses (Ibn Kathir - selected verses)
- [ ] Advanced search (by keyword, theme)
- [ ] Copy to clipboard functionality
- [ ] Share verse/hadith (text only)

#### Could Have
- [ ] Multiple English translations
- [ ] Urdu translation
- [ ] Audio recitation (selected surahs)
- [ ] Reading progress tracking

#### Won't Have (MVP)
- Full audio Quran
- Complete tafsir library
- Tajweed rules
- Quranic Arabic lessons

---

### Pillar 3: The Companion (Reflective Engine)

#### Must Have
- [ ] **Basic NLP Analysis**
  - Keyword extraction from journal entries
  - Emotion detection (simple keyword-based)
  - Theme identification (hardship, gratitude, etc.)

- [ ] **Simple Suggestions**
  - Suggest 1-2 relevant Names based on entry
  - Suggest 1 relevant Quran verse
  - Suggest 1 relevant Hadith
  - Display suggestions in entry detail view

- [ ] **On-Device Processing**
  - All analysis happens locally
  - No data leaves device
  - Transparent privacy explanation

#### Should Have
- [ ] User feedback on suggestions (helpful/not helpful)
- [ ] Weekly reflection summary
  - Most common emotions
  - Most frequent themes
  - Suggested Names to explore

- [ ] Improved relevance algorithm based on feedback

#### Could Have
- [ ] Daily reflection prompt
- [ ] Monthly spiritual report
- [ ] Pattern recognition over time

#### Won't Have (MVP)
- Generative AI responses
- Cloud-based processing
- Social features
- Comparison with other users

---

### Pillar 4: The Guide (Learning Path)

#### Must Have
- [ ] **Basic Flashcard System**
  - Flashcards for all 99 Names
  - Arabic → English meaning
  - Front: Arabic name
  - Back: Transliteration + Meaning
  - Manual flip

- [ ] **Simple Progress Tracking**
  - Mark names as "Not Started", "Learning", "Memorized"
  - Progress percentage display
  - Filter by status

- [ ] **Study Session**
  - Study all cards
  - Study only "Learning" cards
  - Random order option

#### Should Have
- [ ] Spaced Repetition System (SRS)
  - SM-2 algorithm implementation
  - Automatic scheduling of reviews
  - Difficulty rating after each card

- [ ] Study statistics
  - Cards studied today
  - Cards due for review
  - Streak tracking

- [ ] Multiple card types
  - English → Arabic
  - Meaning → Name
  - Audio pronunciation → Name (future)

#### Could Have
- [ ] Visual connection map of related Names
- [ ] Quizzes and tests
- [ ] Achievement badges
- [ ] Custom study sets

#### Won't Have (MVP)
- Hadith memorization
- Quran memorization tools
- Community leaderboards
- Multiplayer quizzes

---

### Cross-Cutting Features (MVP)

#### Must Have
- [ ] **Onboarding**
  - Welcome screens (3-5 screens)
  - Feature introduction
  - Privacy explanation
  - Security setup (biometric/passcode)
  - Language selection

- [ ] **Settings**
  - Language (English, Bengali)
  - Theme (Light, Dark, System)
  - Security settings
  - About page
  - Privacy policy

- [ ] **Localization**
  - English (primary)
  - Bengali (secondary)
  - RTL support for Arabic content

#### Should Have
- [ ] Tutorial/Help system
- [ ] App tour for first-time users
- [ ] Font size adjustment
- [ ] Export all data

#### Could Have
- [ ] In-app feedback form
- [ ] Rate the app prompt
- [ ] Tip of the day

#### Won't Have (MVP)
- Multi-user support
- Social sharing
- Integration with other apps
- Widget support

---

## Phase 2 - Enhancement

**Timeline**: 2-3 months after MVP
**Goal**: Improve UX and add requested features

### Enhancements

- [ ] **Enhanced Journal**
  - Rich text editor with formatting
  - Entry templates
  - Archive functionality
  - Bulk actions (delete, archive multiple)
  - Advanced search filters

- [ ] **Expanded Library**
  - Complete 6 authentic Hadith collections
  - Additional Quran translations (Muhsin Khan, Pickthall)
  - Expanded tafsir (more verses from Ibn Kathir)
  - Urdu translation support
  - Related verses/hadith suggestions

- [ ] **Improved Companion**
  - Machine learning model for better suggestions
  - Contextual prompts based on time of day
  - Integration with Names learning progress
  - "Reflect on this Name today" feature

- [ ] **Advanced Learning**
  - Visual connection map between related Names
  - Etymology and root word analysis
  - Historical examples of each Name
  - Audio pronunciation for all Names
  - Custom study plans

- [ ] **Performance & Polish**
  - Animation refinements
  - Offline content pre-loading
  - Database optimization
  - Better error handling
  - Accessibility improvements

---

## Phase 3 - Advanced Features

**Timeline**: 3-4 months after Phase 2
**Goal**: Add advanced functionality

### New Features

- [ ] **Voice Journal**
  - Voice-to-text entry creation
  - On-device speech recognition
  - Audio note attachments (encrypted)

- [ ] **Advanced Analytics**
  - Detailed reflection insights
  - Spiritual growth visualization
  - Journaling streaks and habits
  - Personalized recommendations

- [ ] **Quran Deep Dive**
  - Complete tafsir integration
  - Word-by-word analysis
  - Thematic Quran study
  - Cross-reference tools

- [ ] **Extended Learning**
  - Hadith memorization system
  - Short Quran surah memorization
  - Daily dua collection
  - Islamic history lessons

- [ ] **Optional Cloud Backup**
  - End-to-end encrypted backup
  - User-controlled sync
  - Device-to-device transfer
  - Backup to user's Google Drive/iCloud

- [ ] **Widgets**
  - Daily Name widget
  - Verse of the day
  - Quick journal entry
  - Learning progress

---

## Phase 4 - Community & Growth

**Timeline**: 6+ months after Phase 3
**Goal**: Expand reach while maintaining privacy

### Community Features (Privacy-Preserved)

- [ ] **Family Mode**
  - Parent-child accounts (local only)
  - Shared learning progress
  - Parent can track child's progress
  - Age-appropriate content filtering

- [ ] **Study Groups**
  - Local group study mode
  - Shared study plans (no personal data shared)
  - Group challenges (who can memorize most Names)
  - No social feeds or public posts

- [ ] **Educational Integration**
  - Madrasah edition
  - Teacher dashboard (local network only)
  - Curriculum integration
  - Progress reports

### Growth Features

- [ ] **Content Expansion**
  - More languages (Urdu, Arabic, Malay, etc.)
  - Regional content (specific to Bangladesh, Pakistan, etc.)
  - Scholarly articles
  - Islamic Q&A library

- [ ] **Advanced Personalization**
  - ML-powered learning paths
  - Adaptive difficulty
  - Personalized reflection prompts
  - Smart review scheduling

- [ ] **Platform Expansion**
  - iPad-optimized interface
  - Android tablet optimization
  - Apple Watch companion app
  - Web viewer (read-only for desktop)

---

## Future Considerations

### Long-term Ideas (Not Committed)

- [ ] Ramadan mode with special features
- [ ] Hajj and Umrah guide
- [ ] Islamic calendar integration
- [ ] Prayer time reminders (integrate with location)
- [ ] Qibla direction compass
- [ ] Zakat calculator
- [ ] Islamic will template
- [ ] Muslim baby names database

### Ideas to Explicitly Avoid

- ❌ Social media features (feeds, likes, comments)
- ❌ Public leaderboards
- ❌ Ads or monetization that compromises privacy
- ❌ Selling user data
- ❌ Requiring online account
- ❌ Gamification that encourages obsession
- ❌ Notifications designed for engagement (not value)
- ❌ Integration with data-harvesting platforms

---

## Feature Decision Framework

When considering new features, ask:

1. **Does it serve the mission?**
   - Does it help users internalize Islamic teachings?
   - Does it move users toward "graduation"?

2. **Does it respect privacy?**
   - Can it work offline?
   - Does it require data collection?
   - Is encryption maintained?

3. **Is it authentic?**
   - Is Islamic content properly sourced?
   - Can users verify authenticity?
   - Have scholars reviewed it?

4. **Is it sustainable?**
   - Can we maintain it long-term?
   - Does it align with our ethical commitments?
   - Will it still be relevant in 5 years?

---

<div dir="rtl">
رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا
</div>

*"Our Lord, perfect for us our light and forgive us."* - Quran 66:8
