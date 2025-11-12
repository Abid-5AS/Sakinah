# Android Design Guide - Material 3 Expressive

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Material 3 Expressive Overview](#material-3-expressive-overview)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing and Layout](#spacing-and-layout)
6. [Components](#components)
7. [Motion and Animation](#motion-and-animation)
8. [Iconography](#iconography)
9. [Islamic Design Considerations](#islamic-design-considerations)
10. [Accessibility](#accessibility)

## Design Philosophy

### Core Principles

1. **Spiritual Tranquility**
   - Calm, serene color palettes
   - Generous white space
   - Smooth, purposeful animations
   - Distraction-free interfaces

2. **Cultural Authenticity**
   - Respect for Islamic aesthetics
   - Incorporation of Arabic calligraphy
   - Bengali cultural elements
   - Geometric patterns from Islamic art

3. **Clarity and Focus**
   - Clear information hierarchy
   - Purposeful use of color
   - Legible typography
   - Uncluttered layouts

4. **Warmth and Humanity**
   - Expressive, organic shapes
   - Soft shadows and depth
   - Personal, inviting interactions
   - Emotional resonance

## Material 3 Expressive Overview

Material 3 Expressive is Google's latest design language that emphasizes:
- **Personal Expression**: Customizable colors and dynamic themes
- **Organic Shapes**: Rounded, soft corners and flowing transitions
- **Dimensional Depth**: Strategic use of elevation and shadows
- **Bold Typography**: Expressive type scales with personality
- **Purposeful Motion**: Meaningful, fluid animations

### Sakinah's Expression

We adapt Material 3 Expressive with:
- Islamic geometric patterns as accents
- Earthy, natural color palette
- Generous spacing for contemplation
- Subtle, respectful animations
- Bengali typography support

## Color System

### Primary Palette

Material 3 uses a dynamic color system with semantic color roles. For Sakinah, we'll use a custom color scheme inspired by nature and spirituality.

#### Light Theme

```kotlin
// Theme colors
val SakinahLightColorScheme = lightColorScheme(
    // Primary - Deep teal (represents tranquility and depth)
    primary = Color(0xFF006A6A),           // Main brand color
    onPrimary = Color(0xFFFFFFFF),         // Text on primary
    primaryContainer = Color(0xFF9FF2F2),   // Lighter primary
    onPrimaryContainer = Color(0xFF002020), // Text on container

    // Secondary - Warm earth tone
    secondary = Color(0xFF4A5F5F),
    onSecondary = Color(0xFFFFFFFF),
    secondaryContainer = Color(0xFFCCE3E3),
    onSecondaryContainer = Color(0xFF06191C),

    // Tertiary - Soft gold (represents light and guidance)
    tertiary = Color(0xFF5B5C00),
    onTertiary = Color(0xFFFFFFFF),
    tertiaryContainer = Color(0xFFE2E272),
    onTertiaryContainer = Color(0xFF1B1C00),

    // Error colors
    error = Color(0xFFBA1A1A),
    onError = Color(0xFFFFFFFF),
    errorContainer = Color(0xFFFFDAD6),
    onErrorContainer = Color(0xFF410002),

    // Background and Surface
    background = Color(0xFFFAFDFC),         // Soft off-white
    onBackground = Color(0xFF191C1C),       // Dark text
    surface = Color(0xFFFAFDFC),
    onSurface = Color(0xFF191C1C),

    // Surface variants
    surfaceVariant = Color(0xFFDAE5E4),
    onSurfaceVariant = Color(0xFF3F4948),
    surfaceTint = Color(0xFF006A6A),

    // Outline
    outline = Color(0xFF6F7979),
    outlineVariant = Color(0xFFBEC9C8),

    // Other
    scrim = Color(0xFF000000),
    inverseSurface = Color(0xFF2E3131),
    inverseOnSurface = Color(0xFFEFF1F0),
    inversePrimary = Color(0xFF82D5D5),
)
```

#### Dark Theme

```kotlin
val SakinahDarkColorScheme = darkColorScheme(
    // Primary
    primary = Color(0xFF82D5D5),
    onPrimary = Color(0xFF003737),
    primaryContainer = Color(0xFF004F50),
    onPrimaryContainer = Color(0xFF9FF2F2),

    // Secondary
    secondary = Color(0xFFB0C7C7),
    onSecondary = Color(0xFF1C2E2F),
    secondaryContainer = Color(0xFF324546),
    onSecondaryContainer = Color(0xFFCCE3E3),

    // Tertiary
    tertiary = Color(0xFFC6C65A),
    onTertiary = Color(0xFF2E2F00),
    tertiaryContainer = Color(0xFF444500),
    onTertiaryContainer = Color(0xFFE2E272),

    // Error
    error = Color(0xFFFFB4AB),
    onError = Color(0xFF690005),
    errorContainer = Color(0xFF93000A),
    onErrorContainer = Color(0xFFFFDAD6),

    // Background and Surface
    background = Color(0xFF191C1C),
    onBackground = Color(0xFFE0E3E2),
    surface = Color(0xFF191C1C),
    onSurface = Color(0xFFE0E3E2),

    // Surface variants
    surfaceVariant = Color(0xFF3F4948),
    onSurfaceVariant = Color(0xFFBEC9C8),
    surfaceTint = Color(0xFF82D5D5),

    // Outline
    outline = Color(0xFF899392),
    outlineVariant = Color(0xFF3F4948),

    // Other
    scrim = Color(0xFF000000),
    inverseSurface = Color(0xFFE0E3E2),
    inverseOnSurface = Color(0xFF191C1C),
    inversePrimary = Color(0xFF006A6A),
)
```

### Semantic Color Usage

```kotlin
// Custom semantic colors for Sakinah
object SakinahColors {
    // Journal-specific colors
    val journalCardBackground = Color(0xFFF5F8F7)
    val journalHighlight = Color(0xFFE8F5E9)

    // Library-specific colors
    val quranVerseBackground = Color(0xFFFFF9E6)
    val hadithBackground = Color(0xFFE3F2FD)
    val asmaBackground = Color(0xFFF3E5F5)

    // Status colors
    val memorizedGreen = Color(0xFF4CAF50)
    val learningYellow = Color(0xFFFFC107)
    val notStartedGray = Color(0xFF9E9E9E)

    // Special occasion colors (e.g., Ramadan)
    val ramadanGold = Color(0xFFFFD700)
    val jumahGreen = Color(0xFF009688)
}
```

### Color Guidelines

1. **Primary Color Usage**
   - App bar backgrounds
   - FABs (Floating Action Buttons)
   - Key interactive elements
   - Active states

2. **Secondary Color Usage**
   - Secondary actions
   - Chip backgrounds
   - Toggle buttons
   - Navigation rail

3. **Tertiary Color Usage**
   - Accents and highlights
   - Special features (Companion suggestions)
   - Achievement indicators
   - Decorative elements

4. **Surface Colors**
   - Card backgrounds
   - Dialog backgrounds
   - Sheet backgrounds
   - Elevated components

## Typography

### Type Scale

```kotlin
val SakinahTypography = Typography(
    // Display - Large headers
    displayLarge = TextStyle(
        fontFamily = FontFamily.Serif,  // Elegant for names of Allah
        fontSize = 57.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 64.sp,
        letterSpacing = (-0.25).sp
    ),
    displayMedium = TextStyle(
        fontFamily = FontFamily.Serif,
        fontSize = 45.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 52.sp,
        letterSpacing = 0.sp
    ),
    displaySmall = TextStyle(
        fontFamily = FontFamily.Serif,
        fontSize = 36.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 44.sp,
        letterSpacing = 0.sp
    ),

    // Headline - Section headers
    headlineLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 32.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 40.sp,
        letterSpacing = 0.sp
    ),
    headlineMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 28.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 36.sp,
        letterSpacing = 0.sp
    ),
    headlineSmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 24.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 32.sp,
        letterSpacing = 0.sp
    ),

    // Title - Card titles
    titleLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 22.sp,
        fontWeight = FontWeight.Medium,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    titleMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 16.sp,
        fontWeight = FontWeight.Medium,
        lineHeight = 24.sp,
        letterSpacing = 0.15.sp
    ),
    titleSmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 14.sp,
        fontWeight = FontWeight.Medium,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),

    // Body - Main content
    bodyLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 16.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 14.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 20.sp,
        letterSpacing = 0.25.sp
    ),
    bodySmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 12.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 16.sp,
        letterSpacing = 0.4.sp
    ),

    // Label - Buttons and inputs
    labelLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 14.sp,
        fontWeight = FontWeight.Medium,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp
    ),
    labelMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 12.sp,
        fontWeight = FontWeight.Medium,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    ),
    labelSmall = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 11.sp,
        fontWeight = FontWeight.Medium,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    )
)
```

### Font Families

```kotlin
// res/font/fonts.kt

val ArabicFont = FontFamily(
    Font(R.font.noto_naskh_arabic_regular, FontWeight.Normal),
    Font(R.font.noto_naskh_arabic_medium, FontWeight.Medium),
    Font(R.font.noto_naskh_arabic_bold, FontWeight.Bold)
)

val BengaliFont = FontFamily(
    Font(R.font.noto_sans_bengali_regular, FontWeight.Normal),
    Font(R.font.noto_sans_bengali_medium, FontWeight.Medium),
    Font(R.font.noto_sans_bengali_bold, FontWeight.Bold)
)

val EnglishSerifFont = FontFamily(
    Font(R.font.literata_regular, FontWeight.Normal),
    Font(R.font.literata_medium, FontWeight.Medium),
    Font(R.font.literata_bold, FontWeight.Bold)
)
```

### Typography Guidelines

1. **Arabic Text**
   - Use Noto Naskh Arabic
   - Minimum size: 16sp (18sp preferred)
   - Line height: 1.6x font size
   - Right-to-left support

2. **Bengali Text**
   - Use Noto Sans Bengali
   - Minimum size: 14sp (16sp preferred)
   - Generous line spacing
   - Left-to-right

3. **English Text**
   - Headers: Literata (Serif)
   - Body: Roboto (Sans-serif)
   - Code/Numbers: Roboto Mono

4. **Journal Content**
   - User preference for font
   - Larger default size (16sp)
   - Comfortable line height (1.5x)
   - Adjustable in settings

## Spacing and Layout

### Spacing Scale

```kotlin
object SakinahSpacing {
    val extraSmall = 4.dp
    val small = 8.dp
    val medium = 16.dp
    val large = 24.dp
    val extraLarge = 32.dp
    val xxLarge = 48.dp
}
```

### Layout Guidelines

```
Screen Padding:
├─ Horizontal: 16.dp (phone), 24.dp (tablet)
├─ Vertical: 16.dp
└─ Safe area insets: Respected

Component Spacing:
├─ Between related items: 8.dp
├─ Between sections: 24.dp
├─ Card internal padding: 16.dp
└─ List item padding: 16.dp horizontal, 12.dp vertical

Touch Targets:
├─ Minimum: 48.dp x 48.dp
├─ Preferred: 56.dp x 56.dp (FAB)
└─ Spacing between: 8.dp minimum
```

### Grid System

```
Phone (< 600dp):
└─ 4-column grid with 16.dp gutters

Tablet (≥ 600dp):
└─ 8-column grid with 24.dp gutters

Large Tablet (≥ 840dp):
└─ 12-column grid with 24.dp gutters
```

## Components

### 1. Cards

```kotlin
@Composable
fun JournalEntryCard(
    entry: JournalEntry,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        shape = RoundedCornerShape(16.dp),  // Expressive rounded corners
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        ),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 2.dp,
            pressedElevation = 4.dp
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = entry.date,
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = entry.preview,
                style = MaterialTheme.typography.bodyLarge,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )
            if (entry.suggestedNames.isNotEmpty()) {
                Spacer(modifier = Modifier.height(12.dp))
                AssistChip(
                    onClick = { },
                    label = { Text(entry.suggestedNames.first()) }
                )
            }
        }
    }
}
```

### 2. App Bars

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SakinahTopAppBar(
    title: String,
    navigationIcon: (@Composable () -> Unit)? = null,
    actions: (@Composable RowScope.() -> Unit)? = null
) {
    TopAppBar(
        title = {
            Text(
                text = title,
                style = MaterialTheme.typography.titleLarge
            )
        },
        navigationIcon = navigationIcon ?: {},
        actions = actions ?: {},
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = MaterialTheme.colorScheme.surface,
            titleContentColor = MaterialTheme.colorScheme.onSurface
        )
    )
}
```

### 3. Floating Action Button

```kotlin
@Composable
fun NewJournalEntryFAB(onClick: () -> Unit) {
    FloatingActionButton(
        onClick = onClick,
        shape = RoundedCornerShape(16.dp),  // Expressive shape
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        contentColor = MaterialTheme.colorScheme.onPrimaryContainer,
        elevation = FloatingActionButtonDefaults.elevation(
            defaultElevation = 6.dp,
            pressedElevation = 8.dp
        )
    ) {
        Icon(
            imageVector = Icons.Default.Edit,
            contentDescription = "New journal entry"
        )
    }
}
```

### 4. Bottom Navigation

```kotlin
@Composable
fun SakinahBottomNavigation(
    selectedTab: Screen,
    onTabSelected: (Screen) -> Unit
) {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 3.dp
    ) {
        Screen.values().forEach { screen ->
            NavigationBarItem(
                icon = {
                    Icon(
                        imageVector = screen.icon,
                        contentDescription = screen.title
                    )
                },
                label = { Text(screen.title) },
                selected = selectedTab == screen,
                onClick = { onTabSelected(screen) },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = MaterialTheme.colorScheme.onSecondaryContainer,
                    selectedTextColor = MaterialTheme.colorScheme.onSurface,
                    indicatorColor = MaterialTheme.colorScheme.secondaryContainer,
                    unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                    unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
                )
            )
        }
    }
}
```

### 5. Text Fields

```kotlin
@Composable
fun JournalTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = ""
) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier,
        placeholder = { Text(placeholder) },
        colors = TextFieldDefaults.colors(
            focusedContainerColor = Color.Transparent,
            unfocusedContainerColor = Color.Transparent,
            focusedIndicatorColor = Color.Transparent,
            unfocusedIndicatorColor = Color.Transparent
        ),
        textStyle = MaterialTheme.typography.bodyLarge.copy(
            lineHeight = 28.sp
        )
    )
}
```

### 6. Dialogs

```kotlin
@Composable
fun ConfirmationDialog(
    title: String,
    message: String,
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(title) },
        text = { Text(message) },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("Confirm")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        },
        shape = RoundedCornerShape(24.dp)  // Expressive rounded corners
    )
}
```

## Motion and Animation

### Animation Principles

1. **Purposeful**: Every animation serves a function
2. **Subtle**: Not distracting from content
3. **Respectful**: Appropriate for spiritual context
4. **Smooth**: 60fps minimum

### Transitions

```kotlin
object SakinahMotion {
    // Duration
    val durationShort = 200
    val durationMedium = 300
    val durationLong = 400

    // Easing
    val emphasizedDecelerate = CubicBezierEasing(0.05f, 0.7f, 0.1f, 1.0f)
    val emphasizedAccelerate = CubicBezierEasing(0.3f, 0.0f, 0.8f, 0.15f)
    val standard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)
}

// Example: Card expand animation
@Composable
fun AnimatedJournalCard(entry: JournalEntry) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .animateContentSize(
                animationSpec = spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessLow
                )
            )
            .clickable { expanded = !expanded }
    ) {
        // Card content
    }
}
```

### Page Transitions

```kotlin
// Navigation transitions
val enterTransition = fadeIn(
    animationSpec = tween(durationMillis = SakinahMotion.durationMedium)
) + slideInHorizontally(
    animationSpec = tween(durationMillis = SakinahMotion.durationMedium),
    initialOffsetX = { it / 4 }
)

val exitTransition = fadeOut(
    animationSpec = tween(durationMillis = SakinahMotion.durationShort)
)
```

## Iconography

### Icon Style
- **System**: Material Symbols (Rounded variant)
- **Custom**: Rounded corners, consistent stroke width
- **Islamic**: Simple, geometric, respectful

### Icon Sizes
```kotlin
object IconSize {
    val small = 16.dp
    val medium = 24.dp
    val large = 32.dp
    val extraLarge = 48.dp
}
```

### Custom Icons
```kotlin
@Composable
fun IslamicStarIcon(modifier: Modifier = Modifier) {
    Icon(
        painter = painterResource(id = R.drawable.ic_islamic_star),
        contentDescription = "Islamic Star",
        modifier = modifier,
        tint = MaterialTheme.colorScheme.primary
    )
}
```

## Islamic Design Considerations

### 1. Geometric Patterns

Use subtle Islamic geometric patterns as:
- Background accents (very low opacity)
- Section dividers
- Empty state illustrations

```kotlin
@Composable
fun IslamicPatternBackground() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.radialGradient(
                    colors = listOf(
                        MaterialTheme.colorScheme.surface,
                        MaterialTheme.colorScheme.surfaceVariant
                    )
                )
            )
    ) {
        Image(
            painter = painterResource(R.drawable.pattern_geometric),
            contentDescription = null,
            modifier = Modifier
                .fillMaxSize()
                .alpha(0.03f),  // Very subtle
            contentScale = ContentScale.Tile
        )
    }
}
```

### 2. Arabic Calligraphy

Display 99 Names with beautiful Arabic typography:
- Large, clear Arabic text
- Transliteration below
- Translation in smaller text

### 3. Qibla Direction (Optional)

If implementing Qibla compass:
- Clear, simple needle design
- Subtle animation
- Traditional Islamic aesthetics

### 4. Respectful Imagery

- No images of living beings in religious content
- Use abstract patterns and geometric shapes
- Nature imagery (mountains, trees, water) is appropriate

## Accessibility

### 1. Color Contrast
- WCAG AAA compliance for body text (7:1)
- WCAG AA compliance for large text (4.5:1)
- Test with accessibility scanner

### 2. Touch Targets
- Minimum 48dp x 48dp
- Clear visual separation
- Adequate spacing between targets

### 3. Screen Reader Support
- Meaningful content descriptions
- Logical navigation order
- Announce state changes

```kotlin
@Composable
fun AccessibleButton(
    onClick: () -> Unit,
    text: String,
    contentDescription: String? = null
) {
    Button(
        onClick = onClick,
        modifier = Modifier.semantics {
            this.contentDescription = contentDescription ?: text
        }
    ) {
        Text(text)
    }
}
```

### 4. Text Scaling
- Support up to 200% text scaling
- Test layouts with large text
- Use sp for text sizes

### 5. Dark Mode
- Full support for dark theme
- Adequate contrast in dark mode
- Test all screens in both modes

---

<div dir="rtl">
إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ
</div>

*"Indeed, Allah is Beautiful and He loves beauty."* - Hadith (Sahih Muslim)
