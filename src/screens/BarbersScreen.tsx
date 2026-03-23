import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import { GoldDivider, GoldButton } from '../components';
import { BARBERS } from '../data';

const isWeb = Platform.OS === 'web';

export default function BarbersScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>THE TEAM</Text>
        <Text style={styles.title}>Our Barbers</Text>
        <GoldDivider style={{ marginTop: Spacing.md, width: 180, alignSelf: 'center' }} />
        <Text style={styles.subtitle}>Seasoned professionals who've spent years mastering their craft. Every barber at Obsidian is hand-selected for skill, precision, and character.</Text>
      </View>

      <View style={styles.content}>
        {BARBERS.map(b => (
          <View key={b.id} style={styles.barberBlock}>
            <View style={styles.barberTop}>
              <View style={[styles.avatar, { backgroundColor: b.color }]}><Text style={styles.avatarInitial}>{b.initial}</Text></View>
              <View style={{ flex: 1, marginLeft: Spacing.lg }}>
                <Text style={styles.barberName}>{b.name}</Text>
                <Text style={styles.barberTitle}>{b.title}</Text>
                <Text style={styles.barberExp}>{b.experience} of experience</Text>
              </View>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingVal}>{b.rating}</Text>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingReviews}>{b.reviews}</Text>
              </View>
            </View>
            <View style={styles.specialties}>
              {b.specialties.map(s => (
                <View key={s} style={styles.specTag}><Text style={styles.specText}>{s}</Text></View>
              ))}
            </View>
            <View style={styles.barberFooter}>
              <View style={styles.availRow}>
                <View style={[styles.availDot, { backgroundColor: b.available ? '#4CAF50' : Colors.steel }]} />
                <Text style={styles.availText}>{b.available ? 'Available Today' : 'Not Available Today'}</Text>
              </View>
              <GoldButton label="BOOK" onPress={() => navigation.navigate('Book')} variant={b.available ? 'solid' : 'outline'} style={{ paddingVertical: 8, paddingHorizontal: Spacing.md }} />
            </View>
            <View style={styles.blockDivider} />
          </View>
        ))}
      </View>

      <View style={styles.philosophy}>
        <Text style={styles.eyebrow}>OUR STANDARD</Text>
        <Text style={styles.philTitle}>The Obsidian Standard</Text>
        <GoldDivider style={{ marginVertical: Spacing.lg }} />
        {[
          { icon: '✦', title: 'Precision First',      desc: 'Every line, every fade, every edge is executed with surgical intent.' },
          { icon: '✦', title: 'Continuous Learning',  desc: 'Our barbers train regularly on emerging techniques and trends.' },
          { icon: '✦', title: 'Client-Centered',      desc: 'We listen before we cut. Your vision guides every service.' },
        ].map(p => (
          <View key={p.title} style={styles.philRow}>
            <Text style={styles.philIcon}>{p.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.philItemTitle}>{p.title}</Text>
              <Text style={styles.philItemDesc}>{p.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header:    { backgroundColor: Colors.charcoal, padding: Spacing.xl, paddingTop: Spacing.xxl, paddingBottom: Spacing.xxl, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.border },
  eyebrow:   { fontFamily: Typography.fontMono, fontSize: 11, letterSpacing: 4, color: Colors.gold, marginBottom: Spacing.sm },
  title:     { fontFamily: Typography.fontDisplayB, fontSize: isWeb ? 48 : 36, color: Colors.ivory, textAlign: 'center' },
  subtitle:  { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, marginTop: Spacing.lg, maxWidth: 400 },
  content:        { padding: Spacing.xl },
  barberBlock:    { marginBottom: Spacing.sm },
  barberTop:      { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  avatar:         { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.borderGold },
  avatarInitial:  { fontFamily: Typography.fontDisplayB, fontSize: 28, color: Colors.gold },
  barberName:     { fontFamily: Typography.fontDisplayB, fontSize: 22, color: Colors.ivory },
  barberTitle:    { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.gold, marginTop: 2 },
  barberExp:      { fontFamily: Typography.fontMono, fontSize: 11, color: Colors.textDim, marginTop: 4 },
  ratingBox:      { alignItems: 'center' },
  ratingVal:      { fontFamily: Typography.fontDisplayB, fontSize: 24, color: Colors.ivory },
  ratingStar:     { fontSize: 14, color: Colors.gold },
  ratingReviews:  { fontFamily: Typography.fontMono, fontSize: 9, color: Colors.textDim, marginTop: 2 },
  specialties:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.md },
  specTag:        { borderWidth: 1, borderColor: Colors.borderGold, paddingHorizontal: 10, paddingVertical: 4 },
  specText:       { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 1, color: Colors.gold },
  barberFooter:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  availRow:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
  availDot:       { width: 8, height: 8, borderRadius: 4 },
  availText:      { fontFamily: Typography.fontMono, fontSize: 11, color: Colors.textMuted },
  blockDivider:   { height: 1, backgroundColor: Colors.border, marginTop: Spacing.lg, marginBottom: Spacing.lg },
  philosophy:     { backgroundColor: Colors.charcoal, padding: Spacing.xl, paddingVertical: Spacing.xxl, borderTopWidth: 1, borderTopColor: Colors.border },
  philTitle:      { fontFamily: Typography.fontDisplayB, fontSize: 28, color: Colors.ivory, marginTop: Spacing.sm },
  philRow:        { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.lg, gap: Spacing.md },
  philIcon:       { fontSize: 14, color: Colors.gold, marginTop: 2 },
  philItemTitle:  { fontFamily: Typography.fontDisplayB, fontSize: 16, color: Colors.ivory, marginBottom: 4 },
  philItemDesc:   { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textMuted, lineHeight: 20 },
});
