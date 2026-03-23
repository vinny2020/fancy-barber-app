import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Platform, Modal } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import { GoldDivider, GoldButton } from '../components';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const GALLERY_ITEMS = [
  { id: '1',  label: 'Skin Fade',        style: 'fade',    size: 'large',  color: '#1A1510' },
  { id: '2',  label: 'Beard Sculpt',     style: 'beard',   size: 'small',  color: '#101510' },
  { id: '3',  label: 'Classic Taper',    style: 'taper',   size: 'small',  color: '#121018' },
  { id: '4',  label: 'Straight Razor',   style: 'shave',   size: 'medium', color: '#181210' },
  { id: '5',  label: 'Textured Top',     style: 'texture', size: 'small',  color: '#0E1418' },
  { id: '6',  label: 'High Fade',        style: 'fade',    size: 'small',  color: '#141414' },
  { id: '7',  label: 'Low Fade + Beard', style: 'combo',   size: 'large',  color: '#100E14' },
  { id: '8',  label: 'Executive Cut',    style: 'exec',    size: 'medium', color: '#0A1210' },
  { id: '9',  label: 'Shape-Up',         style: 'shapeup', size: 'small',  color: '#1A1008' },
  { id: '10', label: 'Curly Crop',       style: 'curly',   size: 'small',  color: '#121418' },
];

const STYLE_ACCENT: Record<string, string> = {
  fade: Colors.gold, beard: '#8B9B6A', taper: '#9A7A5A', shave: '#7A9A8A',
  texture: '#8A7AAA', combo: Colors.gold, exec: '#AA9A7A', shapeup: '#9A8A6A', curly: '#8A9AAA',
};

const FILTERS = ['All', 'Fade', 'Beard', 'Shave', 'Classic'];

function GalleryPlaceholder({ item, small, large }: { item: any; small?: boolean; large?: boolean }) {
  const accent = STYLE_ACCENT[item.style] || Colors.gold;
  const size = large ? 120 : small ? 40 : 72;
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: accent + '60', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}>
        <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, backgroundColor: accent + '25', borderWidth: 1, borderColor: accent + '80' }} />
      </View>
    </View>
  );
}

export default function GalleryScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>OUR WORK</Text>
        <Text style={styles.title}>The Lookbook</Text>
        <GoldDivider style={{ marginTop: Spacing.md, width: 160, alignSelf: 'center' }} />
        <Text style={styles.subtitle}>A curated selection from our chair. Every cut tells a story.</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow} style={styles.filterBar}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} onPress={() => setActiveFilter(f)} style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}>
            <Text style={[styles.filterLabel, activeFilter === f && styles.filterLabelActive]}>{f.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.grid}>
        {GALLERY_ITEMS.filter(i => i.size === 'large').map(item => (
          <TouchableOpacity key={item.id} onPress={() => setSelected(item)} style={styles.gridItemLarge} activeOpacity={0.85}>
            <View style={[styles.imagePlaceholder, { backgroundColor: item.color }]}><GalleryPlaceholder item={item} /></View>
            <View style={styles.gridLabel}><Text style={styles.gridLabelText}>{item.label.toUpperCase()}</Text></View>
          </TouchableOpacity>
        ))}
        <View style={styles.gridRow}>
          {GALLERY_ITEMS.filter(i => i.size !== 'large').map((item, idx) => (
            <TouchableOpacity key={item.id} onPress={() => setSelected(item)} style={[styles.gridItemSmall, idx % 3 === 0 && styles.gridItemMedium]} activeOpacity={0.85}>
              <View style={[styles.imagePlaceholderSm, { backgroundColor: item.color }]}><GalleryPlaceholder item={item} small /></View>
              <Text style={styles.gridLabelSmall}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsStrip}>
        {[{ value: '200+', label: 'Styles Monthly' }, { value: '5★', label: 'Avg Review' }, { value: '8K+', label: 'Happy Clients' }].map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <View style={styles.statDiv} />}
            <View style={styles.statItem}><Text style={styles.statVal}>{s.value}</Text><Text style={styles.statLbl}>{s.label}</Text></View>
          </React.Fragment>
        ))}
      </View>

      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Like What You See?</Text>
        <Text style={styles.ctaBody}>Book your session and leave looking your best.</Text>
        <GoldButton label="BOOK YOUR APPOINTMENT" onPress={() => navigation.navigate('Book')} style={{ marginTop: Spacing.xl, alignSelf: 'center' }} />
      </View>

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setSelected(null)}>
          {selected && (
            <View style={styles.modalCard}>
              <View style={[styles.modalImage, { backgroundColor: selected.color }]}><GalleryPlaceholder item={selected} large /></View>
              <View style={styles.modalInfo}>
                <Text style={styles.modalStyle}>{selected.style.toUpperCase()}</Text>
                <Text style={styles.modalName}>{selected.label}</Text>
                <GoldButton label="BOOK THIS STYLE" onPress={() => { setSelected(null); navigation.navigate('Book'); }} style={{ marginTop: Spacing.lg }} />
              </View>
              <TouchableOpacity onPress={() => setSelected(null)} style={styles.modalClose}><Text style={styles.modalCloseText}>✕</Text></TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header:    { backgroundColor: Colors.charcoal, padding: Spacing.xl, paddingTop: Spacing.xxl, paddingBottom: Spacing.xxl, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.border },
  eyebrow:   { fontFamily: Typography.fontMono, fontSize: 11, letterSpacing: 4, color: Colors.gold, marginBottom: Spacing.sm },
  title:     { fontFamily: Typography.fontDisplayB, fontSize: isWeb ? 48 : 36, color: Colors.ivory, textAlign: 'center' },
  subtitle:  { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, marginTop: Spacing.lg, maxWidth: 380 },
  filterBar:         { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  filterRow:         { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, gap: Spacing.sm },
  filterChip:        { borderWidth: 1, borderColor: Colors.steel, paddingVertical: 6, paddingHorizontal: Spacing.md },
  filterChipActive:  { backgroundColor: Colors.gold, borderColor: Colors.gold },
  filterLabel:       { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 2, color: Colors.textMuted },
  filterLabelActive: { color: Colors.obsidian },
  grid:              { padding: Spacing.lg },
  gridItemLarge:     { marginBottom: Spacing.md },
  imagePlaceholder:  { height: 220, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
  gridLabel:         { backgroundColor: Colors.graphite, paddingVertical: 8, paddingHorizontal: Spacing.md, borderWidth: 1, borderTopWidth: 0, borderColor: Colors.border },
  gridLabelText:     { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 3, color: Colors.gold },
  gridRow:           { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  gridItemSmall:     { width: (width - Spacing.lg * 2 - Spacing.sm * 2) / 3, marginBottom: Spacing.sm },
  gridItemMedium:    { width: (width - Spacing.lg * 2 - Spacing.sm) / 2 },
  imagePlaceholderSm:{ aspectRatio: 1, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
  gridLabelSmall:    { fontFamily: Typography.fontMono, fontSize: 8, letterSpacing: 1, color: Colors.textDim, marginTop: 4 },
  statsStrip: { flexDirection: 'row', backgroundColor: Colors.charcoal, paddingVertical: Spacing.lg, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.border, justifyContent: 'space-around', alignItems: 'center' },
  statItem:   { alignItems: 'center', flex: 1 },
  statVal:    { fontFamily: Typography.fontDisplayB, fontSize: 22, color: Colors.ivory },
  statLbl:    { fontFamily: Typography.fontMono, fontSize: 9, letterSpacing: 2, color: Colors.textMuted, marginTop: 4, textAlign: 'center' },
  statDiv:    { width: 1, height: 36, backgroundColor: Colors.border },
  cta:        { padding: Spacing.xl, paddingVertical: Spacing.xxl, alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.border },
  ctaTitle:   { fontFamily: Typography.fontDisplayB, fontSize: 28, color: Colors.ivory, textAlign: 'center' },
  ctaBody:    { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textMuted, marginTop: Spacing.sm, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.88)', alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  modalCard:    { backgroundColor: Colors.charcoal, borderWidth: 1, borderColor: Colors.borderGold, width: '100%', maxWidth: 400, overflow: 'hidden' },
  modalImage:   { height: 280 },
  modalInfo:    { padding: Spacing.lg },
  modalStyle:   { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 3, color: Colors.gold, marginBottom: Spacing.sm },
  modalName:    { fontFamily: Typography.fontDisplayB, fontSize: 24, color: Colors.ivory },
  modalClose:   { position: 'absolute', top: Spacing.md, right: Spacing.md, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(10,10,10,0.7)', alignItems: 'center', justifyContent: 'center' },
  modalCloseText: { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.pearl },
});
