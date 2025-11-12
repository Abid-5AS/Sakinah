# Sakinah - The Tranquility Journal

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Overview

**Sakinah** (السكينة - Tranquility) is a privacy-first, offline-first spiritual journaling application designed to help Muslims build a deeper connection with Allah through personal reflection and the internalization of the Asma ul Husna (99 Names of Allah).

### The Philosophy

The ultimate goal of Sakinah is not user retention, but **user transformation**. Success is measured when the user has internalized the practice of spiritual reflection so deeply that they no longer need the app. This is a graduation, not an abandonment.

### Core Principles

1. **Privacy-First**: Your thoughts and reflections never leave your device
2. **Offline-First**: Full functionality without internet connection
3. **Authenticity**: All Islamic content is from verified, authentic sources
4. **User Empowerment**: Every suggestion can be verified in the built-in library
5. **Culturally Aware**: Designed with Bangladeshi Muslim perspective in mind

## Key Features

### 🔒 The Sanctuary (Private Journal)
- Encrypted, on-device journaling
- Biometric/passcode protection
- Zero cloud sync (data stays on your device)
- Beautiful, distraction-free writing experience

### 📚 The Library (Knowledge Vault)
- Complete Quran with multiple translations
- Authentic Hadith collections with grading
- 99 Names of Allah with detailed explanations
- Tafsir and scholarly commentary
- Bookmark, favorite, and annotate capabilities

### 🤝 The Companion (Reflective Engine)
- On-device AI analysis of journal entries
- Intelligent suggestions of relevant Names, verses, and Hadith
- Context-aware spiritual guidance
- Weekly reflection summaries

### 📖 The Guide (Learning Path)
- Spaced repetition system for memorizing the 99 Names
- Interactive flashcards
- Visual connection maps
- Progress tracking toward "graduation"

## Technology Stack

### Android (Kotlin)
- **Design Language**: Material 3 Expressive
- **Minimum SDK**: Android 8.0 (API 26)
- **Architecture**: Clean Architecture + MVVM
- **Database**: SQLCipher for Android
- **UI Framework**: Jetpack Compose

### iOS (Swift)
- **Design Language**: iOS 18 Liquid Glass Style
- **Minimum Version**: iOS 15.0
- **Architecture**: Clean Architecture + MVVM
- **Database**: SQLCipher for iOS
- **UI Framework**: SwiftUI

## Project Structure

```
Sakinah/
├── android/                 # Android (Kotlin) application
├── ios/                    # iOS (Swift) application
├── docs/                   # Project documentation
│   ├── design/            # Design specifications
│   ├── technical/         # Technical documentation
│   ├── development/       # Development guides
│   └── content/           # Content management docs
└── shared-resources/      # Shared assets and content
    ├── quran/            # Quran data
    ├── hadith/           # Hadith collections
    └── asma-ul-husna/    # 99 Names data
```

## Documentation

- [Project Overview](docs/PROJECT_OVERVIEW.md) - Vision, goals, and philosophy
- [User Stories](docs/USER_STORIES.md) - User personas and use cases
- [Technical Architecture](docs/technical/TECHNICAL_ARCHITECTURE.md) - System design
- [Android Design Guide](docs/design/ANDROID_DESIGN_GUIDE.md) - Material 3 Expressive specs
- [iOS Design Guide](docs/design/IOS_DESIGN_GUIDE.md) - iOS Liquid Glass specs
- [Database Schema](docs/technical/DATABASE_SCHEMA.md) - Data structure
- [Features Roadmap](docs/development/FEATURES_ROADMAP.md) - Feature priorities
- [Development Roadmap](docs/development/DEVELOPMENT_ROADMAP.md) - Timeline and milestones
- [Security & Privacy](docs/technical/SECURITY_PRIVACY.md) - Security implementation
- [Content Management](docs/content/CONTENT_MANAGEMENT.md) - Islamic content sources
- [Testing Strategy](docs/development/TESTING_STRATEGY.md) - QA approach
- [Code Standards](docs/development/CODE_STANDARDS.md) - Coding conventions

## Development Setup

### Android
```bash
# Clone the repository
git clone https://github.com/yourusername/Sakinah.git
cd Sakinah/android

# Build the project
./gradlew build

# Run on emulator/device
./gradlew installDebug
```

### iOS
```bash
# Navigate to iOS directory
cd Sakinah/ios

# Install dependencies
pod install

# Open in Xcode
open Sakinah.xcworkspace
```

## Contributing

This project is being developed with an Islamic ethos. All contributions must:
- Respect Islamic values and scholarship
- Maintain the highest standards of authenticity for religious content
- Prioritize user privacy and security
- Follow the established code standards

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

## License

[To be determined]

## Acknowledgments

- All praise is due to Allah (SWT)
- Islamic content sourced from verified scholars and authentic collections
- Built with love for the Bangladeshi Muslim community and Muslims worldwide

## Contact

[Project contact information to be added]

---

<div dir="rtl">
وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ
</div>

*"And my success is not but through Allah. Upon Him I have relied, and to Him I return."* - Quran 11:88
