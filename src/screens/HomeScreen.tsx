import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Animated,
  TouchableOpacity, Dimensions, Platform,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GoldDivider, GoldButton, ServiceCard, TestimonialCard } from '../components';
import { SERVICES, TESTIMONIALS } from '../data';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function HomeScreen({ navigation }: any) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroDecorTop} />
        <Animated.View style={[styles.heroContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.heroEyebrow}>EST. 2009  ·  ATLANTA, GA</Text>
          <GoldDivider style={{ marginVertical: Spacing.lg, width: 180, alignSelf: 'center' }} />
          <Text style={styles.heroTitle}>{"The Art\nof the Cut"}</Text>
          <Text style={styles.heroTagline}>Precision. Tradition. Refinement.</Text>
          <View style={styles.heroCTA}>
            <GoldButton label="BOOK NOW" onPress={() => navigation.navigate('Book')} style={{ minWidth: 160 }} />
            <GoldButton label="OUR SERVICES" onPress={() => navigation.navigate('Services')} variant="outline" style={{ minWidth: 160 }} />
          </View>
        </Animated.View>
        <View style={styles.heroDecorBottom} />
        <View style={styles.heroGeoLeft} />
        <View style={styles.heroGeoRight} />
      </View>

      <View style={styles.statsBar}>
        {[
          { value: '15+', label: 'Years' },
          { value: '3',   label: 'Master\nBarbers' },
          { value: '4.9', label: 'Avg Rating' },
          { value: '8K+', label: 'Clients Served' },
        ].map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <View style={styles.statDivider} />}
            <View style={styles.stat}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.eyebrow}>OUR CRAFT</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Services')}>
            <Text style={styles.seeAll}>View All →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <GoldDivider style={{ marginBottom: Spacing.xl }} />
        {SERVICES.filter(s => s.popular).map(service => (
          <ServiceCard key={service.id} {...service} onPress={() => navigation.navigate('Book', { serviceId: service.id })} />
        ))}
      </View>

      <View style={styles.marquee}>
        {['PRECISION CUTS', '·', 'STRAIGHT RAZOR SHAVES', '·', 'BEARD SCULPTING', '·', 'LUXURY GROOMING', '·'].map((t, i) => (
          <Text key={i} style={t === '·' ? styles.marqueeDot : styles.marqueeText}>{t} </Text>
        ))}
      </View>

      <View style={[styles.section, { paddingHorizontal: 0 }]}>
        <View style={{ paddingHorizontal: Spacing.xl }}>
          <Text style={styles.eyebrow}>WHAT THEY SAY</Text>
          <Text style={styles.sectionTitle}>Client Stories</Text>
          <GoldDivider style={{ marginBottom: Spacing.xl }} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.testimonialScroll}>
          {TESTIMONIALS.map(t => <TestimonialCard key={t.id} {...t} />)}
        </ScrollView>
      </View>

      <View style={styles.hoursSection}>
        <Text style={styles.eyebrow}>FIND US</Text>
        <Text style={styles.sectionTitle}>Hours & Location</Text>
        <GoldDivider style={{ marginVertical: Spacing.lg }} />
        {[
          { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
          { day: 'Saturday',        hours: '8:00 AM – 6:00 PM' },
          { day: 'Sunday',          hours: '10:00 AM – 4:00 PM' },
        ].map(h => (
          <View key={h.day} style={styles.hoursRow}>
            <Text style={styles.hoursDay}>{h.day}</Text>
            <View style={styles.hoursDots} />
            <Text style={styles.hoursTime}>{h.hours}</Text>
          </View>
        ))}
        <Text style={styles.address}>247 Peachtree St NE, Atlanta, GA 30303</Text>
        <GoldButton label="GET DIRECTIONS" variant="outline" onPress={() => {}} style={{ marginTop: Spacing.xl, alignSelf: 'center' }} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLogo}>OBSIDIAN</Text>
        <Text style={styles.footerSub}>BARBERSHOP</Text>
        <GoldDivider style={{ marginVertical: Spacing.lg, width: 120, alignSelf: 'center' }} />
        <Text style={styles.footerCopy}>© 2025 Obsidian Barbershop. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content:   { alignItems: 'stretch' },
  hero: {
    minHeight: isWeb ? 600 : 520, backgroundColor: Colors.charcoal,
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: Spacing['4xl'], paddingHorizontal: Spacing.xl,
    overflow: 'hidden', position: 'relative',
  },
  heroDecorTop:    { position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: Colors.gold },
  heroDecorBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: Colors.gold },
  heroGeoLeft: {
    position: 'absolute', left: -40, top: '20%',
    width: 200, height: 200, borderWidth: 1, borderColor: Colors.borderGold,
    transform: [{ rotate: '30deg' }], opacity: 0.4,
  },
  heroGeoRight: {
    position: 'absolute', right: -60, bottom: '15%',
    width: 250, height: 250, borderWidth: 1, borderColor: Colors.borderGold,
    transform: [{ rotate: '20deg' }], opacity: 0.3,
  },
  heroContent:  { alignItems: 'center', zIndex: 1 },
  heroEyebrow:  { fontFamily: Typography.fontMono, fontSize: 11, letterSpacing: 4, color: Colors.gold, marginBottom: Spacing.sm },
  heroTitle:    { fontFamily: Typography.fontDisplayB, fontSize: isWeb ? 72 : 52, color: Colors.ivory, textAlign: 'center', lineHeight: isWeb ? 78 : 56, marginBottom: Spacing.lg },
  heroTagline:  { fontFamily: Typography.fontDisplayI, fontSize: 18, color: Colors.silver, textAlign: 'center', letterSpacing: 1, marginBottom: Spacing.xxl },
  heroCTA:      { flexDirection: isWeb ? 'row' : 'column', gap: Spacing.md, alignItems: 'center' },
  statsBar:     { flexDirection: 'row', backgroundColor: Colors.goldDeep, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, justifyContent: 'space-around', alignItems: 'center' },
  stat:         { alignItems: 'center', flex: 1 },
  statValue:    { fontFamily: Typography.fontDisplayB, fontSize: 22, color: Colors.ivory },
  statLabel:    { fontFamily: Typography.fontMono, fontSize: 9, letterSpacing: 2, color: Colors.goldPale, textAlign: 'center', marginTop: 4 },
  statDivider:  { width: 1, height: 36, backgroundColor: 'rgba(240,237,232,0.2)' },
  section:      { padding: Spacing.xl, paddingTop: Spacing.xxl },
  sectionRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  eyebrow:      { fontFamily: Typography.fontMono, fontSize: 11, letterSpacing: 4, color: Colors.gold },
  seeAll:       { fontFamily: Typography.fontMono, fontSize: 11, letterSpacing: 1, color: Colors.textMuted },
  sectionTitle: { fontFamily: Typography.fontDisplayB, fontSize: 30, color: Colors.ivory, marginBottom: Spacing.md },
  marquee:          { flexDirection: 'row', backgroundColor: Colors.graphite, paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, flexWrap: 'nowrap', overflow: 'hidden' },
  marqueeText:      { fontFamily: Typography.fontMonoM, fontSize: 11, letterSpacing: 3, color: Colors.textMuted },
  marqueeDot:       { color: Colors.gold, paddingHorizontal: 6 },
  testimonialScroll:{ paddingHorizontal: Spacing.xl, paddingBottom: Spacing.md },
  hoursSection: {
    padding: Spacing.xl, paddingVertical: Spacing.xxl, backgroundColor: Colors.charcoal,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.border, alignItems: 'stretch',
  },
  hoursRow:   { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  hoursDay:   { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.silver, width: 150 },
  hoursDots:  { flex: 1, height: 1, borderBottomWidth: 1, borderStyle: 'dotted', borderColor: Colors.steel, marginHorizontal: Spacing.sm },
  hoursTime:  { fontFamily: Typography.fontMonoM, fontSize: 13, color: Colors.ivory },
  address:    { fontFamily: Typography.fontMono, fontSize: 12, letterSpacing: 1, color: Colors.textMuted, textAlign: 'center', marginTop: Spacing.xl },
  footer: {
    backgroundColor: Colors.obsidian, alignItems: 'center',
    paddingVertical: Spacing.xxl, paddingHorizontal: Spacing.xl,
    borderTopWidth: 2, borderTopColor: Colors.gold,
  },
  footerLogo: { fontFamily: Typography.fontDisplayB, fontSize: 28, letterSpacing: 8, color: Colors.ivory },
  footerSub:  { fontFamily: Typography.fontMono, fontSize: 11, letterSpacing: 8, color: Colors.gold, marginTop: 4 },
  footerCopy: { fontFamily: Typography.fontMono, fontSize: 10, color: Colors.textDim, letterSpacing: 1, textAlign: 'center' },
});
