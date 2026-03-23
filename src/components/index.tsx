import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';

// ─── Gold Divider ─────────────────────────────────────────────
export function GoldDivider({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.dividerWrap, style]}>
      <View style={styles.dividerLine} />
      <View style={styles.dividerDiamond} />
      <View style={styles.dividerLine} />
    </View>
  );
}

// ─── Section Header ───────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  style?: ViewStyle;
}
export function SectionHeader({ eyebrow, title, style }: SectionHeaderProps) {
  return (
    <View style={[styles.sectionHeader, style]}>
      {eyebrow ? (
        <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>
      ) : null}
      <Text style={styles.sectionTitle}>{title}</Text>
      <GoldDivider style={{ marginTop: Spacing.md }} />
    </View>
  );
}

// ─── Gold Button ──────────────────────────────────────────────
interface GoldButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}
export function GoldButton({
  label, onPress, variant = 'solid', style, textStyle, fullWidth,
}: GoldButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.btn,
        variant === 'solid'   && styles.btnSolid,
        variant === 'outline' && styles.btnOutline,
        variant === 'ghost'   && styles.btnGhost,
        fullWidth && { width: '100%' },
        style,
      ]}
    >
      <Text style={[
        styles.btnText,
        variant === 'outline' && styles.btnTextOutline,
        variant === 'ghost'   && styles.btnTextGhost,
        textStyle,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Service Card ─────────────────────────────────────────────
interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  popular?: boolean;
  onPress?: () => void;
}
export function ServiceCard({
  name, description, price, duration, category, popular, onPress,
}: ServiceCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.serviceCard}
    >
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>POPULAR</Text>
        </View>
      )}
      <View style={styles.serviceTop}>
        <Text style={styles.serviceCategory}>{category.toUpperCase()}</Text>
        <Text style={styles.servicePrice}>${price}</Text>
      </View>
      <Text style={styles.serviceName}>{name}</Text>
      <Text style={styles.serviceDesc}>{description}</Text>
      <View style={styles.serviceMeta}>
        <Text style={styles.serviceDuration}>⏱ {duration} min</Text>
        <Text style={styles.serviceBook}>Book →</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Barber Card ──────────────────────────────────────────────
interface BarberCardProps {
  name: string;
  title: string;
  experience: string;
  specialties: string[];
  rating: number;
  reviews: number;
  available: boolean;
  color: string;
  initial: string;
  onPress?: () => void;
}
export function BarberCard({
  name, title, experience, specialties, rating, reviews, available, color, initial, onPress,
}: BarberCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.barberCard}>
      <View style={[styles.barberAvatar, { backgroundColor: color }]}>
        <Text style={styles.barberInitial}>{initial}</Text>
        <View style={[styles.availDot, { backgroundColor: available ? '#4CAF50' : Colors.steel }]} />
      </View>
      <View style={styles.barberInfo}>
        <Text style={styles.barberName}>{name}</Text>
        <Text style={styles.barberTitle}>{title} · {experience}</Text>
        <View style={styles.barberSpecialties}>
          {specialties.slice(0, 2).map(s => (
            <View key={s} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{s}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.barberRating}>
        <Text style={styles.ratingValue}>{rating}</Text>
        <Text style={styles.ratingGold}>★</Text>
        <Text style={styles.reviewCount}>{reviews} reviews</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────
interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  service: string;
}
export function TestimonialCard({ name, text, rating, service }: TestimonialCardProps) {
  return (
    <View style={styles.testimonialCard}>
      <Text style={styles.testimonialStars}>{'★'.repeat(rating)}</Text>
      <Text style={styles.testimonialText}>"{text}"</Text>
      <View style={styles.testimonialMeta}>
        <Text style={styles.testimonialName}>{name}</Text>
        <Text style={styles.testimonialService}>{service}</Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  dividerWrap: { flexDirection: 'row', alignItems: 'center' },
  dividerLine:    { flex: 1, height: 1, backgroundColor: Colors.borderGold },
  dividerDiamond: {
    width: 6, height: 6, backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }], marginHorizontal: Spacing.sm,
  },
  sectionHeader: { alignItems: 'center', paddingHorizontal: Spacing.xl },
  eyebrow: {
    fontFamily: Typography.fontMono, fontSize: 11,
    letterSpacing: 4, color: Colors.gold, marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: Typography.fontDisplayB, fontSize: 32,
    color: Colors.ivory, textAlign: 'center', lineHeight: 38,
  },
  btn: {
    paddingVertical: 14, paddingHorizontal: Spacing.xl,
    borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center',
  },
  btnSolid:   { backgroundColor: Colors.gold },
  btnOutline: { borderWidth: 1, borderColor: Colors.gold },
  btnGhost:   {},
  btnText:        { fontFamily: Typography.fontMonoM, fontSize: 13, letterSpacing: 2, color: Colors.obsidian },
  btnTextOutline: { color: Colors.gold },
  btnTextGhost:   { color: Colors.silver },
  serviceCard: {
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.lg, marginBottom: Spacing.md, position: 'relative',
  },
  popularBadge: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: Colors.goldDeep, paddingHorizontal: 10, paddingVertical: 4,
  },
  popularText: { fontFamily: Typography.fontMono, fontSize: 9, letterSpacing: 2, color: Colors.goldPale },
  serviceTop:  { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  serviceCategory: { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 3, color: Colors.gold },
  servicePrice:    { fontFamily: Typography.fontDisplayB, fontSize: 22, color: Colors.ivory },
  serviceName:     { fontFamily: Typography.fontDisplayB, fontSize: 20, color: Colors.ivory, marginBottom: Spacing.sm },
  serviceDesc:     { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textMuted, lineHeight: 22, marginBottom: Spacing.md },
  serviceMeta:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceDuration: { fontFamily: Typography.fontMono, fontSize: 12, color: Colors.textDim },
  serviceBook:     { fontFamily: Typography.fontMonoM, fontSize: 12, color: Colors.gold, letterSpacing: 1 },
  barberCard: {
    flexDirection: 'row', backgroundColor: Colors.surface, borderWidth: 1,
    borderColor: Colors.border, padding: Spacing.md, marginBottom: Spacing.md, alignItems: 'center',
  },
  barberAvatar: {
    width: 60, height: 60, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center',
    marginRight: Spacing.md, borderWidth: 1, borderColor: Colors.borderGold, position: 'relative',
  },
  barberInitial:  { fontFamily: Typography.fontDisplayB, fontSize: 22, color: Colors.gold },
  availDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 10, height: 10, borderRadius: Radius.full, borderWidth: 2, borderColor: Colors.surface,
  },
  barberInfo:        { flex: 1 },
  barberName:        { fontFamily: Typography.fontDisplayB, fontSize: 17, color: Colors.ivory, marginBottom: 2 },
  barberTitle:       { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textMuted, marginBottom: 8 },
  barberSpecialties: { flexDirection: 'row', gap: 6 },
  specialtyTag:      { borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 6, paddingVertical: 2 },
  specialtyText:     { fontFamily: Typography.fontMono, fontSize: 9, letterSpacing: 1, color: Colors.textDim },
  barberRating:      { alignItems: 'center' },
  ratingValue:       { fontFamily: Typography.fontDisplayB, fontSize: 18, color: Colors.ivory },
  ratingGold:        { fontSize: 13, color: Colors.gold },
  reviewCount:       { fontFamily: Typography.fontMono, fontSize: 9, color: Colors.textDim, marginTop: 2 },
  testimonialCard: {
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    borderLeftWidth: 2, borderLeftColor: Colors.gold, padding: Spacing.lg, marginRight: Spacing.md, width: 300,
  },
  testimonialStars:   { fontSize: 14, color: Colors.gold, marginBottom: Spacing.sm, letterSpacing: 2 },
  testimonialText:    { fontFamily: Typography.fontDisplayI, fontSize: 15, color: Colors.pearl, lineHeight: 24, marginBottom: Spacing.md },
  testimonialMeta:    { flexDirection: 'row', justifyContent: 'space-between' },
  testimonialName:    { fontFamily: Typography.fontMonoM, fontSize: 11, color: Colors.ivory, letterSpacing: 1 },
  testimonialService: { fontFamily: Typography.fontMono, fontSize: 11, color: Colors.textDim },
});
