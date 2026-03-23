export const Colors = {
  // Core palette
  obsidian:   '#0A0A0A',
  charcoal:   '#111111',
  carbon:     '#1A1A1A',
  graphite:   '#242424',
  ash:        '#2E2E2E',
  steel:      '#3A3A3A',
  smoke:      '#666666',
  silver:     '#999999',
  pearl:      '#CCCCCC',
  ivory:      '#F0EDE8',
  white:      '#FFFFFF',

  // Gold accent system
  goldDeep:   '#8B6914',
  goldMid:    '#C49A2A',
  gold:       '#D4A843',
  goldLight:  '#E8C468',
  goldPale:   '#F5DFA0',

  // Semantic
  background: '#0A0A0A',
  surface:    '#111111',
  surfaceAlt: '#1A1A1A',
  border:     '#2A2A2A',
  borderGold: 'rgba(212,168,67,0.3)',
  text:       '#F0EDE8',
  textMuted:  '#888888',
  textDim:    '#555555',
  accent:     '#D4A843',
  accentDark: '#8B6914',
};

// Font family names must match exact keys used in useFonts()
export const Typography = {
  fontDisplay:  'PlayfairDisplay_400Regular',
  fontDisplayI: 'PlayfairDisplay_400Regular_Italic',
  fontDisplayB: 'PlayfairDisplay_700Bold',
  fontBody:     'DMSans_400Regular',
  fontBodyM:    'DMSans_500Medium',
  fontMono:     'DMMono_400Regular',
  fontMonoM:    'DMMono_500Medium',
};

export const Spacing = {
  xs:    4,
  sm:    8,
  md:    16,
  lg:    24,
  xl:    32,
  xxl:   48,
  '3xl': 64,
  '4xl': 96,
};

export const Radius = {
  sm:   4,
  md:   8,
  lg:   16,
  xl:   24,
  full: 9999,
};

export const Shadow = {
  gold: {
    shadowColor: '#D4A843',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  dark: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
};
