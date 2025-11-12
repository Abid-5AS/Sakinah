# iOS Design Guide - Liquid Glass Style

<div dir="rtl">
بسم الله الرحمن الرحيم
</div>

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Liquid Glass Aesthetic](#liquid-glass-aesthetic)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing and Layout](#spacing-and-layout)
6. [Components](#components)
7. [Motion and Animation](#motion-and-animation)
8. [Materials and Depth](#materials-and-depth)
9. [Iconography](#iconography)
10. [Islamic Design Considerations](#islamic-design-considerations)
11. [Accessibility](#accessibility)

## Design Philosophy

### Core Principles

1. **Spiritual Serenity**
   - Soft, translucent layers
   - Gentle depth and hierarchy
   - Calm, purposeful interactions
   - Space for contemplation

2. **Material Clarity**
   - Glass-like surfaces
   - Subtle depth through materials
   - Light and shadow play
   - Tactile, tangible feel

3. **Fluid Motion**
   - Smooth, physics-based animations
   - Natural, organic transitions
   - Responsive interactions
   - Delightful micro-interactions

4. **Islamic Authenticity**
   - Respect for cultural values
   - Beautiful Arabic typography
   - Geometric pattern integration
   - Bengali language support

## Liquid Glass Aesthetic

The "Liquid Glass" design language emphasizes:

### Key Characteristics

1. **Translucency and Depth**
   - Multi-layer visual hierarchy
   - Frosted glass effects
   - Soft shadows and elevation
   - Material stacking

2. **Fluid Interactions**
   - Spring-based animations
   - Elastic responses
   - Momentum scrolling
   - Physics-based transitions

3. **Clarity Through Blur**
   - Background blur for focus
   - Hierarchy through opacity
   - Contextual awareness
   - Visual continuity

4. **Organic Shapes**
   - Rounded corners (16-24pt)
   - Pill-shaped elements
   - Flowing transitions
   - Natural curves

### Implementation

```swift
// Material effect
struct GlassCard: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
            .shadow(color: .black.opacity(0.1), radius: 10, x: 0, y: 4)
    }
}
```

## Color System

### Dynamic Color Palette

iOS uses a dynamic color system that adapts to light and dark modes. Sakinah's colors are inspired by nature and tranquility.

### Color Definitions

```swift
extension Color {
    // MARK: - Primary Colors

    static let sakinahPrimary = Color("Primary")
    static let sakinahPrimaryLight = Color("PrimaryLight")
    static let sakinahPrimaryDark = Color("PrimaryDark")

    // MARK: - Secondary Colors

    static let sakinahSecondary = Color("Secondary")
    static let sakinahSecondaryLight = Color("SecondaryLight")
    static let sakinahSecondaryDark = Color("SecondaryDark")

    // MARK: - Accent Colors

    static let sakinahAccent = Color("Accent")
    static let sakinahGold = Color("Gold")

    // MARK: - Semantic Colors

    struct Journal {
        static let cardBackground = Color("JournalCard")
        static let highlight = Color("JournalHighlight")
    }

    struct Library {
        static let quran = Color("QuranBackground")
        static let hadith = Color("HadithBackground")
        static let asma = Color("AsmaBackground")
    }

    struct Learning {
        static let memorized = Color("Memorized")
        static let learning = Color("Learning")
        static let notStarted = Color("NotStarted")
    }
}
```

### Assets Catalog Configuration

```
Assets.xcassets/
├── Colors/
│   ├── Primary.colorset/
│   │   ├── Contents.json
│   │   └── Colors:
│   │       ├── Light: #006A6A (Deep Teal)
│   │       ├── Dark: #82D5D5 (Light Teal)
│   │       └── High Contrast variants
│   │
│   ├── Secondary.colorset/
│   │   └── Colors:
│   │       ├── Light: #4A5F5F (Warm Gray)
│   │       └── Dark: #B0C7C7 (Light Gray)
│   │
│   ├── Accent.colorset/
│   │   └── Colors:
│   │       ├── Light: #5B5C00 (Olive Gold)
│   │       └── Dark: #C6C65A (Light Gold)
│   │
│   └── Background.colorset/
│       └── Colors:
│           ├── Light: #FAFDFCF (Off White)
│           └── Dark: #191C1C (Dark Gray)
```

### Semantic Color Usage

```swift
struct SakinahColors {
    // MARK: - Surfaces

    static let surfacePrimary = Color(uiColor: .systemBackground)
    static let surfaceSecondary = Color(uiColor: .secondarySystemBackground)
    static let surfaceTertiary = Color(uiColor: .tertiarySystemBackground)

    // MARK: - Text

    static let textPrimary = Color(uiColor: .label)
    static let textSecondary = Color(uiColor: .secondaryLabel)
    static let textTertiary = Color(uiColor: .tertiaryLabel)

    // MARK: - Special Occasions

    static let ramadanGold = Color(hex: "FFD700")
    static let jumahGreen = Color(hex: "009688")
}
```

## Typography

### SF Pro & Arabic Typography

```swift
extension Font {
    // MARK: - Display (Names of Allah)

    static let sakinahDisplayLarge = system(size: 52, weight: .regular, design: .serif)
    static let sakinahDisplayMedium = system(size: 44, weight: .regular, design: .serif)
    static let sakinahDisplaySmall = system(size: 36, weight: .regular, design: .serif)

    // MARK: - Title (Section Headers)

    static let sakinahTitleLarge = system(size: 28, weight: .regular)
    static let sakinahTitleMedium = system(size: 22, weight: .regular)
    static let sakinahTitleSmall = system(size: 20, weight: .semibold)

    // MARK: - Body (Main Content)

    static let sakinahBodyLarge = system(size: 17, weight: .regular)  // iOS standard
    static let sakinahBody = system(size: 15, weight: .regular)
    static let sakinahBodySmall = system(size: 13, weight: .regular)

    // MARK: - Caption

    static let sakinahCaption = system(size: 12, weight: .regular)
    static let sakinahCaptionSmall = system(size: 11, weight: .regular)

    // MARK: - Arabic Typography

    static func arabic(size: CGFloat, weight: Weight = .regular) -> Font {
        .custom("GeezaPro", size: size)  // Or "Noto Naskh Arabic"
    }

    static let arabicDisplay = arabic(size: 48, weight: .regular)
    static let arabicTitle = arabic(size: 28, weight: .medium)
    static let arabicBody = arabic(size: 20, weight: .regular)

    // MARK: - Bengali Typography

    static func bengali(size: CGFloat, weight: Weight = .regular) -> Font {
        .custom("NotoSansBengali", size: size)
    }

    static let bengaliTitle = bengali(size: 24, weight: .semibold)
    static let bengaliBody = bengali(size: 17, weight: .regular)
}
```

### Typography Guidelines

```swift
// Example: Journal entry text
Text(entry.content)
    .font(.sakinahBodyLarge)
    .lineSpacing(8)  // Generous line spacing
    .tracking(0.5)   // Slight letter spacing
    .foregroundColor(.textPrimary)

// Example: Arabic Name
Text("ٱلرَّحْمَـٰنِ")
    .font(.arabicDisplay)
    .lineSpacing(12)
    .environment(\.layoutDirection, .rightToLeft)
    .foregroundColor(.sakinahPrimary)
```

### Dynamic Type Support

```swift
// Always use scaled fonts for accessibility
Text("Journal Entry")
    .font(.sakinahBodyLarge)
    .dynamicTypeSize(.medium...  .xxxLarge)  // Limit scaling range if needed
```

## Spacing and Layout

### Spacing Scale

```swift
enum Spacing {
    static let xxxSmall: CGFloat = 2
    static let xxSmall: CGFloat = 4
    static let xSmall: CGFloat = 8
    static let small: CGFloat = 12
    static let medium: CGFloat = 16
    static let large: CGFloat = 24
    static let xLarge: CGFloat = 32
    static let xxLarge: CGFloat = 48
    static let xxxLarge: CGFloat = 64
}
```

### Layout Guidelines

```swift
// Screen padding
let horizontalPadding: CGFloat = 20  // iPhone
let horizontalPaddingLarge: CGFloat = 32  // iPad

// Section spacing
let sectionSpacing: CGFloat = 32

// Card spacing
let cardPadding: CGFloat = 16
let cardSpacing: CGFloat = 12

// Touch targets
let minimumTouchTarget: CGFloat = 44
let preferredTouchTarget: CGFloat = 48
```

### Safe Area and Layout

```swift
struct ContentView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: Spacing.large) {
                // Content
            }
            .padding(.horizontal, Spacing.medium)
            .padding(.bottom, Spacing.large)
        }
        .safeAreaInset(edge: .bottom) {
            // Floating action button or toolbar
        }
    }
}
```

## Components

### 1. Glass Cards

```swift
struct GlassCard<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding(Spacing.medium)
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
            .shadow(color: .black.opacity(0.08), radius: 12, x: 0, y: 4)
    }
}

// Usage
GlassCard {
    VStack(alignment: .leading, spacing: 8) {
        Text(entry.date)
            .font(.sakinahCaption)
            .foregroundColor(.textSecondary)

        Text(entry.content)
            .font(.sakinahBody)
            .lineLimit(3)
    }
}
```

### 2. Navigation Bar

```swift
struct SakinahNavigationBar: View {
    let title: String
    let leadingButton: (() -> Void)?
    let trailingButton: (() -> Void)?

    var body: some View {
        HStack {
            if let leadingButton {
                Button(action: leadingButton) {
                    Image(systemName: "chevron.left")
                        .font(.title3)
                        .foregroundColor(.sakinahPrimary)
                }
            }

            Spacer()

            Text(title)
                .font(.sakinahTitleMedium)
                .fontWeight(.semibold)

            Spacer()

            if let trailingButton {
                Button(action: trailingButton) {
                    Image(systemName: "ellipsis.circle")
                        .font(.title3)
                        .foregroundColor(.sakinahPrimary)
                }
            }
        }
        .padding(.horizontal, Spacing.medium)
        .padding(.vertical, Spacing.small)
        .background(.ultraThinMaterial)
    }
}
```

### 3. Floating Action Button

```swift
struct FloatingActionButton: View {
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: "plus")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.white)
                .frame(width: 56, height: 56)
                .background(
                    LinearGradient(
                        colors: [.sakinahPrimary, .sakinahPrimaryDark],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .clipShape(Circle())
                .shadow(color: .sakinahPrimary.opacity(0.4), radius: 12, x: 0, y: 6)
        }
        .buttonStyle(SpringButtonStyle())
    }
}
```

### 4. Tab Bar

```swift
struct SakinahTabBar: View {
    @Binding var selectedTab: Tab

    var body: some View {
        HStack(spacing: 0) {
            ForEach(Tab.allCases) { tab in
                TabBarItem(
                    tab: tab,
                    isSelected: selectedTab == tab,
                    action: { selectedTab = tab }
                )
            }
        }
        .padding(.horizontal, Spacing.xSmall)
        .padding(.vertical, Spacing.xSmall)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: .black.opacity(0.08), radius: 12, x: 0, y: -4)
    }
}

struct TabBarItem: View {
    let tab: Tab
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: tab.icon)
                    .font(.system(size: 24))
                    .symbolVariant(isSelected ? .fill : .none)

                Text(tab.title)
                    .font(.sakinahCaptionSmall)
            }
            .foregroundColor(isSelected ? .sakinahPrimary : .textSecondary)
            .frame(maxWidth: .infinity)
            .padding(.vertical, Spacing.small)
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(isSelected ? Color.sakinahPrimaryLight.opacity(0.15) : Color.clear)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}
```

### 5. Text Editor

```swift
struct JournalTextEditor: View {
    @Binding var text: String
    let placeholder: String

    var body: some View {
        ZStack(alignment: .topLeading) {
            if text.isEmpty {
                Text(placeholder)
                    .font(.sakinahBodyLarge)
                    .foregroundColor(.textTertiary)
                    .padding(.horizontal, 5)
                    .padding(.vertical, 8)
            }

            TextEditor(text: $text)
                .font(.sakinahBodyLarge)
                .lineSpacing(8)
                .scrollContentBackground(.hidden)
                .background(.clear)
        }
        .padding(Spacing.medium)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}
```

### 6. Contextual Menus

```swift
struct JournalEntryContextMenu: View {
    let entry: JournalEntry
    let onEdit: () -> Void
    let onDelete: () -> Void
    let onShare: () -> Void

    var body: some View {
        Group {
            Button(action: onEdit) {
                Label("Edit", systemImage: "pencil")
            }

            Button(action: onShare) {
                Label("Share", systemImage: "square.and.arrow.up")
            }

            Divider()

            Button(role: .destructive, action: onDelete) {
                Label("Delete", systemImage: "trash")
            }
        }
    }
}

// Usage
JournalCard(entry: entry)
    .contextMenu {
        JournalEntryContextMenu(
            entry: entry,
            onEdit: { },
            onDelete: { },
            onShare: { }
        )
    }
```

### 7. Sheets and Modals

```swift
struct CompanionSuggestionSheet: View {
    @Environment(\.dismiss) var dismiss
    let suggestions: CompanionSuggestions

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: Spacing.large) {
                    ForEach(suggestions.names) { name in
                        NameCard(name: name)
                    }
                }
                .padding()
            }
            .navigationTitle("Companion Suggestions")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
    }
}
```

## Motion and Animation

### Animation Principles

1. **Spring-Based**: Natural, physics-driven
2. **Smooth**: 60fps minimum, aim for 120fps
3. **Purposeful**: Every animation has meaning
4. **Respectful**: Appropriate for spiritual context

### Animation Specifications

```swift
extension Animation {
    // MARK: - Standard Animations

    static let sakinahSpring = Animation.spring(
        response: 0.4,
        dampingFraction: 0.75,
        blendDuration: 0
    )

    static let sakinahSpringBouncy = Animation.spring(
        response: 0.5,
        dampingFraction: 0.65,
        blendDuration: 0
    )

    static let sakinahEaseOut = Animation.easeOut(duration: 0.3)
    static let sakinahEaseIn = Animation.easeIn(duration: 0.25)

    // MARK: - Interaction Animations

    static let buttonPress = Animation.spring(
        response: 0.3,
        dampingFraction: 0.6
    )

    static let cardAppear = Animation.spring(
        response: 0.6,
        dampingFraction: 0.8
    )
}
```

### Common Animations

```swift
// Button press effect
struct SpringButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.94 : 1.0)
            .animation(.buttonPress, value: configuration.isPressed)
    }
}

// Card appearance
struct CardAppearModifier: ViewModifier {
    @State private var appeared = false

    func body(content: Content) -> some View {
        content
            .opacity(appeared ? 1 : 0)
            .scaleEffect(appeared ? 1 : 0.9)
            .offset(y: appeared ? 0 : 20)
            .onAppear {
                withAnimation(.cardAppear) {
                    appeared = true
                }
            }
    }
}

// Staggered list animation
struct StaggeredListModifier: ViewModifier {
    let index: Int

    func body(content: Content) -> some View {
        content
            .transition(.asymmetric(
                insertion: .opacity.combined(with: .move(edge: .bottom)),
                removal: .opacity
            ))
            .animation(
                .spring(response: 0.5, dampingFraction: 0.8)
                    .delay(Double(index) * 0.05),
                value: index
            )
    }
}
```

### Interactive Animations

```swift
// Swipe to delete
struct SwipeToDeleteModifier: ViewModifier {
    @State private var offset: CGFloat = 0
    let onDelete: () -> Void

    func body(content: Content) -> some View {
        content
            .offset(x: offset)
            .background(
                Color.red
                    .opacity(abs(offset) / 100)
            )
            .gesture(
                DragGesture()
                    .onChanged { value in
                        offset = value.translation.width
                    }
                    .onEnded { value in
                        if abs(offset) > 100 {
                            withAnimation(.sakinahEaseOut) {
                                offset = -500
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                onDelete()
                            }
                        } else {
                            withAnimation(.sakinahSpring) {
                                offset = 0
                            }
                        }
                    }
            )
    }
}
```

## Materials and Depth

### Material Types

```swift
enum SakinahMaterial {
    case ultraThin   // Subtle background blur
    case thin        // Light blur
    case regular     // Standard blur
    case thick       // Heavy blur

    var material: Material {
        switch self {
        case .ultraThin: return .ultraThinMaterial
        case .thin: return .thinMaterial
        case .regular: return .regularMaterial
        case .thick: return .thickMaterial
        }
    }
}
```

### Elevation and Shadows

```swift
struct Elevation {
    // Shadow configurations for different elevation levels
    static func level1() -> some View {
        Color.clear
            .shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    }

    static func level2() -> some View {
        Color.clear
            .shadow(color: .black.opacity(0.08), radius: 8, x: 0, y: 4)
    }

    static func level3() -> some View {
        Color.clear
            .shadow(color: .black.opacity(0.12), radius: 16, x: 0, y: 8)
    }

    static func level4() -> some View {
        Color.clear
            .shadow(color: .black.opacity(0.16), radius: 24, x: 0, y: 12)
    }
}

// Usage
GlassCard {
    // Content
}
.background(Elevation.level2())
```

### Layering

```swift
struct LayeredView: View {
    var body: some View {
        ZStack {
            // Layer 1: Background
            BackgroundGradient()

            // Layer 2: Content cards
            ScrollView {
                VStack {
                    ForEach(entries) { entry in
                        GlassCard {
                            EntryContent(entry: entry)
                        }
                    }
                }
            }

            // Layer 3: Floating elements
            VStack {
                Spacer()
                FloatingActionButton(action: { })
                    .padding()
            }
        }
    }
}
```

## Iconography

### SF Symbols

```swift
struct SakinahIcons {
    // Tab bar icons
    static let journal = "book.closed"
    static let library = "books.vertical"
    static let learning = "brain.head.profile"
    static let companion = "sparkles"
    static let settings = "gearshape"

    // Action icons
    static let newEntry = "square.and.pencil"
    static let search = "magnifyingglass"
    static let filter = "line.3.horizontal.decrease"
    static let bookmark = "bookmark"
    static let bookmarkFilled = "bookmark.fill"

    // Content icons
    static let quran = "book"
    static let hadith = "text.book.closed"
    static let name = "star.circle"

    // Status icons
    static let memorized = "checkmark.circle.fill"
    static let learning = "clock"
    static let notStarted = "circle"
}
```

### Icon Sizes

```swift
enum IconSize {
    static let small: CGFloat = 16
    static let medium: CGFloat = 24
    static let large: CGFloat = 32
    static let extraLarge: CGFloat = 48

    // Semantic sizes
    static let tabBar: CGFloat = 24
    static let navigationBar: CGFloat = 22
    static let listItem: CGFloat = 20
}
```

### Custom Icons

```swift
// Islamic geometric icon
struct IslamicStarIcon: View {
    var size: CGFloat = 24
    var color: Color = .sakinahPrimary

    var body: some View {
        Image("islamic_star")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: size, height: size)
            .foregroundColor(color)
    }
}
```

## Islamic Design Considerations

### 1. Geometric Patterns

```swift
struct GeometricPatternBackground: View {
    var body: some View {
        GeometryReader { geometry in
            Image("islamic_pattern")
                .resizable(resizingMode: .tile)
                .opacity(0.03)
                .ignoresSafeArea()
        }
    }
}
```

### 2. Arabic Calligraphy Display

```swift
struct AsmaUlHusnaCard: View {
    let name: AsmaUlHusna

    var body: some View {
        VStack(spacing: Spacing.medium) {
            // Arabic name (large and prominent)
            Text(name.arabic)
                .font(.arabicDisplay)
                .foregroundColor(.sakinahPrimary)
                .environment(\.layoutDirection, .rightToLeft)

            // Transliteration
            Text(name.transliteration)
                .font(.sakinahTitleSmall)
                .foregroundColor(.textSecondary)

            // Meaning
            Text(name.meaning)
                .font(.sakinahBody)
                .foregroundColor(.textPrimary)
                .multilineTextAlignment(.center)
        }
        .padding(Spacing.large)
        .frame(maxWidth: .infinity)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }
}
```

### 3. Respectful Imagery

- Use abstract patterns
- Nature imagery (mountains, water, sky)
- Geometric shapes
- No living beings in religious contexts

### 4. Prayer Times Integration (Future)

```swift
struct PrayerTimeIndicator: View {
    let nextPrayer: Prayer

    var body: some View {
        HStack {
            Image(systemName: "moon.stars")
            Text("Next: \(nextPrayer.name)")
            Spacer()
            Text(nextPrayer.time, style: .time)
        }
        .font(.sakinahCaption)
        .padding(Spacing.small)
        .background(.ultraThinMaterial)
        .clipShape(Capsule())
    }
}
```

## Accessibility

### 1. Dynamic Type

```swift
// Always support Dynamic Type
Text("Journal Entry")
    .font(.sakinahBodyLarge)
    .dynamicTypeSize(.medium...xxxLarge)

// For fixed-size UI elements
Text("Fixed Size")
    .font(.sakinahCaption)
    .dynamicTypeSize(.large) // Fixed to specific size
```

### 2. VoiceOver Support

```swift
Button(action: { }) {
    Image(systemName: "plus")
}
.accessibilityLabel("Create new journal entry")
.accessibilityHint("Opens the journal editor")

// Hide decorative elements
Image("pattern_background")
    .accessibilityHidden(true)
```

### 3. Color Contrast

```swift
// Check contrast ratios
// Body text: 7:1 (WCAG AAA)
// Large text: 4.5:1 (WCAG AA)
// UI components: 3:1 minimum

// High contrast support
@Environment(\.accessibilityDifferentiateWithoutColor) var differentiateWithoutColor

if differentiateWithoutColor {
    // Use text labels instead of color-only indicators
}
```

### 4. Reduce Motion

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

var animation: Animation {
    reduceMotion ? .none : .sakinahSpring
}

// Apply conditionally
.animation(animation, value: someState)
```

### 5. Larger Touch Targets

```swift
// Minimum 44x44 pt touch target
Button("Small Text") {
    // Action
}
.frame(minWidth: 44, minHeight: 44)
.contentShape(Rectangle())
```

---

<div dir="rtl">
إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ
</div>

*"Indeed, Allah is Beautiful and He loves beauty."* - Hadith (Sahih Muslim)
