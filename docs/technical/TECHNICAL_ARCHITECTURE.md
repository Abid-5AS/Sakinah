# Technical Architecture

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Design Principles](#system-design-principles)
3. [Platform-Specific Architecture](#platform-specific-architecture)
4. [Data Layer Architecture](#data-layer-architecture)
5. [Security Architecture](#security-architecture)
6. [On-Device Intelligence](#on-device-intelligence)
7. [Offline-First Strategy](#offline-first-strategy)
8. [Performance Considerations](#performance-considerations)
9. [Technology Stack](#technology-stack)

## Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE LAYER                     │
│  (Material 3 Expressive - Android | iOS Liquid Glass - iOS) │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────────────────┐
│                   PRESENTATION LAYER                         │
│              (ViewModels / View Controllers)                 │
│  • Journal UI      • Library UI    • Learning UI            │
│  • Companion UI    • Settings UI   • Onboarding UI          │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────────────────┐
│                    DOMAIN LAYER                              │
│                  (Business Logic)                            │
│  • Journal Domain    • Library Domain   • Learning Domain   │
│  • Analysis Domain   • Authentication   • Content Domain    │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────────────────┐
│                     DATA LAYER                               │
│  ┌─────────────────┬──────────────────┬─────────────────┐  │
│  │  User Data DB   │  Content DB      │  Learning DB    │  │
│  │  (Encrypted)    │  (Pre-loaded)    │  (Progress)     │  │
│  └─────────────────┴──────────────────┴─────────────────┘  │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────────────────┐
│              ON-DEVICE SERVICES LAYER                        │
│  • Encryption Service      • Search Service                  │
│  • NLP Analysis Service    • Spaced Repetition Service       │
│  • Backup Service          • Analytics Service (Local)       │
└─────────────────────────────────────────────────────────────┘
```

### Core Architectural Patterns

1. **Clean Architecture**
   - Separation of concerns
   - Dependency inversion
   - Independent of frameworks and UI

2. **MVVM (Model-View-ViewModel)**
   - Android: Jetpack ViewModel + StateFlow
   - iOS: SwiftUI + Combine

3. **Repository Pattern**
   - Single source of truth
   - Abstraction of data sources
   - Easy testing and mocking

4. **Modular Architecture**
   - Feature modules
   - Shared core modules
   - Independent compilation

## System Design Principles

### 1. Offline-First
Every feature must work without internet connection.
- All content pre-bundled in app
- Local-only data storage
- No API calls for core functionality
- Sync optional and explicit (future feature)

### 2. Privacy-by-Design
Privacy is not a feature—it's the foundation.
- End-to-end encryption
- Zero-knowledge architecture
- No telemetry or analytics servers
- On-device processing only

### 3. Performance-First
Smooth experience on low-end devices.
- Target: Budget Android devices (2GB RAM)
- Efficient database queries
- Lazy loading of content
- Optimized image and asset sizes

### 4. Maintainability
Code that can be maintained long-term.
- Clear code organization
- Comprehensive documentation
- Automated testing (80%+ coverage goal)
- Consistent coding standards

### 5. Scalability
Built to grow with user needs.
- Modular feature addition
- Database migration support
- Content update mechanism
- Platform expansion ready

## Platform-Specific Architecture

### Android Architecture (Kotlin)

```
android/
├── app/
│   └── src/
│       ├── main/
│       │   ├── java/com/sakinah/
│       │   │   ├── SakinahApplication.kt
│       │   │   ├── di/                    # Dependency Injection (Hilt)
│       │   │   │   ├── AppModule.kt
│       │   │   │   ├── DatabaseModule.kt
│       │   │   │   └── RepositoryModule.kt
│       │   │   │
│       │   │   ├── data/                  # Data Layer
│       │   │   │   ├── local/
│       │   │   │   │   ├── dao/          # Room DAOs
│       │   │   │   │   ├── entities/     # Database entities
│       │   │   │   │   └── SakinahDatabase.kt
│       │   │   │   ├── repository/       # Repository implementations
│       │   │   │   └── encryption/       # Encryption utilities
│       │   │   │
│       │   │   ├── domain/                # Domain Layer
│       │   │   │   ├── model/            # Domain models
│       │   │   │   ├── repository/       # Repository interfaces
│       │   │   │   └── usecase/          # Use cases
│       │   │   │       ├── journal/
│       │   │   │       ├── library/
│       │   │   │       ├── learning/
│       │   │   │       └── companion/
│       │   │   │
│       │   │   ├── presentation/          # Presentation Layer
│       │   │   │   ├── journal/
│       │   │   │   │   ├── JournalViewModel.kt
│       │   │   │   │   ├── JournalScreen.kt
│       │   │   │   │   └── components/
│       │   │   │   ├── library/
│       │   │   │   ├── learning/
│       │   │   │   ├── companion/
│       │   │   │   └── common/           # Shared UI components
│       │   │   │
│       │   │   ├── services/              # On-Device Services
│       │   │   │   ├── nlp/              # NLP engine
│       │   │   │   ├── search/           # Search service
│       │   │   │   └── security/         # Security services
│       │   │   │
│       │   │   └── util/                  # Utilities
│       │   │       ├── Constants.kt
│       │   │       ├── Extensions.kt
│       │   │       └── DateUtils.kt
│       │   │
│       │   └── res/                       # Resources
│       │       ├── values/
│       │       │   ├── strings.xml
│       │       │   ├── strings-bn.xml    # Bengali strings
│       │       │   └── themes.xml         # Material 3 theme
│       │       └── raw/                   # Pre-loaded content
│       │           ├── quran.db
│       │           ├── hadith.db
│       │           └── asma_ul_husna.json
│       │
│       └── test/                          # Unit tests
│           └── androidTest/               # Instrumentation tests
│
└── build.gradle.kts
```

#### Key Android Technologies

1. **UI Framework**: Jetpack Compose
   - Declarative UI
   - Material 3 Expressive components
   - State management with StateFlow

2. **Database**: Room + SQLCipher
   - Type-safe database access
   - Encrypted storage
   - Migration support

3. **Dependency Injection**: Hilt
   - Compile-time DI
   - Android-specific scopes
   - Easy testing

4. **Coroutines & Flow**: Kotlin Coroutines
   - Asynchronous operations
   - Reactive streams
   - Structured concurrency

5. **Security**:
   - SQLCipher for database encryption
   - Jetpack Security (EncryptedSharedPreferences)
   - BiometricPrompt API

---

### iOS Architecture (Swift)

```
ios/
├── Sakinah/
│   ├── SakinahApp.swift
│   │
│   ├── Core/                              # Core utilities
│   │   ├── DependencyInjection/
│   │   │   └── Container.swift
│   │   ├── Encryption/
│   │   │   ├── EncryptionService.swift
│   │   │   └── KeychainHelper.swift
│   │   └── Extensions/
│   │       ├── String+Extensions.swift
│   │       └── Date+Extensions.swift
│   │
│   ├── Data/                              # Data Layer
│   │   ├── Local/
│   │   │   ├── CoreData/
│   │   │   │   ├── Models/              # Core Data models
│   │   │   │   ├── Sakinah.xcdatamodeld
│   │   │   │   └── CoreDataStack.swift
│   │   │   └── SQLite/                  # SQLCipher for content
│   │   │       └── ContentDatabase.swift
│   │   └── Repository/
│   │       ├── JournalRepository.swift
│   │       ├── LibraryRepository.swift
│   │       └── LearningRepository.swift
│   │
│   ├── Domain/                            # Domain Layer
│   │   ├── Models/
│   │   │   ├── JournalEntry.swift
│   │   │   ├── QuranVerse.swift
│   │   │   ├── Hadith.swift
│   │   │   └── AsmaUlHusna.swift
│   │   ├── RepositoryProtocols/
│   │   │   ├── JournalRepositoryProtocol.swift
│   │   │   └── LibraryRepositoryProtocol.swift
│   │   └── UseCases/
│   │       ├── Journal/
│   │       │   ├── CreateJournalEntryUseCase.swift
│   │       │   └── FetchJournalEntriesUseCase.swift
│   │       ├── Library/
│   │       ├── Learning/
│   │       └── Companion/
│   │
│   ├── Presentation/                      # Presentation Layer
│   │   ├── Journal/
│   │   │   ├── ViewModels/
│   │   │   │   └── JournalViewModel.swift
│   │   │   ├── Views/
│   │   │   │   ├── JournalListView.swift
│   │   │   │   ├── JournalEntryView.swift
│   │   │   │   └── Components/
│   │   │   └── Coordinator/
│   │   ├── Library/
│   │   ├── Learning/
│   │   ├── Companion/
│   │   └── Common/
│   │       └── Components/               # Reusable SwiftUI views
│   │
│   ├── Services/                          # On-Device Services
│   │   ├── NLP/
│   │   │   └── NLPAnalysisService.swift
│   │   ├── Search/
│   │   │   └── SearchService.swift
│   │   ├── Security/
│   │   │   ├── BiometricAuthService.swift
│   │   │   └── EncryptionService.swift
│   │   └── SpacedRepetition/
│   │       └── SRSService.swift
│   │
│   ├── Resources/                         # Resources
│   │   ├── Localization/
│   │   │   ├── en.lproj/
│   │   │   └── bn.lproj/                # Bengali localization
│   │   ├── Assets.xcassets/
│   │   └── PreloadedContent/
│   │       ├── quran.db
│   │       ├── hadith.db
│   │       └── asma_ul_husna.json
│   │
│   └── Supporting Files/
│       └── Info.plist
│
├── SakinahTests/                          # Unit tests
└── SakinahUITests/                        # UI tests
```

#### Key iOS Technologies

1. **UI Framework**: SwiftUI
   - Declarative UI
   - iOS 18 Liquid Glass aesthetic
   - State management with @State, @StateObject

2. **Database**: Core Data + SQLCipher
   - Core Data for user data
   - SQLCipher for encrypted content
   - iCloud sync support (optional future feature)

3. **Dependency Injection**: Manual DI Container
   - Protocol-oriented design
   - Lightweight DI
   - Easy testing

4. **Concurrency**: Swift Concurrency (async/await)
   - Modern async patterns
   - Actor isolation
   - Structured concurrency

5. **Security**:
   - SQLCipher for database encryption
   - Keychain for sensitive data
   - LocalAuthentication framework

---

## Data Layer Architecture

### Three-Database Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     DATA ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │  USER DATABASE (SQLCipher Encrypted)           │        │
│  │  • Journal entries                              │        │
│  │  • User notes and bookmarks                     │        │
│  │  • Personal settings                            │        │
│  │  • Learning progress                            │        │
│  │  Location: Private app storage                  │        │
│  │  Size: ~1-10 MB (grows with usage)             │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │  CONTENT DATABASE (Pre-loaded, Read-only)      │        │
│  │  • Complete Quran (Arabic + Translations)      │        │
│  │  • Hadith collections                           │        │
│  │  • Asma ul Husna data                          │        │
│  │  • Tafsir content                              │        │
│  │  Location: App bundle / First launch copy      │        │
│  │  Size: ~150-200 MB (compressed)                │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │  ANALYTICS DATABASE (Local, No network)        │        │
│  │  • App usage patterns (anonymous)               │        │
│  │  • Feature usage statistics                     │        │
│  │  • Performance metrics                          │        │
│  │  • Never leaves device                          │        │
│  │  Location: Private app storage                  │        │
│  │  Size: ~1-5 MB                                  │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Repository Pattern Implementation

```kotlin
// Android Example

// Repository Interface (Domain Layer)
interface JournalRepository {
    suspend fun createEntry(entry: JournalEntry): Result<Long>
    suspend fun getEntries(dateRange: DateRange): Flow<List<JournalEntry>>
    suspend fun searchEntries(query: String): Flow<List<JournalEntry>>
    suspend fun deleteEntry(id: Long): Result<Unit>
}

// Repository Implementation (Data Layer)
class JournalRepositoryImpl @Inject constructor(
    private val journalDao: JournalDao,
    private val encryptionService: EncryptionService
) : JournalRepository {

    override suspend fun createEntry(entry: JournalEntry): Result<Long> {
        return try {
            val encryptedContent = encryptionService.encrypt(entry.content)
            val entity = entry.toEntity().copy(content = encryptedContent)
            val id = journalDao.insert(entity)
            Result.success(id)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun getEntries(dateRange: DateRange): Flow<List<JournalEntry>> {
        return journalDao.getEntriesByDateRange(dateRange.start, dateRange.end)
            .map { entities ->
                entities.map { entity ->
                    entity.toDomain().copy(
                        content = encryptionService.decrypt(entity.content)
                    )
                }
            }
    }

    // ... other methods
}
```

```swift
// iOS Example

// Repository Protocol (Domain Layer)
protocol JournalRepository {
    func createEntry(_ entry: JournalEntry) async throws -> Int64
    func getEntries(in dateRange: DateRange) -> AsyncStream<[JournalEntry]>
    func searchEntries(query: String) -> AsyncStream<[JournalEntry]>
    func deleteEntry(id: Int64) async throws
}

// Repository Implementation (Data Layer)
class JournalRepositoryImpl: JournalRepository {
    private let coreDataStack: CoreDataStack
    private let encryptionService: EncryptionService

    init(coreDataStack: CoreDataStack, encryptionService: EncryptionService) {
        self.coreDataStack = coreDataStack
        self.encryptionService = encryptionService
    }

    func createEntry(_ entry: JournalEntry) async throws -> Int64 {
        let context = coreDataStack.newBackgroundContext()

        return try await context.perform {
            let encryptedContent = try self.encryptionService.encrypt(entry.content)
            let entity = JournalEntryEntity(context: context)
            entity.id = entry.id
            entity.content = encryptedContent
            entity.createdAt = entry.createdAt

            try context.save()
            return entity.id
        }
    }

    // ... other methods
}
```

## Security Architecture

### Encryption Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                  ENCRYPTION ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User Master Key (Generated on first launch)                │
│         │                                                    │
│         ├─> Stored in Keychain/KeyStore (Biometric-protected)
│         │                                                    │
│         ├─> Database Encryption Key (SQLCipher)             │
│         │   └─> Encrypts entire User Database               │
│         │                                                    │
│         ├─> Field-Level Encryption Key                      │
│         │   └─> Additional encryption for journal content   │
│         │                                                    │
│         └─> Backup Encryption Key (Optional)                │
│             └─> For encrypted local backups                 │
│                                                              │
│  Content Database: Not encrypted (public Islamic content)   │
│  Analytics Database: No sensitive data, optional encryption │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 AUTHENTICATION FLOW                          │
└─────────────────────────────────────────────────────────────┘

1. App Launch
   │
   ├─> Check if Master Key exists
   │   │
   │   ├─ NO → First Launch Flow
   │   │        ├─> Generate Master Key
   │   │        ├─> Store in Keychain (biometric-protected)
   │   │        ├─> Create encrypted databases
   │   │        └─> Show onboarding
   │   │
   │   └─ YES → Returning User Flow
   │            ├─> Show biometric prompt
   │            ├─> Retrieve Master Key from Keychain
   │            ├─> Unlock databases
   │            └─> Show main interface
   │
2. Biometric Failure
   │
   └─> Offer Passcode fallback
       ├─> Verify passcode
       ├─> Retrieve Master Key
       └─> Continue to app

3. Background/Foreground
   │
   └─> Lock app after configurable timeout
       └─> Require biometric/passcode on return
```

## On-Device Intelligence

### NLP Analysis Engine

The Companion feature uses on-device Natural Language Processing to analyze journal entries and suggest relevant Islamic content.

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              ON-DEVICE NLP ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────┘

User Journal Entry (Encrypted)
         │
         ├─> Decrypt in memory (never persisted unencrypted)
         │
         └─> NLP Pipeline
             │
             ├─> 1. Tokenization
             │    └─> Split into words/phrases
             │
             ├─> 2. Keyword Extraction
             │    ├─> Remove stop words
             │    ├─> Identify significant terms
             │    └─> Stem/Lemmatize words
             │
             ├─> 3. Emotion Detection
             │    ├─> Gratitude, worry, joy, sadness, etc.
             │    └─> Map to emotional themes
             │
             ├─> 4. Theme Classification
             │    ├─> Hardship, success, relationships, etc.
             │    └─> Map to Islamic concepts
             │
             └─> 5. Content Matching
                  ├─> Query Content Database
                  ├─> Match keywords to:
                  │    ├─> Asma ul Husna themes
                  │    ├─> Quran verse topics
                  │    └─> Hadith categories
                  │
                  └─> Return ranked suggestions
```

#### Technology Options

**Android:**
- **ML Kit (Text Analysis)**: On-device text processing
- **TensorFlow Lite**: Custom emotion/theme classification model
- **Custom Kotlin Implementation**: Lightweight keyword matching

**iOS:**
- **Natural Language Framework**: Built-in NLP capabilities
- **Core ML**: Custom emotion/theme classification model
- **Create ML**: Train custom text classification

#### Example Implementation

```kotlin
// Android - Simplified NLP Service

class NLPAnalysisService @Inject constructor(
    private val contentRepository: ContentRepository
) {
    private val emotionKeywords = mapOf(
        "grateful" to listOf("Ash-Shakur", "Al-Kareem"),
        "worried" to listOf("Al-Hafiz", "Al-Wakil"),
        "joyful" to listOf("Al-Wadud", "Al-Latif"),
        // ... more mappings
    )

    suspend fun analyzEntry(content: String): CompanionSuggestions {
        // 1. Extract keywords
        val keywords = extractKeywords(content)

        // 2. Detect emotions
        val emotions = detectEmotions(keywords)

        // 3. Find relevant Names
        val relevantNames = emotions.flatMap { emotionKeywords[it] ?: emptyList() }

        // 4. Search for relevant verses and hadith
        val verses = contentRepository.searchVerses(keywords)
        val hadith = contentRepository.searchHadith(keywords)

        return CompanionSuggestions(
            names = relevantNames,
            verses = verses,
            hadith = hadith
        )
    }

    private fun extractKeywords(text: String): List<String> {
        // Tokenize, remove stop words, stem
        // Return significant keywords
    }

    private fun detectEmotions(keywords: List<String>): List<String> {
        // Simple keyword-based emotion detection
        // Can be replaced with ML model
    }
}
```

## Offline-First Strategy

### Content Bundling

```
App Installation
    │
    ├─> APK/IPA includes compressed content (~50-80 MB)
    │
    └─> First Launch
        │
        ├─> Extract and decompress content
        ├─> Create Content Database (~150-200 MB)
        ├─> Index for fast search
        └─> Verify integrity (checksums)

Optional: Content Updates (Future Feature)
    │
    └─> Download delta updates over WiFi
        ├─> Apply updates to Content Database
        └─> Maintain version control
```

### Data Sync Strategy (Future Feature)

If optional cloud backup is implemented:

```
┌─────────────────────────────────────────────────────────────┐
│              OPTIONAL ENCRYPTED SYNC ARCHITECTURE            │
└─────────────────────────────────────────────────────────────┘

Local Journal
    │
    ├─> User explicitly enables backup
    │
    └─> Encryption Flow
        │
        ├─> Generate unique backup key (different from master)
        ├─> Encrypt all journal entries
        ├─> Create encrypted backup bundle
        │
        └─> Upload to user-controlled cloud
            ├─> iCloud (iOS)
            ├─> Google Drive (Android)
            └─> Or self-hosted solution

Restore Flow
    │
    ├─> User downloads encrypted bundle
    ├─> Provides backup key (separate from app passcode)
    ├─> Decrypt locally
    └─> Import into User Database

Key Principle: Zero-knowledge backup
              └─> Service provider cannot decrypt
```

## Performance Considerations

### Database Optimization

```kotlin
// Indexed columns for fast queries
@Entity(
    tableName = "journal_entries",
    indices = [
        Index(value = ["created_at"]),
        Index(value = ["modified_at"]),
        Index(value = ["tags"])
    ]
)
data class JournalEntryEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val content: String,  // Encrypted
    @ColumnInfo(name = "created_at") val createdAt: Long,
    @ColumnInfo(name = "modified_at") val modifiedAt: Long,
    val tags: String?  // Comma-separated for simple search
)

// Efficient pagination
@Query("SELECT * FROM journal_entries ORDER BY created_at DESC LIMIT :limit OFFSET :offset")
suspend fun getEntriesPaginated(limit: Int, offset: Int): List<JournalEntryEntity>

// Full-text search (FTS5)
@Entity(tableName = "journal_entries_fts")
@Fts4(contentEntity = JournalEntryEntity::class)
data class JournalEntryFts(
    val content: String
)
```

### Memory Management

- **Lazy Loading**: Load content on demand
- **Pagination**: Display 20-50 entries at a time
- **Image Optimization**: Compress and cache images
- **Background Processing**: Heavy operations in background threads

### Target Performance Metrics

- **App Launch**: < 2 seconds
- **Journal Entry Load**: < 500ms
- **Search Results**: < 1 second
- **Encryption/Decryption**: < 100ms per entry
- **NLP Analysis**: < 2 seconds per entry

## Technology Stack

### Android

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Language | Kotlin | Modern, concise, coroutines |
| UI Framework | Jetpack Compose | Declarative, Material 3 support |
| Architecture | Clean + MVVM | Separation of concerns |
| DI | Hilt | Android-optimized DI |
| Database | Room + SQLCipher | Type-safe, encrypted |
| Async | Coroutines + Flow | Structured concurrency |
| Security | Jetpack Security | Android best practices |
| Testing | JUnit, Espresso, Compose Testing | Comprehensive testing |

### iOS

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Language | Swift | Modern, safe, performant |
| UI Framework | SwiftUI | Declarative, iOS 18 support |
| Architecture | Clean + MVVM | Separation of concerns |
| DI | Manual Protocol-based | Lightweight, flexible |
| Database | Core Data + SQLCipher | Apple ecosystem, encrypted |
| Async | Swift Concurrency | Modern async/await |
| Security | Keychain, LocalAuthentication | iOS best practices |
| Testing | XCTest, ViewInspector | Comprehensive testing |

### Shared Principles

- **Minimum OS**: Android 8 (API 26), iOS 15
- **Language Level**: Kotlin 1.9+, Swift 5.9+
- **Encryption**: AES-256
- **Architecture**: Clean Architecture + MVVM
- **Testing**: TDD approach, 80%+ coverage goal

---

<div dir="rtl">
رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً
</div>

*"Our Lord, give us good in this world and good in the Hereafter."* - Quran 2:201
