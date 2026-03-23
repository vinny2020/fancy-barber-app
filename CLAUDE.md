# CLAUDE.md — Obsidian Barbershop App

> This file is the primary handoff document for Claude Code.
> Read it fully before making any changes to this project.

---

## Project Overview

**Fancy Barber App** is a cross-platform luxury barbershop application built with
React Native + Expo. It runs on iOS, Android, and Web from a single TypeScript
codebase. The app is for "Obsidian Barbershop" — a fictional high-end Atlanta
barbershop used as the brand identity.

**GitHub:** https://github.com/vinny2020/fancy-barber-app
**Local path:** /Users/vincentstoessel/Developer/cross-platform/barber

---

## Essential Commands

```bash
# Start development server (interactive — pick platform from menu)
npx expo start

# Web only (opens at http://localhost:8081)
npx expo start --web

# iOS simulator (macOS + Xcode required)
npx expo start --ios

# Android emulator
npx expo start --android

# Type check (zero errors = green)
npx tsc --noEmit

# Install a new package the Expo-safe way
npx expo install <package-name>

# Regular npm install (use this flag to avoid peer dep conflicts)
npm install --legacy-peer-deps

# Export web build for deployment
npx expo export --platform web

# Push changes
git add -A && git commit -m "your message" && git push origin main
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Expo SDK 52 (managed) | No native build config needed |
| UI | React Native + react-native-web | One codebase, all platforms |
| Navigation | React Navigation 6 (Bottom Tabs + Native Stack) | Industry standard |
| Fonts | @expo-google-fonts (Playfair Display, DM Sans, DM Mono) | Loaded via expo-font |
| Language | TypeScript strict mode | Zero errors enforced |
| Web bundler | Metro (NOT webpack) | Expo 52 dropped webpack |
| Animation | react-native-reanimated + Animated API | Smooth native animations |


---

## Project Structure

```
fancy-barber-app/
├── App.tsx                    # Root component — font loading + SplashScreen
├── index.ts                   # Expo entry point (registerRootComponent)
├── app.json                   # Expo config (slug, icons, web, plugins)
├── babel.config.js            # babel-preset-expo + reanimated plugin
├── metro.config.js            # Metro bundler — isCSSEnabled, sourceExts
├── tsconfig.json              # Strict TS + path alias @/* → src/*
├── assets/                    # PNG assets (icon, splash, favicon, adaptive-icon)
└── src/
    ├── theme/index.ts         # SINGLE SOURCE OF TRUTH for all design tokens
    ├── data/index.ts          # All mock data (SERVICES, BARBERS, TIMES, TESTIMONIALS)
    ├── components/index.tsx   # Shared components (see Design System below)
    ├── navigation/index.tsx   # Tab bar + stack navigator + custom header
    └── screens/
        ├── HomeScreen.tsx     # Hero, stats, popular services, testimonials, hours
        ├── ServicesScreen.tsx # Filterable full service catalog
        ├── BookScreen.tsx     # 4-step booking flow (stateful multi-step form)
        ├── GalleryScreen.tsx  # Lookbook grid + lightbox modal
        └── BarbersScreen.tsx  # Team profiles with availability + philosophy
```

---

## Design System

All design tokens live in `src/theme/index.ts`. Never hardcode colors, fonts,
or spacing values in screens or components — always import from theme.

### Color Palette

```ts
Colors.obsidian   // '#0A0A0A' — primary background
Colors.charcoal   // '#111111' — elevated surfaces (headers, cards)
Colors.graphite   // '#242424' — selected/active states
Colors.border     // '#2A2A2A' — all borders
Colors.borderGold // 'rgba(212,168,67,0.3)' — gold-tinted borders
Colors.gold       // '#D4A843' — PRIMARY accent (CTAs, active states, icons)
Colors.goldDeep   // '#8B6914' — stats bar background, popular badges
Colors.goldMid    // '#C49A2A' — secondary gold (accent tab icon)
Colors.ivory      // '#F0EDE8' — primary text
Colors.textMuted  // '#888888' — secondary text
Colors.textDim    // '#555555' — tertiary / metadata text
```

### Typography

Font family names must exactly match the keys passed to `useFonts()` in App.tsx.

```ts
Typography.fontDisplayB  // 'PlayfairDisplay_700Bold'    — headings, prices, names
Typography.fontDisplay   // 'PlayfairDisplay_400Regular' — body serif
Typography.fontDisplayI  // 'PlayfairDisplay_400Regular_Italic' — quotes, taglines
Typography.fontBody      // 'DMSans_400Regular'          — descriptions, body copy
Typography.fontBodyM     // 'DMSans_500Medium'           — medium weight body
Typography.fontMono      // 'DMMono_400Regular'          — labels, eyebrows, metadata
Typography.fontMonoM     // 'DMMono_500Medium'           — CTAs, prices, tags
```

### Spacing Scale

```ts
Spacing.xs = 4  | Spacing.sm = 8  | Spacing.md = 16 | Spacing.lg = 24
Spacing.xl = 32 | Spacing.xxl = 48 | Spacing['3xl'] = 64 | Spacing['4xl'] = 96
```

### Shared Components (`src/components/index.tsx`)

| Component | Props | Usage |
|---|---|---|
| `GoldDivider` | `style?` | Decorative gold line with diamond center |
| `SectionHeader` | `eyebrow?, title, style?` | Eyebrow + title + divider block |
| `GoldButton` | `label, onPress, variant?, style?, textStyle?, fullWidth?` | variant: solid\|outline\|ghost |
| `ServiceCard` | `name, description, price, duration, category, popular?, onPress?` | Full service listing card |
| `BarberCard` | `name, title, experience, specialties, rating, reviews, available, color, initial, onPress?` | Barber row card |
| `TestimonialCard` | `name, text, rating, service` | Review card with gold left border |


---

## Navigation Architecture

```
NavigationContainer
└── NativeStack (headerShown: false)
    └── MainTabs (Bottom Tab Navigator)
        ├── Home     → HomeScreen
        ├── Services → ServicesScreen
        ├── Book     → BookScreen     ← accent tab (gold top border)
        ├── Gallery  → GalleryScreen
        └── Barbers  → BarbersScreen
```

- Custom tab bar rendered via `tabBar` prop — see `CustomTabBar` in navigation/index.tsx
- Custom header rendered via `header` prop — see `AppHeader`
- The "Book" tab uses `accent: true` which adds a gold top border and gold-tinted icon
- All screens share the same header (logo tap navigates Home)
- Navigation between screens: `navigation.navigate('Book', { serviceId: '1' })`

---

## Known Issues & Gotchas

### 1. Expo 52 uses Metro for web — NOT webpack
`@expo/webpack-config` is **incompatible** with Expo 52 and must NOT be added back.
The web bundler is Metro. The required web package is `@expo/metro-runtime@~4.0.1`.

### 2. Font export names differ from what you might expect
The `@expo-google-fonts` packages export names without underscores between words:

```ts
// CORRECT
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display'
import { DMSans_400Regular }       from '@expo-google-fonts/dm-sans'
import { DMMono_400Regular }       from '@expo-google-fonts/dm-mono'

// WRONG (will throw TS2724 "Did you mean...")
import { Playfair_Display_700Bold } from '@expo-google-fonts/playfair-display'
import { DM_Sans_400Regular }       from '@expo-google-fonts/dm-sans'
```

The font keys registered in `useFonts()` must exactly match what's used in
`Typography.*` constants in `src/theme/index.ts`.

### 3. Always use `--legacy-peer-deps` for npm installs
The dependency tree has some peer conflicts (react 18 vs 19 range mismatches).
`npm install --legacy-peer-deps` is the safe default for this project.
Prefer `npx expo install <package>` for Expo-managed packages.

### 4. Asset files are generated placeholder PNGs
`assets/*.png` are minimal solid-color PNG files generated via Python.
Replace with real brand assets when available:
- `icon.png` — 1024×1024 app icon
- `splash-icon.png` — splash screen center image
- `adaptive-icon.png` — Android adaptive icon foreground (1024×1024)
- `favicon.png` — 64×64 browser favicon

### 5. StyleSheet array type errors
When conditionally applying styles in React Native, avoid mixing booleans:
```ts
// Can cause TS errors:
style={[{ flex: 1 }, !canNext && styles.disabled]}

// Safe pattern:
style={canNext ? { flex: 1 } : [{ flex: 1 }, styles.disabled] as any}
// Or even cleaner:
style={{ flex: 1, ...(canNext ? {} : styles.disabled) }}
```

### 6. `borderStyle: 'dotted'` only works on React Native, not all web targets
The dotted border in `HomeScreen` hours section may render differently on web.
Use `borderStyle: 'dashed'` as a safer cross-platform alternative if needed.

### 7. react-native-reanimated requires Babel plugin
`babel.config.js` must include `'react-native-reanimated/plugin'` as the last
plugin. Removing it will cause runtime crashes on animated components.


---

## Data Layer

All mock data lives in `src/data/index.ts`. When connecting a real backend,
replace these exports with API calls or a data-fetching hook.

```ts
SERVICES[]     // 6 services with id, name, description, price, duration, category, popular
BARBERS[]      // 3 barbers with id, name, title, experience, specialties, rating, reviews, available, color, initial
TIMES[]        // 18 time slots (strings like '9:00 AM')
TESTIMONIALS[] // 3 reviews with id, name, text, rating, service
```

### Adding a real backend

1. Create `src/hooks/useServices.ts`, `src/hooks/useBarbers.ts` etc.
2. Replace direct `SERVICES` imports in screens with hook calls
3. Add loading/error states to each screen
4. `BookScreen.tsx` — the `handleNext()` function at step 3→confirm is the
   right place to fire the booking POST request

---

## Roadmap / Suggested Next Features

These are natural next steps, roughly in priority order:

### High Priority
- [ ] **Real booking API** — POST to backend in `BookScreen` confirm step
- [ ] **Auth / user accounts** — expo-auth-session or Clerk for login
- [ ] **Push notifications** — expo-notifications for booking reminders
- [ ] **Real photography** — replace GalleryScreen placeholder geometry with
      actual images using `<Image>` from expo-image

### Medium Priority
- [ ] **Booking management** — "My Appointments" tab for logged-in users
- [ ] **Real-time availability** — fetch barber availability from API for date picker
- [ ] **Web SEO** — add expo-router (file-based routing) for better web URL support
- [ ] **Onboarding flow** — first-launch welcome screens
- [ ] **Dark/light mode toggle** — theme context using Colors tokens

### Low Priority / Polish
- [ ] **Haptics** — expo-haptics on booking confirm, tab press
- [ ] **Better animations** — Reanimated shared-element transitions between gallery items
- [ ] **Skeleton loaders** — shimmer loading states for when data fetches
- [ ] **EAS Build** — configure eas.json for TestFlight/Play Store builds
- [ ] **Analytics** — expo-analytics or Segment for tracking bookings

---

## Adding a New Screen

1. Create `src/screens/YourScreen.tsx`:
```tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';

export default function YourScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      {/* content */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
});
```

2. Add to `src/navigation/index.tsx`:
```ts
import YourScreen from '../screens/YourScreen';
// Add to TABS array:
{ name: 'YourTab', icon: '◆', label: 'Label' }
// Add to Tab.Navigator:
<Tab.Screen name="YourTab" component={YourScreen} />
```

---

## Git History

```
bb7f931  fix: add generated PNG assets + TypeScript devDeps
7d6a7a3  fix: replace webpack-config with metro-runtime for Expo 52 web
46f4668  feat: initial Obsidian Barbershop app
```


---

## Build Session Notes
### How This App Was Built (Claude claude.ai → Claude Code handoff)

This app was scaffolded entirely by Claude (claude.ai with Desktop Commander MCP)
in a single session. The following documents everything learned so future Claude
Code sessions don't repeat mistakes.

#### Build Process

1. **Expo scaffold** — `create-expo-app` with `blank-typescript` template
2. **Packages installed** — React Navigation, Reanimated, expo-google-fonts,
   react-native-web, expo-linear-gradient, expo-blur, expo-splash-screen
3. **Source files written** — all TypeScript source created via Desktop Commander
   `write_file` in 25-30 line chunks (the tool's optimal chunk size)
4. **Files deployed** — written directly to Mac filesystem via Desktop Commander,
   then git initialized and pushed to GitHub via `gh` CLI

#### Path Confusion Issue (Resolved)
During initial build, source files were split across two locations:
- Container: `/home/claude/Projects/barber/` — had source `.tsx` files
- Mac: `/root/Projects/barber/` — had `package.json` + `node_modules`

This happened because `create_file` (container tool) uses `/home/claude/` paths
while `bash_tool` resolves `~/` as `/root/`. **Resolution:** Desktop Commander
was used to write all final files directly to the Mac at the correct path.

#### Dependency Fixes Required

| Problem | Root Cause | Fix |
|---|---|---|
| `@expo/webpack-config` conflict | Expo 52 dropped webpack | Remove pkg, add `@expo/metro-runtime@~4.0.1` |
| TypeScript not found | `devDependencies` not installed | `npm install --legacy-peer-deps --include=dev` |
| Missing asset PNGs | Expo requires real PNG files | Generated minimal valid PNGs via Python `struct`/`zlib` |
| Font import names wrong | Google Fonts pkg uses camelCase, not snake | Changed `Playfair_Display_` → `PlayfairDisplay_` etc. |

#### TypeScript Issues Encountered & Fixed

```ts
// Problem: StyleSheet array with conditional boolean
style={[{ flex: 1 }, !canNext && styles.btnDisabled]}
// Fix:
style={canNext ? { flex: 1 } : [{ flex: 1 }, styles.btnDisabled] as any}
```

---

## Environment

- **macOS** (darwin, MacBookPro)
- **Node.js** 23.11.0 (via Homebrew)
- **npm** 11.3.0
- **git** 2.48.1
- **gh** (GitHub CLI) 2.86.0 — authenticated as `vinny2020`
- **Expo SDK** 52.0.49
- **React Native** 0.76.5 (Expo recommends 0.76.9 — safe to update via `npx expo install react-native`)
- **TypeScript** 5.3.3

---

## Design Philosophy

The app follows a **dark luxury editorial** aesthetic:
- Near-black backgrounds create depth and focus
- Gold (#D4A843) is used sparingly as a single accent — never overused
- Playfair Display gives editorial gravitas to headings and prices
- DM Mono gives a precise, technical feel to labels, eyebrows, and metadata
- Geometric decorative elements (rotated squares, diamond dividers) reference
  art deco barbershop tradition
- All interactive elements have clear active/selected states using gold borders
  and slightly lighter backgrounds (Colors.graphite)

**Rule:** If you're adding a new UI element, ask: does this element earn its
gold? Gold is reserved for active states, CTAs, prices, and accent dividers.
Everything else should be in the obsidian/charcoal/ivory range.
