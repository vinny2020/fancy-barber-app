import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import { GoldDivider, ServiceCard } from '../components';
import { SERVICES } from '../data';

const CATEGORIES = ['All', 'Haircut', 'Shave', 'Beard', 'Combo'];
const isWeb = Platform.OS === 'web';

export default function ServicesScreen({ navigation }: any) {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? SERVICES : SERVICES.filter(s => s.category === active);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>WHAT WE OFFER</Text>
        <Text style={styles.title}>Our Services</Text>
        <GoldDivider style={{ marginTop: Spacing.md, width: 200, alignSelf: 'center' }} />
        <Text style={styles.subtitle}>
          Every service is crafted with precision tools, premium products, and the expertise of our master barbers.
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll} style={styles.filterBar}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat} onPress={() => setActive(cat)} style={[styles.filterChip, active === cat && styles.filterChipActive]}>
            <Text style={[styles.filterLabel, active === cat && styles.filterLabelActive]}>{cat.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.list}>
        {filtered.map(service => (
          <ServiceCard key={service.id} {...service} onPress={() => navigation.navigate('Book', { serviceId: service.id })} />
        ))}
      </View>
      <View style={styles.note}>
        <Text style={styles.noteText}>
          All services include complimentary hot towel treatment and premium styling finish. Prices may vary based on hair length and complexity.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.charcoal, padding: Spacing.xl,
    paddingTop: Spacing.xxl, paddingBottom: Spacing.xxl,
    alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  eyebrow:  { fontFamily: Typography.fontMono, fontSize: 11, letterSpacing: 4, color: Colors.gold, marginBottom: Spacing.sm },
  title:    { fontFamily: Typography.fontDisplayB, fontSize: isWeb ? 48 : 36, color: Colors.ivory, textAlign: 'center' },
  subtitle: { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, marginTop: Spacing.lg, maxWidth: 400 },
  filterBar:         { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  filterScroll:      { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, gap: Spacing.sm },
  filterChip:        { borderWidth: 1, borderColor: Colors.steel, paddingVertical: 6, paddingHorizontal: Spacing.md },
  filterChipActive:  { backgroundColor: Colors.gold, borderColor: Colors.gold },
  filterLabel:       { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 2, color: Colors.textMuted },
  filterLabelActive: { color: Colors.obsidian },
  list: { padding: Spacing.xl },
  note: { margin: Spacing.xl, marginTop: 0, padding: Spacing.md, borderLeftWidth: 2, borderLeftColor: Colors.steel },
  noteText: { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textDim, lineHeight: 20, fontStyle: 'italic' },
});
