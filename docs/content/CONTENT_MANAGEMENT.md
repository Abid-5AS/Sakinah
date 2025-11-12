# Content Management Guide

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Content Philosophy](#content-philosophy)
2. [Content Sources](#content-sources)
3. [Content Verification Process](#content-verification-process)
4. [Quran Content](#quran-content)
5. [Hadith Content](#hadith-content)
6. [99 Names Content](#99-names-content)
7. [Tafsir Content](#tafsir-content)
8. [Translation Management](#translation-management)
9. [Content Updates](#content-updates)
10. [Quality Assurance](#quality-assurance)

## Content Philosophy

### Core Principles

1. **Authenticity Above All**
   - Only include content from verified, authentic Islamic sources
   - Clear attribution and grading for all Hadith
   - Multiple scholarly sources for verification

2. **Scholarly Verification**
   - All content reviewed by qualified Islamic scholars
   - Mainstream Sunni orthodox positions (Ahl al-Sunnah wal-Jama'ah)
   - Avoid controversial or sectarian content

3. **Transparency**
   - Users can verify sources
   - Complete citation information
   - No hidden or unclear attributions

4. **Continuous Improvement**
   - Regular content reviews
   - Incorporate scholarly feedback
   - Update as better translations become available

### Islamic Ethical Standards

- **Amanah (Trust)**: We are trustees of sacred text - must be accurate
- **Ihsan (Excellence)**: Strive for highest quality translations and explanations
- **'Ilm (Knowledge)**: Rely on scholars, not personal interpretation
- **Taqwa (God-consciousness)**: Fear of misrepresenting Allah's words

---

## Content Sources

### Quran Text

#### Arabic Text
- **Primary Source**: Tanzil Quran Text (http://tanzil.net)
  - License: Creative Commons BY-ND 3.0
  - Verification: Matches Madani Mushaf

- **Recitation Style**: Hafs 'an 'Asim
- **Format**: Simple text (no tashkeel for search) + Full text with diacritics

#### Translations

| Language | Translator | Status | License |
|----------|-----------|--------|---------|
| English | Sahih International | ✅ Included | Public Domain |
| English | Muhsin Khan | 🔄 Phase 2 | Permission required |
| English | Pickthall | 🔄 Phase 2 | Public Domain |
| Bengali | Taisirul Quran | ✅ Included | Permission obtained |
| Bengali | Bayaan Foundation | 🔄 Reviewing | Permission required |

### Hadith Collections

#### Included Collections (MVP)

1. **Sahih Bukhari**
   - Source: Sunnah.com (https://sunnah.com)
   - Translation: English (Muhsin Khan)
   - Total Hadiths: 7,563
   - License: Permission obtained

2. **Sahih Muslim**
   - Source: Sunnah.com
   - Translation: English (Abdul Hamid Siddiqui)
   - Total Hadiths: 7,470
   - License: Permission obtained

#### Future Collections (Phase 2)

3. **Sunan Abu Dawud**
4. **Jami' at-Tirmidhi**
5. **Sunan an-Nasa'i**
6. **Sunan Ibn Majah**

### 99 Names of Allah

**Primary Source**: "The Beautiful Names of Allah" by Dr. Mahmoud Abdel-Halim Samara
**Secondary Sources**:
- Ibn Qayyim's "Madārij al-Sālikīn"
- Al-Ghazali's "Al-Maqsad al-Asna"
- Ibn al-Qayyim's explanation

**Content Includes**:
- Arabic name with proper diacritics
- Transliteration (simplified)
- English meaning
- Bengali translation
- Detailed explanation
- Root word analysis (etymology)
- Quranic occurrences
- Related Names
- Practical examples

### Tafsir Sources

#### Initial Implementation (MVP)
- **Tafsir Ibn Kathir** (Abridged)
  - Selected verses only (500 key verses)
  - English translation by Safiur-Rahman Mubarakpuri
  - Permission: Darussalam Publications

#### Future Tafsir (Phase 2+)
- Tafsir al-Jalalayn
- Ma'ariful Quran (Mufti Shafi)
- Tafhim al-Quran (Maududi)

---

## Content Verification Process

### Step-by-Step Verification

```
1. Source Identification
   ↓
2. Scholarly Review
   ↓
3. Cross-Reference Verification
   ↓
4. Technical Validation
   ↓
5. User Testing
   ↓
6. Continuous Monitoring
```

### 1. Source Identification

**Checklist**:
- [ ] Identify original Arabic source
- [ ] Verify authenticity of source material
- [ ] Check scholarly consensus on text
- [ ] Document complete attribution
- [ ] Obtain necessary permissions/licenses

### 2. Scholarly Review

**Reviewer Qualifications**:
- Traditional Islamic education (Alim/Alima)
- Knowledge of Arabic and Islamic sciences
- Familiarity with Bangladeshi Islamic context

**Review Checklist**:
- [ ] Arabic text accuracy
- [ ] Translation accuracy
- [ ] Proper context and understanding
- [ ] No sectarian bias
- [ ] Appropriate for general audience

### 3. Cross-Reference Verification

**For Quran**:
- [ ] Compare with multiple authenticated Mushaf
- [ ] Verify verse numbering
- [ ] Check diacritical marks
- [ ] Validate Surah metadata

**For Hadith**:
- [ ] Verify hadith number across collections
- [ ] Check grading (Sahih, Hasan, Daif)
- [ ] Confirm chain of narration
- [ ] Cross-reference with multiple sources

### 4. Technical Validation

```python
# Example validation script (pseudocode)

def validate_quran_content():
    """Validate Quran content integrity"""
    # Check verse count
    assert total_verses == 6236, "Incorrect verse count"

    # Check Surah count
    assert total_surahs == 114, "Incorrect Surah count"

    # Verify each Surah has correct verse count
    for surah in surahs:
        expected_count = SURAH_VERSE_COUNTS[surah.number]
        assert surah.verse_count == expected_count

    # Verify no missing verses
    for surah_num in range(1, 115):
        for verse_num in range(1, verse_counts[surah_num] + 1):
            assert get_verse(surah_num, verse_num) is not None

def validate_hadith_grading():
    """Ensure all hadith have grading"""
    ungraded = Hadith.filter(grade=None)
    assert len(ungraded) == 0, f"{len(ungraded)} hadith without grading"

def validate_asma_ul_husna():
    """Validate 99 Names completeness"""
    names = get_all_names()
    assert len(names) == 99, "Incorrect count of Names"

    for name in names:
        assert name.arabic, "Missing Arabic text"
        assert name.transliteration, "Missing transliteration"
        assert name.english_meaning, "Missing English meaning"
        assert name.detailed_meaning, "Missing detailed explanation"
```

### 5. User Testing

- Beta testers review content
- Scholars in community provide feedback
- Users can report errors via in-app form
- Regular content accuracy audits

### 6. Continuous Monitoring

- Community reports
- Scholarly advisory board reviews
- Annual content audit
- Version control for all content

---

## Quran Content

### Data Structure

```json
{
  "surah": {
    "number": 1,
    "arabic_name": "الفاتحة",
    "english_name": "Al-Fatihah",
    "bengali_name": "আল-ফাতিহা",
    "transliteration": "Al-Faatiha",
    "translation": "The Opening",
    "revelation_type": "Meccan",
    "total_verses": 7
  },
  "verses": [
    {
      "verse_number": 1,
      "arabic_text": "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
      "simple_text": "بسم الله الرحمن الرحيم",
      "translations": {
        "sahih_international": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        "bengali_taisirul": "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে।"
      },
      "juz": 1,
      "page": 1,
      "sajda": false
    }
  ]
}
```

### Quran Content Pipeline

```
1. Source Download
   - Download Tanzil Quran XML
   - Download translation files
   - Verify checksums

2. Parse and Transform
   - Parse XML to structured data
   - Normalize Arabic text
   - Clean translations
   - Add metadata

3. Database Population
   - Insert into SQLite database
   - Create full-text search indexes
   - Generate statistics

4. Verification
   - Run validation scripts
   - Manual spot-checks
   - Scholarly review

5. Bundle in App
   - Compress database
   - Include in app resources
   - Decompress on first launch
```

---

## Hadith Content

### Authenticity Grading System

| Grade | Arabic | Meaning | Include in App |
|-------|--------|---------|----------------|
| Sahih | صحيح | Authentic | ✅ Yes |
| Hasan | حسن | Good | ✅ Yes |
| Daif | ضعيف | Weak | ⚠️ With warning |
| Mawdu | موضوع | Fabricated | ❌ No |

### Hadith Data Structure

```json
{
  "hadith": {
    "collection": "Sahih Bukhari",
    "book_number": 1,
    "book_name": "Revelation",
    "hadith_number": 1,
    "arabic_text": "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ...",
    "english_translation": "Actions are judged by intentions...",
    "grade": "Sahih",
    "graded_by": "Imam Bukhari",
    "chain_of_narration": [
      "Umar ibn Al-Khattab",
      "Alqamah ibn Waqqas",
      "Muhammad ibn Ibrahim",
      "Yahya ibn Sa'id",
      "Imam Bukhari"
    ],
    "themes": ["intentions", "sincerity", "actions"],
    "reference": "Sahih Bukhari 1"
  }
}
```

### Hadith Content Guidelines

1. **Complete Chain**: Include full isnad (chain of narration)
2. **Grading**: Display authenticity grade prominently
3. **Context**: Provide historical context where necessary
4. **Translation**: Use established, scholarly translations
5. **Cross-Reference**: Link to related hadith

### Hadith Verification Checklist

- [ ] Verified in original collection
- [ ] Authenticity grade confirmed
- [ ] Translation reviewed by scholar
- [ ] Chain of narration complete
- [ ] Proper attribution
- [ ] No contradictions with Quran

---

## 99 Names Content

### Content Structure for Each Name

```json
{
  "id": 1,
  "number": 1,
  "arabic": "ٱلرَّحْمَـٰنُ",
  "transliteration": "Ar-Rahman",
  "english_meaning": "The Most Merciful",
  "bengali_meaning": "পরম করুণাময়",
  "root_word": {
    "arabic": "ر-ح-م",
    "transliteration": "R-H-M",
    "root_meaning": "Mercy, compassion"
  },
  "detailed_explanation": "Ar-Rahman is the One whose mercy encompasses all creation...",
  "quranic_occurrences": 57,
  "example_verse": {
    "surah": 1,
    "verse": 3,
    "text": "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"
  },
  "practical_application": "Reflect on Allah's mercy in times of difficulty...",
  "related_names": [2, 3, 47],  // Ar-Raheem, Al-Ghafoor, Al-Afuww
  "category": "Mercy",
  "scholarly_notes": "Ibn Qayyim explains that Ar-Rahman refers to...",
  "common_dua": "Bismillah Ar-Rahman Ar-Raheem"
}
```

### Names Content Guidelines

1. **Etymology**: Always include root word analysis
2. **Relationships**: Map related names (mercy names, power names, etc.)
3. **Practical**: Include how to reflect on each name in daily life
4. **Quranic**: Reference where the name appears in Quran
5. **Balance**: Combine scholarly depth with accessibility

---

## Tafsir Content

### Tafsir Selection Criteria

1. **Authenticity**: Only from recognized scholars
2. **Balance**: Not overly technical or too simplistic
3. **Relevance**: Practical application for modern Muslims
4. **Length**: Concise for MVP, detailed for Phase 2
5. **Language**: Clear, accessible English and Bengali

### Tafsir Data Structure

```json
{
  "verse_id": 256,  // Reference to quran_verses
  "tafsir_source": "Ibn Kathir",
  "language": "en",
  "tafsir_text": "This verse, known as Ayat al-Kursi, describes...",
  "key_points": [
    "Allah's sovereignty",
    "His knowledge encompasses everything",
    "He never sleeps or slumbers"
  ],
  "historical_context": "Revealed in Madinah...",
  "practical_lessons": [
    "Recite for protection",
    "Reflect on Allah's greatness"
  ],
  "scholarly_notes": "Ibn Abbas narrated..."
}
```

---

## Translation Management

### Translation Workflow

```
1. Identify need for new translation
   ↓
2. Select reputable translator/translation
   ↓
3. Obtain permissions/license
   ↓
4. Technical integration
   ↓
5. Scholarly review
   ↓
6. User testing
   ↓
7. Release as update
```

### Translation Standards

**For Quran Translations**:
- Established scholars or organizations
- Widely accepted in Muslim community
- Proper permissions obtained
- Reviewed by native speakers

**For Hadith Translations**:
- Scholarly accuracy
- Proper context
- Clear attribution
- Grade-appropriate language

**For Bengali Content**:
- Natural, fluent Bengali
- Not overly literal
- Culturally appropriate
- Reviewed by Bangladeshi scholars

---

## Content Updates

### Update Types

1. **Critical Updates**
   - Errors in Quran text (highest priority)
   - Incorrect hadith grading
   - **Timeline**: Immediate hotfix

2. **Important Updates**
   - Improved translations
   - Additional authenticated hadith
   - Enhanced tafsir
   - **Timeline**: Next minor version

3. **Enhancement Updates**
   - New translations
   - Additional content
   - Expanded explanations
   - **Timeline**: Major version updates

### Update Process

```
1. Content Team identifies need
   ↓
2. Scholarly Advisory Board reviews
   ↓
3. Technical implementation
   ↓
4. QA testing
   ↓
5. Beta testing
   ↓
6. Release to production
   ↓
7. Monitor user feedback
```

### Version Control

```
content_database/
├── v1.0.0/
│   ├── quran.db
│   ├── hadith.db
│   ├── asma.json
│   └── CHANGELOG.md
├── v1.1.0/
│   ├── quran.db (updated translation)
│   ├── hadith.db (added collection)
│   ├── asma.json (enhanced content)
│   └── CHANGELOG.md
```

---

## Quality Assurance

### QA Checklist

#### Pre-Release Content QA

**Quran**:
- [ ] Verse count verified (6,236 verses)
- [ ] All Surahs present (114)
- [ ] Verse numbering correct
- [ ] Arabic text matches Madani Mushaf
- [ ] Translations complete (no missing verses)
- [ ] FTS (Full-Text Search) working
- [ ] No encoding issues (Arabic, Bengali display correctly)

**Hadith**:
- [ ] All hadith have grading
- [ ] No fabricated (Mawdu) hadith included
- [ ] Chain of narration complete
- [ ] Book and chapter organization correct
- [ ] Translations complete
- [ ] Search functionality working
- [ ] Cross-references accurate

**99 Names**:
- [ ] All 99 Names present
- [ ] Arabic diacritics correct
- [ ] Transliterations accurate
- [ ] Meanings verified
- [ ] Detailed explanations present
- [ ] Related names correctly linked
- [ ] Quranic references accurate

#### Ongoing Content Monitoring

- Monthly content audit
- User-reported errors tracked in GitHub Issues
- Quarterly scholarly review
- Annual comprehensive review

### Error Reporting

**User Error Report Form**:
```
Type: [Quran / Hadith / Names / Tafsir]
Location: [Surah:Verse or Hadith Reference]
Error Description:
Suggested Correction:
Source/Reference (if available):
```

**Response Timeline**:
- Critical (Quran text): 24-48 hours
- Important (Hadith grading): 1 week
- Minor (Translation improvement): Next update cycle

---

## Content Licensing

### Licenses Obtained

| Content | Source | License | Status |
|---------|--------|---------|--------|
| Quran Arabic Text | Tanzil | CC BY-ND 3.0 | ✅ Obtained |
| Sahih International | Saheeh International | Public Domain | ✅ Obtained |
| Bengali Translation | Taisirul Quran | Custom Permission | ✅ Obtained |
| Sahih Bukhari | Sunnah.com | Academic Use | ✅ Obtained |
| Sahih Muslim | Sunnah.com | Academic Use | ✅ Obtained |

### Attribution Requirements

All content must be attributed as follows:

```
Quran Text: Tanzil Quran Text (tanzil.net)
English Translation: [Translator Name]
Bengali Translation: [Translator Name]
Hadith: Sunnah.com (sunnah.com)
```

---

<div dir="rtl">
قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ
</div>

*"Say, 'I am only a human being like you, to whom has been revealed...'"* - Quran 18:110

**Note**: We are human and may make mistakes. We rely on Allah's guidance and scholarly expertise to maintain the highest standards of content authenticity.
