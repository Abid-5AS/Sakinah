# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sakinah** (السكينة - Tranquility) is a privacy-first, offline-first spiritual journaling app for Android and iOS that helps Muslims internalize the 99 Names of Allah through personal reflection.

**Core Philosophy**: The app's success is measured by user "graduation" - when they've internalized spiritual reflection so deeply they no longer need the app.

**Critical Principles**:
- **Privacy-First**: Zero-knowledge architecture, all data encrypted on-device, never transmitted
- **Offline-First**: Full functionality without internet, all Islamic content pre-bundled
- **Authenticity**: All Islamic content from verified scholarly sources with proper attribution
- **Cultural Context**: Designed for Bangladeshi Muslims with Bengali language support

## Architecture Overview

### Clean Architecture + MVVM

The codebase follows Clean Architecture with three main layers:

```
┌─────────────────────────────────────┐
│   Presentation Layer                │  ViewModels/ViewControllers + UI
│   (Jetpack Compose / SwiftUI)       │  Depends on: Domain only
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Domain Layer                      │  Business logic, Use Cases, Domain Models
│   (Pure Kotlin/Swift)               │  Depends on: Nothing (pure code)
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Data Layer                        │  Repositories, DAOs, Data Sources
│   (Room/Core Data + SQLCipher)     │  Depends on: Domain interfaces
└─────────────────────────────────────┘
```

**Dependency Rule**: Outer layers depend on inner layers, never reverse. Domain layer has zero dependencies.

### Three-Database Architecture

**Critical Understanding**: Sakinah uses three separate databases for different purposes:

1. **User Database** (`user_data.db`)
   - **Encrypted** with SQLCipher (AES-256)
   - Contains: Journal entries, bookmarks, learning progress, settings
   - Master key stored in Android KeyStore / iOS Keychain (biometric-protected)
   - Grows with usage (~1-10 MB)

2. **Content Database** (`content.db`)
   - **Read-only**, pre-loaded at first launch
   - Contains: Complete Quran, Hadith collections, 99 Names, Tafsir
   - NOT encrypted (public Islamic content)
   - Large size (~150-200 MB compressed)
   - Bundled in app assets

3. **Analytics Database** (`analytics.db`)
   - **Local-only**, never transmitted
   - Contains: Feature usage, performance metrics, error logs
   - User can view and delete all data
   - Privacy-preserving (no personal data)

**Why Three Databases?**
- Security: Only encrypt what needs encryption (performance)
- Content Updates: Can update Islamic content independently
- Privacy: Clear separation of personal vs public data

## Project Structure

```
Sakinah/
├── android/                          # Will contain: Android Kotlin app
│   └── app/src/main/java/com/sakinah/
│       ├── data/                     # Repositories, DAOs, Entities
│       ├── domain/                   # Use Cases, Domain Models, Interfaces
│       └── presentation/             # ViewModels, Composables
│
├── ios/                              # Will contain: iOS Swift app
│   └── Sakinah/
│       ├── Data/                     # Repositories, Core Data
│       ├── Domain/                   # Use Cases, Domain Models, Protocols
│       └── Presentation/             # ViewModels, SwiftUI Views
│
├── shared-resources/                 # Will contain: Pre-loaded content
│   ├── quran/                        # Quran data (Tanzil format)
│   ├── hadith/                       # Hadith collections (authenticated)
│   └── asma-ul-husna/               # 99 Names with explanations
│
└── docs/                             # Comprehensive documentation
    ├── technical/                    # Architecture, DB Schema, Security
    ├── design/                       # Material 3 / iOS design specs
    ├── development/                  # Roadmap, Testing, Code Standards
    └── content/                      # Islamic content management
```

## Four Pillars (Feature Modules)

The app is conceptually organized around four pillars:

1. **The Sanctuary**: Private encrypted journal with biometric lock
2. **The Library**: Quran, Hadith, 99 Names (read-only content)
3. **The Companion**: On-device NLP that suggests relevant Islamic content based on journal entries
4. **The Guide**: Spaced repetition system for memorizing the 99 Names

Each pillar has its own domain logic, data repositories, and UI components.

## Development Workflow

### Current Status
- **Phase**: Documentation Complete, Ready for Development
- **Next**: Month 1 - Foundation & Setup (see DEVELOPMENT_ROADMAP.md)

### Parallel Development Approach
- Android and iOS are developed **simultaneously** as separate native apps
- Shared conceptual architecture, but separate codebases
- No code sharing between platforms (native-first approach)

### When Building Features

1. **Start with Domain Layer**: Define use cases and domain models (pure Kotlin/Swift, no framework dependencies)
2. **Define Repository Interface**: In domain layer (e.g., `JournalRepository`)
3. **Implement Data Layer**: Repository implementation, DAOs, database operations
4. **Build Presentation**: ViewModel/View logic, then UI (Compose/SwiftUI)
5. **Write Tests**: Unit tests for domain/data (80%+ coverage goal), UI tests for critical flows

### Testing Strategy

- **Unit Tests** (60%): Domain logic, repositories, use cases
- **Integration Tests** (30%): Database operations, multi-component interactions
- **UI/E2E Tests** (10%): Critical user flows
- **100% coverage required** for: Encryption, authentication, database operations
- Use TDD for business logic and security-critical code

## Islamic Content Requirements

**Critical**: All Islamic content must be:
1. **Authenticated**: Hadith must have grading (Sahih/Hasan/Daif)
2. **Attributed**: Full source citations (e.g., "Sahih Bukhari 1")
3. **Verified**: Reviewed by qualified Islamic scholars
4. **Mainstream**: Follow Ahl al-Sunnah wal-Jama'ah positions

**Content Sources** (see CONTENT_MANAGEMENT.md):
- Quran: Tanzil.net (CC BY-ND 3.0)
- Hadith: Sunnah.com (with permission)
- Translations: Sahih International (English), Taisirul Quran (Bengali)

**Never**:
- Include weak (Daif) or fabricated (Mawdu) Hadith in suggestions
- Modify Quranic text or translations
- Add personal interpretations without scholarly backing

## Security Requirements

**Zero-Knowledge Architecture**:
- All encryption happens on-device
- Master key never leaves Secure Element (KeyStore/Keychain)
- No backend servers (app is fully offline)
- Journal content encrypted at field level + database level

**Biometric Authentication**:
- Required on app launch
- Passcode fallback mandatory
- Auto-lock after configurable timeout (default 5 minutes)
- Use BiometricPrompt (Android) / LocalAuthentication (iOS)

**Critical Security Rules**:
- Never log sensitive data (journal content, encryption keys)
- No SQL string concatenation (use parameterized queries only)
- Clear sensitive data from memory after use
- Use `FLAG_SECURE` / background blur for screenshots

## Key Documentation Files

When working on specific areas, reference these docs:

- **Architecture & Design**: `docs/technical/TECHNICAL_ARCHITECTURE.md`
- **Database Schema**: `docs/technical/DATABASE_SCHEMA.md` (complete SQL schemas)
- **Security Implementation**: `docs/technical/SECURITY_PRIVACY.md`
- **Android Design**: `docs/design/ANDROID_DESIGN_GUIDE.md` (Material 3 Expressive)
- **iOS Design**: `docs/design/IOS_DESIGN_GUIDE.md` (Liquid Glass style)
- **Code Standards**: `docs/development/CODE_STANDARDS.md` (Kotlin/Swift conventions)
- **Testing**: `docs/development/TESTING_STRATEGY.md`
- **Features**: `docs/development/FEATURES_ROADMAP.md`
- **User Stories**: `docs/USER_STORIES.md` (detailed personas)

## Design Language

### Android: Material 3 Expressive
- Primary color: Deep teal (#006A6A)
- Rounded corners (16-24dp)
- Jetpack Compose with Material 3 components
- Typography: Serif for Names, Sans-serif for UI, Noto Arabic/Bengali

### iOS: Liquid Glass Style
- Translucent glass-like surfaces (`.ultraThinMaterial`)
- Fluid spring-based animations
- SwiftUI with iOS 18+ features
- SF Pro with custom Arabic/Bengali fonts

## Common Patterns

### Repository Pattern Example
```kotlin
// Domain Layer - Interface
interface JournalRepository {
    suspend fun createEntry(entry: JournalEntry): Result<Long>
    fun getEntries(): Flow<List<JournalEntry>>
}

// Data Layer - Implementation
class JournalRepositoryImpl(
    private val dao: JournalDao,
    private val encryptionService: EncryptionService
) : JournalRepository {
    override suspend fun createEntry(entry: JournalEntry): Result<Long> {
        // 1. Encrypt content
        val encrypted = encryptionService.encrypt(entry.content)
        // 2. Save to database
        val entity = entry.toEntity().copy(content = encrypted)
        return try {
            val id = dao.insert(entity)
            Result.success(id)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

### Use Case Pattern
```kotlin
// One use case = one specific action
class CreateJournalEntryUseCase(
    private val repository: JournalRepository
) {
    suspend operator fun invoke(content: String): Result<Long> {
        // Validation
        if (content.isBlank()) return Result.failure(ValidationException())

        // Business logic
        val entry = JournalEntry(
            content = content,
            createdAt = System.currentTimeMillis()
        )

        // Delegate to repository
        return repository.createEntry(entry)
    }
}
```

## Git Workflow

### Branch Naming
- `feature/journal-editor` - New features
- `fix/encryption-bug` - Bug fixes
- `refactor/clean-arch` - Refactoring
- `docs/api-documentation` - Documentation

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Example**:
```
feat(journal): add biometric authentication

Implement fingerprint and Face ID authentication for app lock.
Users can now secure their journal with biometrics.

Closes #123
```

## Development Commands

### Android
```bash
# Build project
./gradlew build

# Run unit tests
./gradlew testDebugUnitTest

# Run instrumentation tests
./gradlew connectedAndroidTest

# Run specific test
./gradlew test --tests "JournalRepositoryTest.createEntry encrypts content"

# Check code coverage
./gradlew jacocoTestReport

# Install debug build
./gradlew installDebug

# Run lint
./gradlew lintDebug
```

### iOS
```bash
# Build project
xcodebuild -workspace Sakinah.xcworkspace -scheme Sakinah build

# Run tests
xcodebuild test -workspace Sakinah.xcworkspace -scheme Sakinah \
  -destination 'platform=iOS Simulator,name=iPhone 15'

# Run specific test
xcodebuild test -workspace Sakinah.xcworkspace -scheme Sakinah \
  -only-testing:SakinahTests/JournalRepositoryTests/testCreateEntry

# SwiftLint
swiftlint lint --strict

# Open workspace (required for CocoaPods)
open Sakinah.xcworkspace
```

## Critical Architectural Decisions

### Why Separate Native Apps?
- **Performance**: Native UI frameworks (Compose/SwiftUI) for 60fps
- **Platform Features**: Biometric auth, secure enclaves, local storage
- **Design**: Platform-specific design languages (Material 3 / Liquid Glass)
- **Offline**: Native databases (Room/Core Data) for zero-latency

### Why On-Device NLP?
- **Privacy**: Journal content never transmitted
- **Offline**: No internet required for suggestions
- **Control**: Full transparency in suggestion algorithm
- **Trust**: Users can verify all suggested content in Library

### Why Three Databases?
- **Security**: Only encrypt personal data (performance + security)
- **Updates**: Islamic content can be updated independently via app updates
- **Size**: Content DB is large but read-only, can be optimized differently
- **Privacy**: Clear separation helps with GDPR/privacy compliance

## Project Values

When making decisions, prioritize:
1. **User Privacy**: When in doubt, choose the more private option
2. **Islamic Authenticity**: Never compromise on content verification
3. **Offline Capability**: Feature must work without internet
4. **Simplicity**: Prefer simple, maintainable code over clever solutions
5. **Performance**: Target low-end devices (2GB RAM Android phones)

---

*All praise is due to Allah (SWT). This project is built with the intention of helping Muslims deepen their relationship with their Creator.*
