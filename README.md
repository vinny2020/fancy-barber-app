# Fancy Barber App — Obsidian Barbershop

A modern, luxury barbershop app built with **React Native + Expo**, running natively on iOS, Android, and the web from a single codebase.

## Aesthetic

Dark luxury editorial — obsidian blacks, charcoal surfaces, warm gold (#D4A843) accents. Typography pairs **Playfair Display** (editorial serif) with **DM Mono** (mechanical labels/prices) for a high-end grooming house feel.

## Screens

| Screen | Description |
|--------|-------------|
| **Home** | Animated hero, stats bar, popular services, testimonials, hours |
| **Services** | Filterable service catalog with pricing |
| **Book** | 4-step booking flow: Service → Barber → Date/Time → Confirm |
| **Gallery** | Lookbook grid with lightbox |
| **Team** | Barber profiles with specialties, ratings, availability |

## Tech Stack

- **Expo SDK 52** — managed workflow
- **React Native + React Native Web** — one codebase, all platforms
- **React Navigation** — Bottom Tabs + Native Stack
- **Expo Google Fonts** — Playfair Display, DM Sans, DM Mono
- **TypeScript** throughout — strict mode, zero errors

## Getting Started

```bash
npm install
npx expo start        # choose platform from menu
npx expo start --web  # open directly in browser
```

## Project Structure

```
fancy-barber-app/
├── App.tsx                    # Root: font loading + navigator
├── app.json                   # Expo config
├── src/
│   ├── theme/index.ts         # Colors, typography, spacing tokens
│   ├── data/index.ts          # Services, barbers, mock data
│   ├── components/index.tsx   # Shared UI components
│   ├── navigation/index.tsx   # Custom tab bar + header
│   └── screens/
│       ├── HomeScreen.tsx
│       ├── ServicesScreen.tsx
│       ├── BookScreen.tsx
│       ├── GalleryScreen.tsx
│       └── BarbersScreen.tsx
└── assets/
```

## Deploy

```bash
# Web
npx expo export --platform web
# Deploy dist/ to Vercel / Netlify

# Mobile (EAS)
npm install -g eas-cli && eas login
eas build --platform all
```

---
*Obsidian Barbershop © 2025 — Built by vinny2020*
