# Sakinah App - سَكِينَة

**Your Personal Spiritual Companion**

A privacy-first, offline-capable React Native mobile application designed to help Muslims worldwide deepen their connection with Allah through the internalization of His Beautiful Names (Asma ul Husna), reflective journaling, and authentic Islamic knowledge.

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## 🌙 Vision

To create a digital sanctuary that helps Muslims develop a profound and personal relationship with Allah through spiritual reflection, with the ultimate goal of making this practice so natural that the app itself becomes unnecessary - a concept we call "graduation."

## ✨ Key Features

### 🏛️ Four Pillars of Sakinah

#### 1. **The Sanctuary (Private Journal)**
- 🔒 Fully encrypted journal entries
- 📝 Beautiful, distraction-free writing interface
- 🏷️ Tags and mood tracking
- ⭐ Favorite entries
- 🔍 Powerful search functionality
- **Zero-knowledge architecture** - not even developers can access your journal

#### 2. **The Library (Knowledge Vault)**
- 📿 **99 Names of Allah (Asma ul Husna)**
  - Arabic text with transliteration
  - English and Bengali translations
  - Detailed explanations and root word analysis
  - Related Names connections
- 📖 **Quran** (Coming in full implementation)
  - Complete Quran with translations
  - Bengali translation support
  - Verse bookmarking
- 📚 **Hadith Collections** (Coming in full implementation)
  - Authentic collections (Sahih Bukhari, Muslim, etc.)
  - Authenticity grading (Sahih, Hasan, Daif)
  - Full chain of narration

#### 3. **The Companion (Reflective Engine)**
- 🤖 On-device NLP analysis of journal entries
- 💡 Intelligent suggestions of relevant Names
- 📖 Related Quranic verses and Hadith
- 📊 Weekly reflection summaries
- **100% offline** - all processing happens on your device

#### 4. **The Guide (Learning Path)**
- 🎴 Flashcard system for memorization
- 🧠 Spaced Repetition System (SRS)
- 📈 Progress tracking
- 🎯 Learning status for each Name
- 🗺️ Visual connection maps (Coming soon)

## 🎨 Design Philosophy

### iOS Liquid Glass Aesthetic
- Modern, translucent UI elements with blur effects
- Smooth, physics-based animations
- Fluid interactions with haptic feedback
- Material Design 3 principles
- Beautiful Arabic and Bengali typography
- Accessibility-first approach

### Core Principles
1. **Privacy by Design** - Your data never leaves your device
2. **Offline First** - Full functionality without internet
3. **Graduation Goal** - Success = you no longer need the app
4. **Authenticity** - All Islamic content is properly sourced and verified
5. **Cultural Sensitivity** - Designed with Bangladeshi Muslim community in mind

## 🏗️ Technical Architecture

### Stack
- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **State Management**: Zustand (planned) / React hooks
- **Database**: SQLite with encryption
- **Navigation**: React Navigation 6
- **Animations**: React Native Reanimated
- **Security**: expo-secure-store, expo-local-authentication
- **Storage**: expo-sqlite for local database

### Architecture Pattern
- **Clean Architecture** with separation of concerns
- **MVVM** (Model-View-ViewModel) pattern
- **Repository Pattern** for data access
- **Modular Structure** for scalability

### Project Structure
```
sakinah-app/
├── src/
│   ├── core/
│   │   ├── theme/          # Design system (colors, typography, spacing)
│   │   ├── constants/      # App constants
│   │   └── types/          # TypeScript type definitions
│   ├── data/
│   │   ├── local/
│   │   │   ├── database/   # SQLite setup
│   │   │   └── models/     # Data models
│   │   └── repositories/   # Data access layer
│   ├── domain/
│   │   ├── models/         # Domain models
│   │   └── usecases/       # Business logic
│   ├── presentation/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/     # Glass UI components
│   │   │   ├── journal/
│   │   │   ├── library/
│   │   │   └── learning/
│   │   ├── screens/        # App screens
│   │   └── navigation/     # Navigation setup
│   ├── services/
│   │   ├── encryption/     # Encryption service
│   │   ├── biometric/      # Biometric auth
│   │   ├── nlp/            # NLP analysis (planned)
│   │   └── localization/   # i18n (planned)
│   └── assets/
│       └── data/           # Pre-loaded Islamic content
└── App.tsx                 # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio (for Android development)
- Expo Go app on your phone (for quick testing)

### Installation

1. **Clone the repository**
```bash
cd sakinah-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on device/simulator**
```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android

# Web browser (limited functionality)
npm run web
```

5. **Run on physical device**
- Install Expo Go from App Store or Play Store
- Scan the QR code from the terminal with your phone camera
- The app will load in Expo Go

## 📱 Features Implemented (MVP)

### ✅ Completed
- [x] Project setup with Expo and TypeScript
- [x] Clean Architecture folder structure
- [x] iOS Liquid Glass design system components
  - [x] GlassCard with blur effects
  - [x] GlassButton with haptics
  - [x] GlassTabBar for navigation
- [x] Theme system (colors, typography, spacing)
- [x] Encrypted SQLite database setup
- [x] Encryption service with secure key storage
- [x] Biometric authentication service
- [x] Journal repository with CRUD operations
- [x] Navigation structure (tabs + stack)
- [x] Onboarding screen with beautiful UI
- [x] Journal list screen
- [x] Journal editor screen
- [x] Library home screen
- [x] 99 Names list screen with 10 sample names
- [x] Learning home screen with progress tracking
- [x] Settings screen
- [x] App initialization with splash screen

### 🔄 In Progress / Planned
- [ ] Full 99 Names data (currently 10 sample names)
- [ ] Complete Quran integration
- [ ] Hadith collections
- [ ] Bengali localization (i18n setup)
- [ ] NLP analysis engine for Companion feature
- [ ] Spaced Repetition System implementation
- [ ] Flashcard functionality
- [ ] Biometric unlock flow
- [ ] Journal entry detail screen
- [ ] Name detail screen with full information
- [ ] Search functionality
- [ ] Bookmark system
- [ ] Data export/backup
- [ ] Dark mode full implementation

## 🔐 Security & Privacy

### Encryption
- **Master Key**: 256-bit AES encryption key stored in device keychain
- **Database**: SQLite database with SQLCipher encryption
- **Field-Level**: Additional encryption for journal content
- **Zero-Knowledge**: Server never has access to decryption keys

### Biometric Authentication
- Face ID support on iOS
- Fingerprint/Face unlock on Android
- Passcode fallback option
- Configurable auto-lock timeout

### Privacy Guarantees
- ✅ All data stored locally on device
- ✅ No cloud sync (optional in future with E2E encryption)
- ✅ No analytics or tracking
- ✅ No third-party SDKs
- ✅ No internet required for core functionality
- ✅ Open source for community audit

## 🌍 Localization

### Supported Languages
- **English** (Primary)
- **Bengali** (বাংলা) - Coming soon
- **Arabic** (العربية) - For Islamic content

### RTL Support
- Full right-to-left layout for Arabic text
- Bidirectional text handling
- Arabic typography optimizations

## 🎯 Roadmap

### Phase 1: MVP (Current)
- Core journal functionality
- Basic 99 Names library
- Onboarding and settings
- Encryption and security

### Phase 2: Enhancement (Next)
- Complete 99 Names data
- Bengali localization
- NLP Companion suggestions
- Spaced Repetition System
- Full dark mode

### Phase 3: Library Expansion
- Complete Quran integration
- Multiple Hadith collections
- Tafsir content
- Advanced search

### Phase 4: Advanced Features
- Voice journaling
- Quran word-by-word analysis
- Visual connection maps
- Advanced analytics
- Optional encrypted cloud backup

### Phase 5: Community (Long-term)
- Family mode (privacy-preserved)
- Educational integration
- Multiple languages
- Platform expansion (iPad, tablet optimization)

## 📖 Islamic Content Sources

All Islamic content is from authentic sources:
- **Quran**: Standard Uthmanic text
- **Translations**: Sahih International, Bengali (upcoming)
- **Hadith**: Sahih Bukhari, Sahih Muslim (with authenticity grades)
- **99 Names**: Scholarly consensus with traditional explanations

Content is reviewed and will be verified by qualified Islamic scholars.

## 🤝 Contributing

This is a faith-based project. Contributions are welcome, especially:
- Islamic content review and verification
- Bengali translations
- Accessibility improvements
- Bug fixes and performance optimizations
- UI/UX enhancements

## 📄 License

This project is intended to be open source (license TBD). The goal is to make it freely available for the benefit of the Muslim community worldwide.

## 🙏 Acknowledgments

<div dir="rtl">
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
</div>

*All praise is due to Allah, Lord of all the worlds.*

This app is built with the intention of helping Muslims strengthen their connection with Allah. May it be a means of benefit for all who use it.

## 📞 Contact & Support

For questions, suggestions, or Islamic content review:
- GitHub Issues: [Report bugs or request features]
- Email: [Coming soon]

---

<div dir="rtl">
رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
</div>

*"Our Lord, accept this from us. Indeed You are the Hearing, the Knowing."* - Quran 2:127

**Built with ❤️ for the Muslim Ummah**
