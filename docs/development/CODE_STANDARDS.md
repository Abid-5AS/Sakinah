# Code Standards

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [General Principles](#general-principles)
2. [Kotlin (Android) Standards](#kotlin-android-standards)
3. [Swift (iOS) Standards](#swift-ios-standards)
4. [Architecture Standards](#architecture-standards)
5. [Naming Conventions](#naming-conventions)
6. [Documentation Standards](#documentation-standards)
7. [Git Workflow](#git-workflow)
8. [Code Review Guidelines](#code-review-guidelines)

## General Principles

### Clean Code Principles

1. **Readability First**
   - Code is read more than it's written
   - Optimize for the reader, not the writer
   - Self-documenting code > excessive comments

2. **SOLID Principles**
   - **S**ingle Responsibility Principle
   - **O**pen/Closed Principle
   - **L**iskov Substitution Principle
   - **I**nterface Segregation Principle
   - **D**ependency Inversion Principle

3. **DRY (Don't Repeat Yourself)**
   - Extract common logic into reusable functions
   - But don't over-abstract prematurely

4. **KISS (Keep It Simple, Stupid)**
   - Prefer simple solutions over clever ones
   - Complexity is the enemy of security and maintainability

5. **YAGNI (You Aren't Gonna Need It)**
   - Don't write code for future hypothetical needs
   - Solve today's problems today

### Code Quality Metrics

- **Cyclomatic Complexity**: Max 10 per function
- **Function Length**: Max 50 lines (prefer < 25)
- **Class Length**: Max 300 lines (prefer < 150)
- **File Length**: Max 500 lines (prefer < 300)
- **Parameter Count**: Max 5 parameters (prefer < 3)

---

## Kotlin (Android) Standards

### Style Guide

Follow [Official Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html) with these additions:

### Naming Conventions

```kotlin
// Classes and Objects: PascalCase
class JournalRepository

// Functions and Variables: camelCase
fun createEntry()
val userName: String

// Constants: UPPER_SNAKE_CASE
const val MAX_ENTRY_LENGTH = 10_000

// Private properties: prefixed with underscore (optional)
private val _state = MutableStateFlow<State>(State.Initial)

// Files: PascalCase matching primary class
// JournalRepository.kt

// Packages: lowercase, no underscores
package com.sakinah.journal.domain
```

### Code Organization

```kotlin
class ExampleClass {
    // 1. Companion object
    companion object {
        const val TAG = "ExampleClass"
    }

    // 2. Properties
    private val dependency: Dependency

    // 3. Init blocks
    init {
        // Initialization
    }

    // 4. Public methods
    fun publicMethod() { }

    // 5. Private methods
    private fun privateMethod() { }

    // 6. Nested classes/interfaces
    data class InnerData(val value: String)
}
```

### Functional Style

```kotlin
// ✅ Good: Functional, immutable
val activeEntries = entries.filter { !it.isArchived }
    .sortedByDescending { it.createdAt }
    .take(10)

// ❌ Avoid: Imperative, mutable
val activeEntries = mutableListOf<Entry>()
for (entry in entries) {
    if (!entry.isArchived) {
        activeEntries.add(entry)
    }
}
activeEntries.sortByDescending { it.createdAt }
```

### Null Safety

```kotlin
// ✅ Good: Use safe calls and Elvis operator
val length = text?.length ?: 0

// ✅ Good: Early return for null
fun process(entry: Entry?) {
    val validEntry = entry ?: return
    // Work with validEntry (non-null)
}

// ❌ Avoid: Force unwrapping (!! operator)
val length = text!!.length  // Can crash
```

### Coroutines

```kotlin
// ✅ Good: Structured concurrency
class JournalViewModel @Inject constructor(
    private val repository: JournalRepository
) : ViewModel() {

    fun loadEntries() {
        viewModelScope.launch {
            try {
                val entries = repository.getEntries().first()
                _state.value = State.Success(entries)
            } catch (e: Exception) {
                _state.value = State.Error(e.message)
            }
        }
    }
}

// ✅ Good: Use Flow for streams
fun observeEntries(): Flow<List<Entry>> = flow {
    repository.getEntries().collect { entries ->
        emit(entries)
    }
}

// ❌ Avoid: GlobalScope
GlobalScope.launch {  // Don't do this
    // Work
}
```

### Compose UI

```kotlin
// ✅ Good: Composable naming
@Composable
fun JournalEntryCard(
    entry: JournalEntry,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.clickable(onClick = onClick),
        // ...
    ) {
        // Content
    }
}

// ✅ Good: State hoisting
@Composable
fun JournalEditor(
    content: String,
    onContentChange: (String) -> Unit
) {
    TextField(
        value = content,
        onValueChange = onContentChange
    )
}

// ✅ Good: remember for stateful composables
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

### Resource IDs

```kotlin
// Use descriptive test tags for Compose UI testing
Text(
    text = "Journal Entry",
    modifier = Modifier.testTag("journal_entry_text")
)
```

### Dependency Injection (Hilt)

```kotlin
// Module organization
@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(
        @ApplicationContext context: Context
    ): SakinahDatabase {
        return Room.databaseBuilder(
            context,
            SakinahDatabase::class.java,
            "sakinah_db"
        ).build()
    }

    @Provides
    fun provideJournalDao(
        database: SakinahDatabase
    ): JournalDao = database.journalDao()
}

// Inject in ViewModel
@HiltViewModel
class JournalViewModel @Inject constructor(
    private val repository: JournalRepository
) : ViewModel()
```

### Error Handling

```kotlin
// ✅ Good: Use Result type for operations that can fail
suspend fun createEntry(entry: Entry): Result<Long> {
    return try {
        val id = dao.insert(entry)
        Result.success(id)
    } catch (e: Exception) {
        Log.e(TAG, "Failed to create entry", e)
        Result.failure(e)
    }
}

// ✅ Good: Sealed classes for state
sealed class State {
    object Loading : State()
    data class Success(val data: List<Entry>) : State()
    data class Error(val message: String) : State()
}
```

---

## Swift (iOS) Standards

### Style Guide

Follow [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/) with these additions:

### Naming Conventions

```swift
// Classes, Structs, Enums, Protocols: PascalCase
class JournalRepository
struct JournalEntry
enum State
protocol JournalRepositoryProtocol

// Functions, Variables, Parameters: camelCase
func createEntry()
let userName: String

// Constants: camelCase (not UPPER_CASE in Swift)
let maxEntryLength = 10_000

// Booleans: Use "is", "has", "can" prefixes
let isActive: Bool
let hasContent: Bool
let canEdit: Bool

// Files: PascalCase matching primary type
// JournalRepository.swift
```

### Code Organization

```swift
// MARK: - for organization
class JournalViewModel: ObservableObject {

    // MARK: - Properties

    @Published var entries: [JournalEntry] = []
    private let repository: JournalRepository

    // MARK: - Initialization

    init(repository: JournalRepository) {
        self.repository = repository
    }

    // MARK: - Public Methods

    func loadEntries() async {
        // Implementation
    }

    // MARK: - Private Methods

    private func processEntry(_ entry: JournalEntry) {
        // Implementation
    }
}
```

### Swift Concurrency

```swift
// ✅ Good: Use async/await
class JournalRepository {

    func fetchEntries() async throws -> [JournalEntry] {
        let entities = try await coreDataStack.fetch()
        return entities.map { $0.toDomain() }
    }

    func createEntry(_ entry: JournalEntry) async throws -> Int64 {
        let context = coreDataStack.newBackgroundContext()
        return try await context.perform {
            let entity = JournalEntryEntity(context: context)
            entity.configure(from: entry)
            try context.save()
            return entity.id
        }
    }
}

// ✅ Good: Use Task for launching async work
struct JournalListView: View {
    @StateObject var viewModel: JournalViewModel

    var body: some View {
        List(viewModel.entries) { entry in
            EntryRow(entry: entry)
        }
        .task {
            await viewModel.loadEntries()
        }
    }
}

// ✅ Good: Actor for thread-safe state
actor Counter {
    private var value = 0

    func increment() -> Int {
        value += 1
        return value
    }
}
```

### Optionals

```swift
// ✅ Good: Use optional binding
if let entry = getEntry(id: 1) {
    display(entry)
}

// ✅ Good: Guard for early returns
func process(entry: JournalEntry?) {
    guard let entry = entry else { return }
    // Work with unwrapped entry
}

// ✅ Good: Nil coalescing
let length = text?.count ?? 0

// ✅ Good: Optional chaining
let firstWord = entry?.content.components(separatedBy: " ").first

// ❌ Avoid: Force unwrapping
let entry = getEntry(id: 1)!  // Can crash
```

### SwiftUI

```swift
// ✅ Good: View naming
struct JournalEntryCard: View {
    let entry: JournalEntry
    let onTap: () -> Void

    var body: some View {
        // Implementation
    }
}

// ✅ Good: State management
struct JournalEditorView: View {
    @State private var content: String = ""
    @StateObject private var viewModel: JournalViewModel

    var body: some View {
        TextEditor(text: $content)
            .onChange(of: content) { newValue in
                viewModel.updateContent(newValue)
            }
    }
}

// ✅ Good: ViewBuilder for reusable components
@ViewBuilder
func entryStatusBadge(for entry: JournalEntry) -> some View {
    if entry.isFavorite {
        Image(systemName: "star.fill")
            .foregroundColor(.yellow)
    }
}

// ✅ Good: Extract complex views
struct JournalListView: View {
    var body: some View {
        List {
            ForEach(entries) { entry in
                EntryRow(entry: entry)  // Extracted
            }
        }
    }
}

private struct EntryRow: View {
    let entry: JournalEntry

    var body: some View {
        // Complex row layout
    }
}
```

### Property Wrappers

```swift
// SwiftUI property wrappers
@State           // Local view state
@Binding         // Two-way binding
@StateObject     // Observable object owned by view
@ObservedObject  // Observable object passed from parent
@EnvironmentObject // Shared observable object
@Environment     // System environment values

// Combine
@Published       // Publishes changes in ObservableObject
```

### Error Handling

```swift
// ✅ Good: Use Result type
func createEntry(_ entry: JournalEntry) -> Result<Int64, Error> {
    do {
        let id = try database.insert(entry)
        return .success(id)
    } catch {
        logger.error("Failed to create entry: \(error)")
        return .failure(error)
    }
}

// ✅ Good: Async throws
func fetchEntries() async throws -> [JournalEntry] {
    let data = try await database.fetch()
    return data.map { $0.toDomain() }
}

// ✅ Good: Custom errors
enum JournalError: LocalizedError {
    case entryNotFound
    case encryptionFailed
    case databaseError(Error)

    var errorDescription: String? {
        switch self {
        case .entryNotFound:
            return "Journal entry not found"
        case .encryptionFailed:
            return "Failed to encrypt entry"
        case .databaseError(let error):
            return "Database error: \(error.localizedDescription)"
        }
    }
}
```

### Memory Management

```swift
// ✅ Good: Weak references to avoid retain cycles
class JournalViewModel {
    private weak var coordinator: Coordinator?

    init(coordinator: Coordinator) {
        self.coordinator = coordinator
    }
}

// ✅ Good: Capture lists in closures
class DataLoader {
    func loadData(completion: @escaping () -> Void) {
        networkManager.fetch { [weak self] data in
            self?.process(data)
            completion()
        }
    }
}

// ✅ Good: Use unowned when object lifecycle is guaranteed
class Child {
    unowned let parent: Parent

    init(parent: Parent) {
        self.parent = parent
    }
}
```

---

## Architecture Standards

### Clean Architecture Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer               │
│  (ViewModels, Views, UI Logic)          │
└──────────────┬──────────────────────────┘
               │ depends on
┌──────────────▼──────────────────────────┐
│           Domain Layer                   │
│  (Use Cases, Domain Models, Interfaces) │
└──────────────┬──────────────────────────┘
               │ depends on
┌──────────────▼──────────────────────────┐
│            Data Layer                    │
│  (Repositories, Data Sources, Entities) │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

#### Presentation Layer
- UI components (Composables / SwiftUI Views)
- ViewModels / Presenters
- UI state management
- User input handling
- **Dependencies**: Domain layer only

#### Domain Layer
- Business logic (Use Cases)
- Domain models (pure, no framework dependencies)
- Repository interfaces
- **Dependencies**: None (pure Kotlin/Swift)

#### Data Layer
- Repository implementations
- Data sources (Database, Network)
- Data entities (Room entities, Core Data models)
- Mappers (Entity ↔ Domain Model)
- **Dependencies**: Domain layer

### Dependency Rule

**Outer layers depend on inner layers, never the reverse.**

```kotlin
// ✅ Good: Presentation depends on Domain
class JournalViewModel(
    private val getEntriesUseCase: GetEntriesUseCase  // Domain
)

// ❌ Bad: Domain depends on Presentation
class GetEntriesUseCase(
    private val viewModel: JournalViewModel  // Wrong direction
)
```

### Use Case Pattern

```kotlin
// ✅ Good: Single Responsibility Use Case
class CreateJournalEntryUseCase @Inject constructor(
    private val repository: JournalRepository
) {
    suspend operator fun invoke(content: String): Result<Long> {
        // Validation
        if (content.isBlank()) {
            return Result.failure(Exception("Content cannot be empty"))
        }

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

```swift
// ✅ Good: Swift Use Case
struct CreateJournalEntryUseCase {
    private let repository: JournalRepositoryProtocol

    init(repository: JournalRepositoryProtocol) {
        self.repository = repository
    }

    func execute(content: String) async throws -> Int64 {
        // Validation
        guard !content.isEmpty else {
            throw JournalError.emptyContent
        }

        // Business logic
        let entry = JournalEntry(
            content: content,
            createdAt: Date()
        )

        // Delegate to repository
        return try await repository.createEntry(entry)
    }
}
```

---

## Naming Conventions

### Files and Folders

```
✅ Good Structure:
src/main/java/com/sakinah/
├── data/
│   ├── local/
│   │   ├── dao/
│   │   │   └── JournalDao.kt
│   │   ├── entity/
│   │   │   └── JournalEntryEntity.kt
│   │   └── SakinahDatabase.kt
│   └── repository/
│       └── JournalRepositoryImpl.kt
├── domain/
│   ├── model/
│   │   └── JournalEntry.kt
│   ├── repository/
│   │   └── JournalRepository.kt
│   └── usecase/
│       └── CreateJournalEntryUseCase.kt
└── presentation/
    └── journal/
        ├── JournalViewModel.kt
        └── JournalScreen.kt
```

### Variable Naming

```kotlin
// ✅ Good: Descriptive names
val journalEntries = repository.getEntries()
val encryptedContent = encrypt(plaintext)
val isAuthenticated = checkAuth()

// ❌ Bad: Abbreviations, unclear
val je = repository.getEntries()
val ec = encrypt(plaintext)
val auth = checkAuth()

// ✅ Good: Boolean names
val isLoading: Boolean
val hasContent: Boolean
val canEdit: Boolean

// ❌ Bad: Boolean names
val loading: Boolean  // Unclear
val content: Boolean  // Confusing
val edit: Boolean  // Unclear
```

### Function Naming

```kotlin
// ✅ Good: Verbs for actions
fun createEntry()
fun deleteEntry()
fun validateContent()

// ✅ Good: get/set for accessors
fun getEntry(id: Long)
fun setContent(content: String)

// ✅ Good: is/has/can for boolean returns
fun isValid(): Boolean
fun hasContent(): Boolean
fun canEdit(): Boolean

// ❌ Bad: Noun names for actions
fun entry()  // What does this do?
fun content()  // Get or set?
```

---

## Documentation Standards

### KDoc / Doc Comments

```kotlin
/**
 * Creates a new journal entry with encrypted content.
 *
 * This function encrypts the entry content using AES-256 encryption
 * before storing it in the database.
 *
 * @param entry The journal entry to create (content will be encrypted)
 * @return Result containing the created entry ID on success, or an error
 * @throws EncryptionException if encryption fails
 * @see JournalEntry
 * @see EncryptionService
 */
suspend fun createEntry(entry: JournalEntry): Result<Long>
```

```swift
/// Creates a new journal entry with encrypted content.
///
/// This function encrypts the entry content using AES-256 encryption
/// before storing it in Core Data.
///
/// - Parameter entry: The journal entry to create (content will be encrypted)
/// - Returns: The ID of the created entry
/// - Throws: `JournalError.encryptionFailed` if encryption fails
/// - SeeAlso: `JournalEntry`, `EncryptionService`
func createEntry(_ entry: JournalEntry) async throws -> Int64
```

### When to Write Comments

```kotlin
// ✅ Good: Explain WHY, not WHAT
// Use AES-GCM instead of CBC because we need authenticated encryption
// to detect tampering
val cipher = Cipher.getInstance("AES/GCM/NoPadding")

// ✅ Good: Explain complex algorithms
// SM-2 spaced repetition algorithm
// Ease factor adjustment based on recall difficulty
val newEaseFactor = max(1.3, oldEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

// ✅ Good: Explain non-obvious workarounds
// Workaround for Android 10 scoped storage restrictions
// Must use MediaStore API instead of direct file access
val uri = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)

// ❌ Bad: Stating the obvious
// Increment counter by 1
counter += 1

// ❌ Bad: Commented-out code (use version control instead)
// val oldApproach = doSomething()
val newApproach = doSomethingBetter()
```

### TODO Comments

```kotlin
// TODO(username): Add pagination for large entry lists
// Tracked in: https://github.com/sakinah/issues/42

// FIXME: Encryption is slow on low-end devices
// Need to move to background thread

// HACK: Temporary workaround for Room migration issue
// Remove after upgrading to Room 2.6.0
```

---

## Git Workflow

### Branch Naming

```
main                    # Production-ready code
develop                 # Integration branch

feature/journal-editor  # New features
fix/encryption-bug      # Bug fixes
refactor/clean-arch     # Code refactoring
docs/api-documentation  # Documentation
test/integration-tests  # Test additions
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

#### Examples

```
feat(journal): add biometric authentication

Implement fingerprint and Face ID authentication for app lock.
Users can now secure their journal with biometrics.

Closes #123
```

```
fix(encryption): resolve key derivation issue on Android 10

The PBKDF2 implementation was failing on Android 10 due to
KeyStore API changes. Updated to use the new API.

Fixes #456
```

```
refactor(database): migrate to Clean Architecture

- Extract repository interfaces to domain layer
- Implement repository pattern
- Add use cases for business logic

Breaking change: Repository API has changed
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
- [ ] No sensitive data in commit

## Screenshots (if UI changes)
[Add screenshots here]

## Related Issues
Closes #123
```

---

## Code Review Guidelines

### Reviewer Checklist

#### Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases handled
- [ ] Error handling present
- [ ] No obvious bugs

#### Design
- [ ] Follows Clean Architecture
- [ ] Single Responsibility Principle
- [ ] Appropriate abstractions
- [ ] Not over-engineered

#### Readability
- [ ] Clear naming
- [ ] Appropriate comments
- [ ] No magic numbers
- [ ] Consistent style

#### Security
- [ ] No hardcoded secrets
- [ ] Sensitive data encrypted
- [ ] No SQL injection vulnerabilities
- [ ] Input validation present

#### Performance
- [ ] No obvious performance issues
- [ ] Database queries optimized
- [ ] No memory leaks
- [ ] Appropriate caching

#### Testing
- [ ] Adequate test coverage
- [ ] Tests are meaningful
- [ ] Tests pass
- [ ] No flaky tests

### Review Comments

```kotlin
// ✅ Good: Constructive feedback
// Consider extracting this into a separate function for reusability.
// What do you think about using a sealed class for these states?

// ✅ Good: Ask questions
// Why did you choose this approach over X?
// Have you considered the case where Y is null?

// ✅ Good: Suggest improvements
// Minor: This could be simplified using Kotlin's `let` function
// Nit: Consider renaming this to `isAuthenticated` for clarity

// ❌ Bad: Not constructive
// This is wrong.
// Bad code.
```

---

<div dir="rtl">
رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا
</div>

*"Our Lord, do not impose blame upon us if we forget or make a mistake."* - Quran 2:286

**Remember**: We're all learning. Code reviews are about improving code quality, not criticizing the author. Be kind, be constructive, and assume good intent.
