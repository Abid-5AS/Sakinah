# Testing Strategy

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Testing Philosophy](#testing-philosophy)
2. [Testing Pyramid](#testing-pyramid)
3. [Unit Testing](#unit-testing)
4. [Integration Testing](#integration-testing)
5. [UI Testing](#ui-testing)
6. [Security Testing](#security-testing)
7. [Performance Testing](#performance-testing)
8. [Accessibility Testing](#accessibility-testing)
9. [Content Integrity Testing](#content-integrity-testing)
10. [Beta Testing](#beta-testing)
11. [CI/CD Pipeline](#cicd-pipeline)

## Testing Philosophy

### Goals

1. **Quality Assurance**: Deliver bug-free app to users
2. **Confidence**: Deploy with confidence
3. **Regression Prevention**: Catch bugs before they reach production
4. **Documentation**: Tests serve as living documentation
5. **Refactoring Safety**: Change code without fear

### Principles

- **Test-Driven Development (TDD)** where appropriate
- **Write tests first** for critical functionality
- **Automate everything** that can be automated
- **Fast feedback** - tests should run quickly
- **Reliable tests** - no flaky tests
- **Maintainable tests** - clean, readable test code

### Coverage Goals

- **Overall**: 80%+ code coverage
- **Critical paths**: 100% coverage (encryption, database, authentication)
- **UI**: Core user journeys tested
- **Edge cases**: Comprehensive coverage

---

## Testing Pyramid

```
                    ▲
                   /│\
                  / │ \
                 /  │  \
                / E2E  \          10% - End-to-End Tests
               /  Tests \
              /──────────\
             /            \
            /  Integration \       30% - Integration Tests
           /     Tests      \
          /──────────────────\
         /                    \
        /     Unit Tests       \   60% - Unit Tests
       /________________________\
```

### Breakdown

| Test Type | Percentage | Speed | Scope | Reliability |
|-----------|-----------|-------|-------|-------------|
| Unit | 60% | Fast (ms) | Single function/class | High |
| Integration | 30% | Medium (seconds) | Multiple components | Medium |
| E2E / UI | 10% | Slow (minutes) | Full user flow | Lower |

---

## Unit Testing

### Scope

Test individual functions, methods, and classes in isolation.

### Android (Kotlin)

#### Framework
- **JUnit 5** for test structure
- **MockK** for mocking
- **Truth** for assertions
- **Turbine** for Flow testing

#### Example: Repository Test

```kotlin
@Test
fun `createJournalEntry encrypts content and saves to database`() = runTest {
    // Given
    val plainEntry = JournalEntry(
        id = 0,
        content = "My private thoughts",
        createdAt = System.currentTimeMillis()
    )
    val encryptedContent = "encrypted_content_xyz"

    coEvery {
        encryptionService.encrypt(plainEntry.content)
    } returns encryptedContent

    coEvery {
        journalDao.insert(any())
    } returns 1L

    // When
    val result = journalRepository.createEntry(plainEntry)

    // Then
    assertThat(result.isSuccess).isTrue()
    assertThat(result.getOrNull()).isEqualTo(1L)

    coVerify {
        encryptionService.encrypt(plainEntry.content)
        journalDao.insert(match {
            it.content == encryptedContent
        })
    }
}

@Test
fun `getEntries decrypts content correctly`() = runTest {
    // Given
    val encryptedEntity = JournalEntryEntity(
        id = 1,
        content = "encrypted_xyz",
        createdAt = 1000L
    )
    val decryptedContent = "My private thoughts"

    coEvery {
        journalDao.getAllEntries()
    } returns flowOf(listOf(encryptedEntity))

    coEvery {
        encryptionService.decrypt(encryptedEntity.content)
    } returns decryptedContent

    // When
    val entries = journalRepository.getEntries().first()

    // Then
    assertThat(entries).hasSize(1)
    assertThat(entries[0].content).isEqualTo(decryptedContent)
}
```

#### Example: ViewModel Test

```kotlin
@Test
fun `createEntry success updates state`() = runTest {
    // Given
    val content = "Journal entry content"
    coEvery {
        createJournalEntryUseCase(any())
    } returns Result.success(1L)

    // When
    viewModel.onContentChanged(content)
    viewModel.onSaveClicked()

    // Then
    assertThat(viewModel.state.value).isEqualTo(
        JournalState.Success(entryId = 1L)
    )
    assertThat(viewModel.state.value.isLoading).isFalse()
}

@Test
fun `createEntry failure shows error`() = runTest {
    // Given
    val error = Exception("Save failed")
    coEvery {
        createJournalEntryUseCase(any())
    } returns Result.failure(error)

    // When
    viewModel.onSaveClicked()

    // Then
    assertThat(viewModel.state.value).isInstanceOf(JournalState.Error::class.java)
    assertThat((viewModel.state.value as JournalState.Error).message)
        .isEqualTo("Save failed")
}
```

### iOS (Swift)

#### Framework
- **XCTest** for test structure
- **Swift Testing** (new framework) for modern syntax
- **Combine** testing utilities

#### Example: Repository Test

```swift
func testCreateJournalEntryEncryptsAndSaves() async throws {
    // Given
    let plainEntry = JournalEntry(
        id: 0,
        content: "My private thoughts",
        createdAt: Date()
    )
    let encryptedContent = "encrypted_content_xyz"

    mockEncryptionService.encryptResult = encryptedContent
    mockCoreDataStack.insertResult = 1

    // When
    let result = try await journalRepository.createEntry(plainEntry)

    // Then
    XCTAssertEqual(result, 1)
    XCTAssertTrue(mockEncryptionService.encryptCalled)
    XCTAssertEqual(mockEncryptionService.lastEncryptedString, plainEntry.content)
    XCTAssertTrue(mockCoreDataStack.insertCalled)
}

func testGetEntriesDecryptsContent() async throws {
    // Given
    let encryptedEntity = JournalEntryEntity()
    encryptedEntity.content = "encrypted_xyz"
    encryptedEntity.createdAt = Date()

    mockCoreDataStack.fetchResult = [encryptedEntity]
    mockEncryptionService.decryptResult = "My private thoughts"

    // When
    let entries = try await journalRepository.getEntries()

    // Then
    XCTAssertEqual(entries.count, 1)
    XCTAssertEqual(entries[0].content, "My private thoughts")
}
```

### Unit Test Coverage

**Must Have 100% Coverage**:
- [ ] Encryption/Decryption functions
- [ ] Database repositories
- [ ] Use cases / Business logic
- [ ] Authentication logic
- [ ] NLP analysis algorithms

**Should Have 80%+ Coverage**:
- [ ] ViewModels / View logic
- [ ] Utility functions
- [ ] Extensions
- [ ] Formatters

---

## Integration Testing

### Scope

Test multiple components working together.

### Database Integration Tests

#### Android Example

```kotlin
@RunWith(AndroidJUnit4::class)
class JournalDatabaseIntegrationTest {

    private lateinit var database: SakinahDatabase
    private lateinit var journalDao: JournalDao

    @Before
    fun setup() {
        // Use in-memory database for tests
        database = Room.inMemoryDatabaseBuilder(
            ApplicationProvider.getApplicationContext(),
            SakinahDatabase::class.java
        )
            .allowMainThreadQueries()
            .build()

        journalDao = database.journalDao()
    }

    @After
    fun tearDown() {
        database.close()
    }

    @Test
    fun insertAndRetrieveEntry() = runTest {
        // Given
        val entry = JournalEntryEntity(
            id = 0,
            content = "Test content",
            createdAt = System.currentTimeMillis()
        )

        // When
        val id = journalDao.insert(entry)
        val retrieved = journalDao.getEntryById(id)

        // Then
        assertThat(retrieved).isNotNull()
        assertThat(retrieved?.content).isEqualTo("Test content")
    }

    @Test
    fun fullTextSearch() = runTest {
        // Given
        journalDao.insert(JournalEntryEntity(
            content = "Feeling grateful today",
            createdAt = System.currentTimeMillis()
        ))
        journalDao.insert(JournalEntryEntity(
            content = "Worried about exam",
            createdAt = System.currentTimeMillis()
        ))

        // When
        val results = journalDao.search("grateful").first()

        // Then
        assertThat(results).hasSize(1)
        assertThat(results[0].content).contains("grateful")
    }
}
```

### Repository + DAO Integration

```kotlin
@Test
fun `end-to-end journal entry lifecycle`() = runTest {
    // Create
    val entry = JournalEntry(
        content = "Integration test entry",
        createdAt = System.currentTimeMillis()
    )
    val id = repository.createEntry(entry).getOrThrow()

    // Read
    val retrieved = repository.getEntryById(id).first()
    assertThat(retrieved?.content).isEqualTo("Integration test entry")

    // Update
    val updated = retrieved?.copy(content = "Updated content")
    repository.updateEntry(updated!!).getOrThrow()
    val afterUpdate = repository.getEntryById(id).first()
    assertThat(afterUpdate?.content).isEqualTo("Updated content")

    // Delete
    repository.deleteEntry(id).getOrThrow()
    val afterDelete = repository.getEntryById(id).first()
    assertThat(afterDelete).isNull()
}
```

---

## UI Testing

### Scope

Test complete user flows from UI perspective.

### Android (Compose UI Tests)

#### Framework
- **Compose Testing Library**
- **Espresso** (for non-Compose views)
- **UI Automator** (for system interactions)

#### Example: Journal Entry Creation Flow

```kotlin
@RunWith(AndroidJUnit4::class)
class JournalEntryCreationTest {

    @get:Rule
    val composeTestRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun createJournalEntry_success() {
        // Navigate to journal
        composeTestRule.onNodeWithTag("tab_journal").performClick()

        // Click FAB to create new entry
        composeTestRule.onNodeWithTag("fab_new_entry").performClick()

        // Enter content
        composeTestRule
            .onNodeWithTag("journal_editor")
            .performTextInput("Today I learned about patience")

        // Save entry
        composeTestRule.onNodeWithTag("btn_save").performClick()

        // Verify success
        composeTestRule
            .onNodeWithText("Entry saved")
            .assertIsDisplayed()

        // Verify entry appears in list
        composeTestRule
            .onNodeWithText("Today I learned about patience", substring = true)
            .assertIsDisplayed()
    }

    @Test
    fun biometricAuthentication_required() {
        // Start app
        // App should show biometric prompt

        composeTestRule
            .onNodeWithText("Unlock Sakinah")
            .assertIsDisplayed()

        // Journal content should not be visible
        composeTestRule
            .onNodeWithTag("journal_list")
            .assertDoesNotExist()
    }
}
```

### iOS (SwiftUI Tests)

#### Framework
- **XCTest UI Testing**

#### Example: Journal Entry Creation Flow

```swift
class JournalEntryCreationUITest: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()
    }

    func testCreateJournalEntry_Success() throws {
        // Navigate to journal tab
        app.tabBars.buttons["Journal"].tap()

        // Tap new entry button
        app.buttons["newEntryButton"].tap()

        // Enter content
        let textView = app.textViews["journalEditor"]
        textView.tap()
        textView.typeText("Today I learned about patience")

        // Save entry
        app.buttons["saveButton"].tap()

        // Verify success message
        XCTAssertTrue(app.staticTexts["Entry saved"].exists)

        // Verify entry appears in list
        let entryCell = app.staticTexts["Today I learned about patience"]
        XCTAssertTrue(entryCell.waitForExistence(timeout: 2))
    }

    func testBiometricAuthentication_Required() throws {
        // App should show biometric prompt
        XCTAssertTrue(app.staticTexts["Unlock Sakinah"].exists)

        // Journal content should not be visible
        XCTAssertFalse(app.tables["journalList"].exists)
    }
}
```

### Critical User Journeys to Test

1. **Onboarding Flow**
   - [ ] Welcome screens
   - [ ] Language selection
   - [ ] Security setup (biometric/passcode)

2. **Authentication Flow**
   - [ ] Biometric authentication success
   - [ ] Biometric authentication failure → passcode fallback
   - [ ] Auto-lock after timeout

3. **Journal Flow**
   - [ ] Create new entry
   - [ ] Edit existing entry
   - [ ] Delete entry
   - [ ] Search entries

4. **Library Flow**
   - [ ] Browse Quran
   - [ ] Search verses
   - [ ] Bookmark content
   - [ ] View hadith with grading

5. **Learning Flow**
   - [ ] Study flashcards
   - [ ] Mark Name as memorized
   - [ ] View progress

6. **Companion Flow**
   - [ ] View suggestions for journal entry
   - [ ] Navigate to suggested content in Library
   - [ ] Provide feedback on suggestion

---

## Security Testing

### Scope

Verify security and privacy implementations.

### Encryption Tests

```kotlin
@Test
fun `encryption produces different ciphertext each time`() {
    val plaintext = "Same content"
    val key = generateTestKey()

    val encrypted1 = EncryptionService.encrypt(plaintext, key)
    val encrypted2 = EncryptionService.encrypt(plaintext, key)

    assertThat(encrypted1).isNotEqualTo(encrypted2) // Different IVs
}

@Test
fun `tampered ciphertext fails decryption`() {
    val plaintext = "Original content"
    val key = generateTestKey()

    val encrypted = EncryptionService.encrypt(plaintext, key)
    val tampered = encrypted.dropLast(5) + "XXXXX"

    assertThrows<GeneralSecurityException> {
        EncryptionService.decrypt(tampered, key)
    }
}

@Test
fun `wrong key fails decryption`() {
    val plaintext = "Secret content"
    val key1 = generateTestKey()
    val key2 = generateTestKey()

    val encrypted = EncryptionService.encrypt(plaintext, key1)

    assertThrows<GeneralSecurityException> {
        EncryptionService.decrypt(encrypted, key2)
    }
}
```

### Security Audit Checklist

- [ ] All sensitive data encrypted at rest
- [ ] No sensitive data in logs
- [ ] No hardcoded secrets or keys
- [ ] Biometric authentication working
- [ ] Auto-lock functional
- [ ] Screenshots blocked on sensitive screens
- [ ] Memory cleared after sensitive operations
- [ ] SQL injection not possible (parameterized queries)

---

## Performance Testing

### Metrics

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| App Launch Time | < 2s | < 3s |
| Journal Entry Load | < 500ms | < 1s |
| Search Results | < 1s | < 2s |
| Encryption/Decryption | < 100ms | < 200ms |
| Database Query | < 100ms | < 300ms |

### Performance Tests

```kotlin
@Test
fun `app launches within 2 seconds`() {
    val startTime = System.currentTimeMillis()

    // Launch app
    val intent = Intent(context, MainActivity::class.java)
    context.startActivity(intent)

    // Wait for first frame
    idlingRegistry.wait()

    val launchTime = System.currentTimeMillis() - startTime

    assertThat(launchTime).isLessThan(2000)
}

@Test
fun `load 1000 journal entries within 500ms`() = runTest {
    // Given
    repeat(1000) { i ->
        database.journalDao().insert(
            JournalEntryEntity(
                content = "Entry $i",
                createdAt = System.currentTimeMillis()
            )
        )
    }

    // When
    val startTime = System.currentTimeMillis()
    val entries = repository.getEntries().first()
    val loadTime = System.currentTimeMillis() - startTime

    // Then
    assertThat(loadTime).isLessThan(500)
    assertThat(entries).hasSize(1000)
}
```

### Memory Profiling

- Profile app with Android Profiler / Xcode Instruments
- Check for memory leaks
- Monitor memory usage during extended sessions
- Test on low-end devices (2GB RAM)

---

## Accessibility Testing

### Automated Tests

```kotlin
@Test
fun `all interactive elements have content descriptions`() {
    composeTestRule.onAllNodes(hasClickAction())
        .assertAll(hasContentDescription())
}

@Test
fun `text scales correctly with large font`() {
    composeTestRule.activity.setFontScale(2.0f)

    composeTestRule.onNodeWithTag("journal_entry")
        .assertExists()
        .assertIsDisplayed()
}
```

### Manual Accessibility Checklist

- [ ] TalkBack (Android) / VoiceOver (iOS) navigation works
- [ ] All images have content descriptions
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets minimum 48dp
- [ ] Text scales up to 200%
- [ ] Dark mode supported
- [ ] Reduce motion respected

---

## Content Integrity Testing

### Quran Verification Tests

```kotlin
@Test
fun `quran has exactly 6236 verses`() {
    val totalVerses = database.quranDao().getTotalVerseCount()
    assertThat(totalVerses).isEqualTo(6236)
}

@Test
fun `all surahs have correct verse counts`() {
    val EXPECTED_VERSE_COUNTS = mapOf(
        1 to 7,   // Al-Fatihah
        2 to 286, // Al-Baqarah
        // ... all 114 surahs
        114 to 6  // An-Nas
    )

    EXPECTED_VERSE_COUNTS.forEach { (surahNumber, expectedCount) ->
        val actualCount = database.quranDao()
            .getVerseCountForSurah(surahNumber)
        assertThat(actualCount).isEqualTo(expectedCount)
    }
}

@Test
fun `no missing verses in database`() {
    for (surahNum in 1..114) {
        val verseCount = SURAH_VERSE_COUNTS[surahNum]!!
        for (verseNum in 1..verseCount) {
            val verse = database.quranDao()
                .getVerse(surahNum, verseNum)
            assertThat(verse).isNotNull()
        }
    }
}
```

### Hadith Verification Tests

```kotlin
@Test
fun `all hadith have authenticity grading`() {
    val ungradedHadith = database.hadithDao()
        .getHadithWithoutGrade()

    assertThat(ungradedHadith).isEmpty()
}

@Test
fun `no fabricated hadith in database`() {
    val fabricated = database.hadithDao()
        .getHadithByGrade("Mawdu")

    assertThat(fabricated).isEmpty()
}
```

---

## Beta Testing

### Beta Testing Plan

#### Phase 1: Internal Alpha (Week 17-18)
- **Testers**: Development team + 2-3 close friends
- **Focus**: Critical bugs, crash prevention
- **Tools**: Firebase Crashlytics, TestFlight Internal, Play Internal Testing

#### Phase 2: Closed Beta (Week 19-20)
- **Testers**: 20-30 Bangladeshi Muslims
- **Criteria**:
  - Diverse age groups (18-45)
  - Mix of tech proficiency
  - Android and iOS users
  - Practicing Muslims
- **Focus**: UX feedback, content accuracy, real-world usage
- **Tools**: TestFlight External, Play Open Beta

### Beta Testing Feedback

**Feedback Form**:
```
1. Overall Experience (1-5 stars)
2. Ease of Use (1-5 stars)
3. Feature Requests
4. Bug Reports
5. Content Accuracy Concerns
6. What did you like most?
7. What needs improvement?
8. Would you recommend to a friend?
```

**Metrics to Track**:
- Crash rate
- Feature usage
- Session length
- Retention rate
- Number of journal entries created

---

## CI/CD Pipeline

### Continuous Integration

```yaml
# .github/workflows/android-ci.yml

name: Android CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Run Unit Tests
      run: ./gradlew testDebugUnitTest

    - name: Run Lint
      run: ./gradlew lintDebug

    - name: Upload Test Reports
      uses: actions/upload-artifact@v3
      with:
        name: test-reports
        path: app/build/reports/

    - name: Check Code Coverage
      run: ./gradlew jacocoTestReport
```

```yaml
# .github/workflows/ios-ci.yml

name: iOS CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: macos-latest

    steps:
    - uses: actions/checkout@v3

    - name: Select Xcode Version
      run: sudo xcode-select -s /Applications/Xcode_15.0.app

    - name: Run Tests
      run: |
        xcodebuild test \
          -workspace Sakinah.xcworkspace \
          -scheme Sakinah \
          -destination 'platform=iOS Simulator,name=iPhone 15,OS=17.0'

    - name: Upload Test Results
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: build/reports/
```

### Pre-Release Checklist

- [ ] All CI/CD tests passing
- [ ] Code coverage > 80%
- [ ] No critical or high-severity bugs
- [ ] Performance tests passed
- [ ] Security audit completed
- [ ] Accessibility tests passed
- [ ] Content integrity verified
- [ ] Beta testing feedback addressed
- [ ] Release notes prepared

---

<div dir="rtl">
رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً
</div>

*"Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy."* - Quran 3:8
