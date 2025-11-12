# Security & Privacy Implementation

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Security Philosophy](#security-philosophy)
2. [Threat Model](#threat-model)
3. [Encryption Strategy](#encryption-strategy)
4. [Authentication & Authorization](#authentication--authorization)
5. [Data Protection](#data-protection)
6. [Network Security](#network-security)
7. [Privacy Implementation](#privacy-implementation)
8. [Security Best Practices](#security-best-practices)
9. [Incident Response](#incident-response)
10. [Compliance & Auditing](#compliance--auditing)

## Security Philosophy

### Core Principles

1. **Zero-Knowledge Architecture**
   - We never have access to user's journal content
   - All sensitive data encrypted on-device
   - No decryption keys stored on servers (we have no servers!)

2. **Defense in Depth**
   - Multiple layers of security
   - Fail-secure, not fail-open
   - Assume breach, minimize damage

3. **Privacy by Design**
   - Privacy built into architecture, not added later
   - Data minimization
   - User control and transparency

4. **Islamic Ethics**
   - Respect for Sitr (concealment of private matters)
   - Trustworthiness (Amanah)
   - Transparency and honesty

### Security Goals

- **Confidentiality**: Only the user can read their journal
- **Integrity**: Data cannot be tampered with
- **Availability**: User always has access to their data
- **Authenticity**: User can verify app hasn't been modified

---

## Threat Model

### Assets to Protect

1. **Critical Assets**
   - Journal entries (extremely sensitive)
   - User notes and reflections
   - Learning progress
   - Bookmarks (reveal personal interests)

2. **Moderate Assets**
   - App settings
   - Usage statistics (local only)
   - Learning preferences

3. **Public Assets**
   - Quran, Hadith, Names (not sensitive)
   - App UI and code

### Threat Actors

| Actor | Motivation | Capability | Mitigation |
|-------|------------|------------|------------|
| Curious Family Member | See private journal | Physical access to device | Biometric lock, auto-lock timeout |
| Thief | Steal device | Physical access | Encryption at rest, biometric required |
| Malicious App | Read app data | Sandbox escape | OS-level sandboxing, encrypted storage |
| Network Attacker | Intercept data | MitM, packet sniffing | Offline-first (no network) |
| Government | Surveillance | Legal mandate, technical | Can't decrypt without user cooperation |
| Forensics | Extract data | Physical + technical | Encrypted database, secure element storage |

### Attack Vectors & Mitigations

#### 1. Physical Access Attacks
**Threat**: Someone with physical access to device tries to read data

**Mitigations**:
- Biometric authentication required on app launch
- Auto-lock after configurable timeout (default 5 min)
- Encrypted database (SQLCipher)
- Master key in secure enclave (Android KeyStore / iOS Keychain)
- No plaintext data in memory longer than necessary

#### 2. Backup & Export Attacks
**Threat**: User backups (Google Drive, iCloud) expose data

**Mitigations**:
- Exclude sensitive data from automatic backups
- Android: `android:allowBackup="false"` for user DB
- iOS: Set `isExcludedFromBackup` for user DB
- If backup is enabled (future), use separate encryption

#### 3. Screenshot & Screen Recording
**Threat**: Sensitive data captured via screenshots

**Mitigations**:
- Android: `FLAG_SECURE` on journal screens
- iOS: Hide content when app enters background
- Blur effect on app switcher

#### 4. Clipboard Attacks
**Threat**: Clipboard data leaked to other apps

**Mitigations**:
- Clear clipboard after short timeout
- Don't auto-copy sensitive data
- Use secure pasteboard on iOS (UIPasteboard.general.setItems with expiration)

#### 5. Side-Channel Attacks
**Threat**: Timing attacks, power analysis

**Mitigations**:
- Constant-time comparison for sensitive operations
- Use platform-provided crypto libraries (not custom)
- No sensitive data in logs

#### 6. App Tampering
**Threat**: Malicious modification of APK/IPA

**Mitigations**:
- App signing (Play App Signing, Apple code signing)
- SafetyNet / Play Integrity API (Android)
- App Attest (iOS)
- Detect rooted/jailbroken devices (warn user, don't block)

---

## Encryption Strategy

### Overview

```
User's Data Flow:

Plaintext Journal Entry
         ↓
    [Encrypt in Memory]
         ↓
    SQLCipher Database (Encrypted at rest)
         ↓
    Device Storage (Full disk encryption)
         ↓
    Secure Element (Master key protected)
```

### Encryption Stack

| Layer | Technology | Key Size | Purpose |
|-------|-----------|----------|---------|
| Database | SQLCipher | 256-bit AES | Encrypt entire user database |
| Field-Level | AES-GCM | 256-bit | Additional encryption for journal content |
| Key Storage | Android KeyStore / iOS Keychain | - | Store master encryption key |
| Transport | N/A (offline app) | - | No network communication |

### Key Management

#### Master Key Generation (First Launch)

```kotlin
// Android Example
object KeyManager {
    private const val MASTER_KEY_ALIAS = "sakinah_master_key"

    fun generateMasterKey(): SecretKey {
        val keyGenerator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES,
            "AndroidKeyStore"
        )

        val keyGenParameterSpec = KeyGenParameterSpec.Builder(
            MASTER_KEY_ALIAS,
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
        )
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .setKeySize(256)
            .setUserAuthenticationRequired(true)
            .setUserAuthenticationParameters(
                30, // Valid for 30 seconds after auth
                KeyProperties.AUTH_BIOMETRIC_STRONG or KeyProperties.AUTH_DEVICE_CREDENTIAL
            )
            .build()

        keyGenerator.init(keyGenParameterSpec)
        return keyGenerator.generateKey()
    }

    fun getMasterKey(): SecretKey {
        val keyStore = KeyStore.getInstance("AndroidKeyStore")
        keyStore.load(null)
        return keyStore.getKey(MASTER_KEY_ALIAS, null) as SecretKey
    }
}
```

```swift
// iOS Example
class KeyManager {
    private static let masterKeyTag = "com.sakinah.masterkey"

    static func generateMasterKey() throws -> SecKey {
        let access = SecAccessControlCreateWithFlags(
            nil,
            kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
            [.userPresence, .privateKeyUsage],
            nil
        )!

        let attributes: [String: Any] = [
            kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
            kSecAttrKeySizeInBits as String: 256,
            kSecAttrTokenID as String: kSecAttrTokenIDSecureEnclave,
            kSecPrivateKeyAttrs as String: [
                kSecAttrIsPermanent as String: true,
                kSecAttrApplicationTag as String: masterKeyTag,
                kSecAttrAccessControl as String: access
            ]
        ]

        var error: Unmanaged<CFError>?
        guard let privateKey = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else {
            throw error!.takeRetainedValue() as Error
        }

        return privateKey
    }
}
```

#### Database Encryption Key Derivation

```kotlin
// Derive database key from master key
fun deriveDatabaseKey(masterKey: SecretKey, salt: ByteArray): ByteArray {
    val spec = PBEKeySpec(
        masterKey.encoded.toCharArray(),
        salt,
        10000, // iterations
        256 // key length
    )
    val factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
    return factory.generateSecret(spec).encoded
}
```

### Encryption Implementation

#### Field-Level Encryption (Journal Content)

```kotlin
object EncryptionService {
    private const val TRANSFORMATION = "AES/GCM/NoPadding"
    private const val IV_SIZE = 12 // GCM standard
    private const val TAG_SIZE = 128

    fun encrypt(plaintext: String, key: SecretKey): String {
        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.ENCRYPT_MODE, key)

        val iv = cipher.iv
        val ciphertext = cipher.doFinal(plaintext.toByteArray(Charsets.UTF_8))

        // Combine IV + Ciphertext
        val combined = iv + ciphertext
        return Base64.encodeToString(combined, Base64.NO_WRAP)
    }

    fun decrypt(encrypted: String, key: SecretKey): String {
        val combined = Base64.decode(encrypted, Base64.NO_WRAP)

        // Extract IV and ciphertext
        val iv = combined.sliceArray(0 until IV_SIZE)
        val ciphertext = combined.sliceArray(IV_SIZE until combined.size)

        val cipher = Cipher.getInstance(TRANSFORMATION)
        val spec = GCMParameterSpec(TAG_SIZE, iv)
        cipher.init(Cipher.DECRYPT_MODE, key, spec)

        val plaintext = cipher.doFinal(ciphertext)
        return String(plaintext, Charsets.UTF_8)
    }
}
```

### Key Rotation Strategy

```
Initial Launch:
    Generate Master Key → Store in Secure Element

Future Feature - Key Rotation (if compromised):
    1. Generate new master key
    2. Decrypt all data with old key
    3. Re-encrypt with new key
    4. Delete old key
    5. Update all references

Frequency: Only on user request or detected compromise
```

---

## Authentication & Authorization

### Biometric Authentication

#### Android Implementation

```kotlin
class BiometricAuthenticator(private val context: Context) {

    fun authenticate(
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        val executor = ContextCompat.getMainExecutor(context)
        val biometricPrompt = BiometricPrompt(
            context as FragmentActivity,
            executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    super.onAuthenticationSucceeded(result)
                    onSuccess()
                }

                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    super.onAuthenticationError(errorCode, errString)
                    onError(errString.toString())
                }

                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    onError("Authentication failed")
                }
            }
        )

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Unlock Sakinah")
            .setSubtitle("Authenticate to access your journal")
            .setNegativeButtonText("Use Passcode")
            .setAllowedAuthenticators(
                BiometricManager.Authenticators.BIOMETRIC_STRONG or
                BiometricManager.Authenticators.DEVICE_CREDENTIAL
            )
            .build()

        biometricPrompt.authenticate(promptInfo)
    }
}
```

#### iOS Implementation

```swift
import LocalAuthentication

class BiometricAuthenticator {
    func authenticate(completion: @escaping (Bool, Error?) -> Void) {
        let context = LAContext()
        var error: NSError?

        // Check if biometric authentication is available
        guard context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
            completion(false, error)
            return
        }

        let reason = "Authenticate to access your journal"

        context.evaluatePolicy(
            .deviceOwnerAuthenticationWithBiometrics,
            localizedReason: reason
        ) { success, error in
            DispatchQueue.main.async {
                completion(success, error)
            }
        }
    }
}
```

### Session Management

```kotlin
object SessionManager {
    private var lastActiveTime: Long = 0
    private var isUnlocked = false
    private const val LOCK_TIMEOUT_MS = 5 * 60 * 1000L // 5 minutes

    fun onUserActivity() {
        lastActiveTime = System.currentTimeMillis()
    }

    fun shouldLockApp(): Boolean {
        return isUnlocked && (System.currentTimeMillis() - lastActiveTime) > LOCK_TIMEOUT_MS
    }

    fun unlock() {
        isUnlocked = true
        onUserActivity()
    }

    fun lock() {
        isUnlocked = false
    }
}
```

---

## Data Protection

### Secure Memory Handling

```kotlin
// Wipe sensitive data from memory after use
fun secureClear(data: CharArray) {
    data.fill('\u0000')
}

fun secureClear(data: ByteArray) {
    data.fill(0)
}

// Use try-finally to ensure cleanup
fun processJournalEntry(encrypted: String): String {
    val key = getEncryptionKey()
    try {
        return EncryptionService.decrypt(encrypted, key)
    } finally {
        secureClear(key.encoded)
    }
}
```

### Prevent Screenshots

```kotlin
// Android - Set FLAG_SECURE on sensitive activities
class JournalEditorActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        )
    }
}
```

```swift
// iOS - Hide content when backgrounded
class JournalViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(hideContent),
            name: UIApplication.willResignActiveNotification,
            object: nil
        )

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(showContent),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
    }

    @objc private func hideContent() {
        // Add blur effect or show placeholder
        contentView.alpha = 0
    }

    @objc private func showContent() {
        contentView.alpha = 1
    }
}
```

### Secure Data Deletion

```kotlin
// Overwrite data before deletion (defense in depth)
fun secureDelete(file: File) {
    if (!file.exists()) return

    // Overwrite with random data
    RandomAccessFile(file, "rws").use { raf ->
        val length = raf.length()
        raf.seek(0)
        val randomData = ByteArray(1024)
        SecureRandom().nextBytes(randomData)

        var written = 0L
        while (written < length) {
            val toWrite = minOf(randomData.size.toLong(), length - written).toInt()
            raf.write(randomData, 0, toWrite)
            written += toWrite
        }
    }

    // Delete file
    file.delete()
}
```

---

## Network Security

### Offline-First = Secure by Default

Since Sakinah is **offline-first**, there is minimal network attack surface.

### Future: Optional Cloud Backup

If optional encrypted backup is implemented:

```kotlin
object BackupSecurity {
    // Generate unique backup key (separate from app master key)
    fun generateBackupKey(userPassword: String): SecretKey {
        val salt = SecureRandom().generateSeed(32)
        val spec = PBEKeySpec(userPassword.toCharArray(), salt, 100000, 256)
        val factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
        return SecretKeyFactory(factory.generateSecret(spec).encoded)
    }

    // Encrypt backup bundle
    fun createEncryptedBackup(data: ByteArray, password: String): ByteArray {
        val key = generateBackupKey(password)
        return EncryptionService.encrypt(data, key)
    }

    // User must remember password - we don't store it
    // If forgotten, backup is permanently inaccessible (zero-knowledge)
}
```

### Certificate Pinning (Future API calls)

If we ever add optional features that require network:

```kotlin
val certificatePinner = CertificatePinner.Builder()
    .add("api.sakinah.app", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
    .build()

val okHttpClient = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()
```

---

## Privacy Implementation

### Data Collection Policy

**What we collect**: NOTHING that leaves the device

**What stays local only**:
- Journal entries (encrypted)
- Usage analytics (anonymous, local-only, user can view/delete)
- Crash logs (local-only, user can choose to share)

### Privacy Manifest

#### Android - data_safety.xml

```xml
<data_safety>
    <data_collection>
        <collects_data>false</collects_data>
    </data_collection>
    <security_practices>
        <encrypts_data_in_transit>false</encrypts_data_in_transit>
        <encrypts_data_at_rest>true</encrypts_data_at_rest>
        <provides_deletion>true</provides_deletion>
    </security_practices>
</data_safety>
```

#### iOS - Privacy Nutrition Label

```
Data Not Collected:
✓ Contact Info
✓ Contacts
✓ User Content (encrypted, never transmitted)
✓ Browsing History
✓ Identifiers
✓ Diagnostics
✓ Usage Data
✓ All other categories

Data Used to Track You: None
Data Linked to You: None
```

### User Privacy Controls

```kotlin
// Allow user to view and delete local analytics
class PrivacySettingsViewModel {
    fun getLocalAnalytics(): List<AnalyticsEvent> {
        return analyticsDatabase.getAllEvents()
    }

    fun deleteAllAnalytics() {
        analyticsDatabase.clearAll()
    }

    fun exportMyData(): File {
        // Export all user data (journal, settings, progress) to JSON
        return DataExporter.exportAll()
    }

    fun deleteAllMyData() {
        // Nuclear option - delete everything
        userDatabase.clearAll()
        // Recreate fresh database
    }
}
```

---

## Security Best Practices

### Code Security

1. **Input Validation**
   ```kotlin
   fun validateJournalEntry(content: String): Result<String> {
       if (content.length > MAX_ENTRY_LENGTH) {
           return Result.failure(Exception("Entry too long"))
       }
       // Sanitize input (XSS prevention, though UI is native)
       return Result.success(content.trim())
   }
   ```

2. **SQL Injection Prevention**
   ```kotlin
   // Use parameterized queries (Room does this automatically)
   @Query("SELECT * FROM journal_entries WHERE id = :id")
   suspend fun getEntryById(id: Long): JournalEntryEntity?

   // NOT this:
   // database.rawQuery("SELECT * FROM journal_entries WHERE id = $id")
   ```

3. **Secure Logging**
   ```kotlin
   // NEVER log sensitive data
   // Bad:
   Log.d("Journal", "Entry content: $content")

   // Good:
   Log.d("Journal", "Entry created with ID: $id")

   // Use ProGuard to remove logs in release
   ```

4. **Dependency Security**
   - Regularly update dependencies
   - Use Dependabot / Renovate
   - Audit dependencies for known vulnerabilities
   - Minimal dependencies

### Testing Security

```kotlin
@Test
fun `test encryption and decryption`() {
    val plaintext = "Sensitive journal entry"
    val key = generateTestKey()

    val encrypted = EncryptionService.encrypt(plaintext, key)
    assertNotEquals(plaintext, encrypted)
    assertTrue(encrypted.isNotEmpty())

    val decrypted = EncryptionService.decrypt(encrypted, key)
    assertEquals(plaintext, decrypted)
}

@Test
fun `test different keys produce different ciphertext`() {
    val plaintext = "Same content"
    val key1 = generateTestKey()
    val key2 = generateTestKey()

    val encrypted1 = EncryptionService.encrypt(plaintext, key1)
    val encrypted2 = EncryptionService.encrypt(plaintext, key2)

    assertNotEquals(encrypted1, encrypted2)
}

@Test
fun `test tampered ciphertext fails to decrypt`() {
    val plaintext = "Original content"
    val key = generateTestKey()

    val encrypted = EncryptionService.encrypt(plaintext, key)
    val tampered = encrypted.substring(0, encrypted.length - 5) + "XXXXX"

    assertThrows<GeneralSecurityException> {
        EncryptionService.decrypt(tampered, key)
    }
}
```

---

## Incident Response

### Security Incident Plan

1. **Detection**
   - User reports security issue
   - Automated security scan finds vulnerability
   - Researcher reports via responsible disclosure

2. **Assessment** (Within 24 hours)
   - Verify the issue
   - Assess severity (Critical / High / Medium / Low)
   - Determine scope of impact

3. **Response** (Timeframe based on severity)
   - Critical: Patch within 24-48 hours
   - High: Patch within 1 week
   - Medium: Patch in next regular update
   - Low: Add to backlog

4. **Communication**
   - Transparent disclosure to users (unless active exploitation risk)
   - Coordinate with security researcher
   - Publish security advisory

5. **Recovery**
   - Release patched version
   - Monitor adoption rate
   - Follow up with affected users

### Vulnerability Disclosure

```
# Security Policy

## Reporting a Vulnerability

Email: security@sakinah.app (to be created)

Please include:
- Description of vulnerability
- Steps to reproduce
- Impact assessment
- Suggested fix (if any)

We aim to respond within 48 hours.

## Responsible Disclosure

- We request 90 days before public disclosure
- We credit security researchers (with permission)
- We do not take legal action against good-faith researchers
```

---

## Compliance & Auditing

### Privacy Regulations

| Regulation | Applicable | Compliance Status |
|------------|-----------|-------------------|
| GDPR (EU) | If European users | ✅ Compliant (no data collection) |
| CCPA (California) | If California users | ✅ Compliant (no data sale) |
| Bangladesh Data Protection Act | For Bangladeshi users | ✅ Compliant (local storage only) |

### Security Auditing

**Self-Audit Checklist** (Pre-Release):
- [ ] All sensitive data encrypted
- [ ] No hardcoded secrets
- [ ] No sensitive data in logs
- [ ] Biometric authentication working
- [ ] Auto-lock working
- [ ] No data transmitted over network
- [ ] SQLCipher properly configured
- [ ] ProGuard/R8 enabled for release builds
- [ ] Certificate pinning (if applicable)
- [ ] Code obfuscation enabled

**External Audit** (Future):
- Independent security audit (after public launch)
- Open invitation to security researchers
- Bug bounty program (if resources allow)

### Security Updates

```
Release Checklist:
- [ ] Security-focused code review
- [ ] Dependency vulnerability scan
- [ ] Update all outdated libraries
- [ ] Test encryption/decryption
- [ ] Test authentication flows
- [ ] Verify ProGuard not breaking security features
- [ ] Test on rooted/jailbroken devices
```

---

<div dir="rtl">
إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا
</div>

*"Indeed, Allah commands you to render trusts to whom they are due."* - Quran 4:58
