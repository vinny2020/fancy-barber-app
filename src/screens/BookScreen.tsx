import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GoldButton, GoldDivider } from '../components';
import { SERVICES, BARBERS, TIMES } from '../data';

const STEPS = ['Service', 'Barber', 'Time', 'Confirm'];
const isWeb = Platform.OS === 'web';

const DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i + 1);
  return { date: d, label: d.toLocaleDateString('en-US', { weekday: 'short' }), num: d.getDate(), month: d.toLocaleDateString('en-US', { month: 'short' }) };
});

export default function BookScreen({ route, navigation }: any) {
  const [step,      setStep]      = useState(0);
  const [serviceId, setServiceId] = useState(route?.params?.serviceId || '1');
  const [barberId,  setBarberId]  = useState<string | null>(null);
  const [dayIndex,  setDayIndex]  = useState<number | null>(null);
  const [time,      setTime]      = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const service = SERVICES.find(s => s.id === serviceId);
  const barber  = BARBERS.find(b => b.id === barberId);
  const day     = dayIndex !== null ? DAYS[dayIndex] : null;
  const canNext = [!!serviceId, !!barberId, dayIndex !== null && !!time, true][step];

  function handleNext() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setConfirmed(true);
  }

  if (confirmed) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: Spacing.xl }]}>
        <View style={styles.confirmCheck}><Text style={styles.confirmCheckText}>✓</Text></View>
        <Text style={styles.confirmTitle}>You're Booked</Text>
        <GoldDivider style={{ marginVertical: Spacing.lg, width: 120 }} />
        <Text style={styles.confirmDetail}>{service?.name}</Text>
        <Text style={styles.confirmMeta}>{barber?.name ?? 'First Available'}  ·  {day?.label}, {day?.month} {day?.num}  ·  {time}</Text>
        <Text style={styles.confirmAddress}>247 Peachtree St NE, Atlanta, GA</Text>
        <GoldButton label="DONE" onPress={() => { setConfirmed(false); setStep(0); navigation.navigate('Home'); }} style={{ marginTop: Spacing.xxl, minWidth: 200 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <TouchableOpacity onPress={() => i < step && setStep(i)} style={styles.stepWrap}>
              <View style={[styles.stepDot, i <= step && styles.stepDotActive, i < step && styles.stepDotDone]}>
                {i < step ? <Text style={styles.stepCheck}>✓</Text> : <Text style={[styles.stepNum, i === step && styles.stepNumActive]}>{i + 1}</Text>}
              </View>
              <Text style={[styles.stepLabel, i === step && styles.stepLabelActive]}>{s}</Text>
            </TouchableOpacity>
            {i < STEPS.length - 1 && <View style={[styles.stepLine, i < step && styles.stepLineDone]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {step === 0 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose a Service</Text>
            <GoldDivider style={{ marginBottom: Spacing.xl }} />
            {SERVICES.map(s => (
              <TouchableOpacity key={s.id} onPress={() => setServiceId(s.id)} style={[styles.pickCard, serviceId === s.id && styles.pickCardActive]}>
                <View style={styles.pickCardInner}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pickCardCat}>{s.category.toUpperCase()}</Text>
                    <Text style={styles.pickCardName}>{s.name}</Text>
                    <Text style={styles.pickCardDur}>{s.duration} min</Text>
                  </View>
                  <Text style={styles.pickCardPrice}>${s.price}</Text>
                  {serviceId === s.id && <View style={styles.pickCheckmark}><Text style={styles.pickCheck}>✓</Text></View>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose Your Barber</Text>
            <GoldDivider style={{ marginBottom: Spacing.xl }} />
            <TouchableOpacity onPress={() => setBarberId('any')} style={[styles.pickCard, barberId === 'any' && styles.pickCardActive]}>
              <View style={styles.pickCardInner}>
                <Text style={styles.pickCardName}>No Preference – First Available</Text>
                {barberId === 'any' && <View style={styles.pickCheckmark}><Text style={styles.pickCheck}>✓</Text></View>}
              </View>
            </TouchableOpacity>
            {BARBERS.map(b => (
              <TouchableOpacity key={b.id} onPress={() => b.available && setBarberId(b.id)} style={[styles.pickCard, barberId === b.id && styles.pickCardActive, !b.available && styles.pickCardDisabled]}>
                <View style={[styles.barberPickAvatar, { backgroundColor: b.color }]}><Text style={styles.barberPickInitial}>{b.initial}</Text></View>
                <View style={{ flex: 1, marginLeft: Spacing.md }}>
                  <Text style={styles.pickCardName}>{b.name}</Text>
                  <Text style={styles.pickCardCat}>{b.title} · {b.experience}</Text>
                  {!b.available && <Text style={styles.unavailText}>Unavailable today</Text>}
                </View>
                <Text style={styles.pickCardPrice}>{b.rating}★</Text>
                {barberId === b.id && <View style={styles.pickCheckmark}><Text style={styles.pickCheck}>✓</Text></View>}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Date & Time</Text>
            <GoldDivider style={{ marginBottom: Spacing.xl }} />
            <Text style={styles.subLabel}>DATE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll}>
              {DAYS.map((d, i) => (
                <TouchableOpacity key={i} onPress={() => setDayIndex(i)} style={[styles.dayChip, dayIndex === i && styles.dayChipActive]}>
                  <Text style={[styles.dayLabel, dayIndex === i && styles.dayLabelActive]}>{d.label}</Text>
                  <Text style={[styles.dayNum, dayIndex === i && styles.dayNumActive]}>{d.num}</Text>
                  <Text style={[styles.dayMonth, dayIndex === i && styles.dayMonthActive]}>{d.month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={[styles.subLabel, { marginTop: Spacing.xl }]}>TIME</Text>
            <View style={styles.timeGrid}>
              {TIMES.map(t => (
                <TouchableOpacity key={t} onPress={() => setTime(t)} style={[styles.timeChip, time === t && styles.timeChipActive]}>
                  <Text style={[styles.timeLabel, time === t && styles.timeLabelActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Confirm Booking</Text>
            <GoldDivider style={{ marginBottom: Spacing.xl }} />
            <View style={styles.summaryCard}>
              {[
                { label: 'Service',  value: service?.name ?? '—' },
                { label: 'Duration', value: `${service?.duration ?? 0} min` },
              ].map(r => <SummaryRow key={r.label} label={r.label} value={r.value} />)}
              <SummaryRow label="Price" value={`$${service?.price ?? 0}`} gold />
              <View style={styles.summaryDivider} />
              <SummaryRow label="Barber" value={barber ? barber.name : 'First Available'} />
              <SummaryRow label="Date"   value={day ? `${day.label}, ${day.month} ${day.num}` : '—'} />
              <SummaryRow label="Time"   value={time ?? '—'} />
            </View>
            <Text style={styles.disclaimer}>Cancellations must be made at least 24 hours in advance. A $15 no-show fee may apply.</Text>
          </View>
        )}

        <View style={styles.navRow}>
          {step > 0 && <GoldButton label="← BACK" variant="ghost" onPress={() => setStep(step - 1)} />}
          <GoldButton label={step === STEPS.length - 1 ? 'CONFIRM BOOKING' : 'NEXT →'} onPress={handleNext} style={canNext ? { flex: 1 } : [{ flex: 1 }, styles.btnDisabled] as any} textStyle={!canNext ? { opacity: 0.4 } : undefined} />
        </View>
      </ScrollView>
    </View>
  );
}

function SummaryRow({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, gold && styles.summaryGold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  progress:  { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: Colors.charcoal, borderBottomWidth: 1, borderBottomColor: Colors.border },
  stepWrap:  { alignItems: 'center' },
  stepDot:        { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: Colors.steel, alignItems: 'center', justifyContent: 'center' },
  stepDotActive:  { borderColor: Colors.gold },
  stepDotDone:    { backgroundColor: Colors.goldDeep, borderColor: Colors.goldDeep },
  stepCheck:      { fontFamily: Typography.fontMonoM, fontSize: 12, color: Colors.ivory },
  stepNum:        { fontFamily: Typography.fontMono, fontSize: 11, color: Colors.textDim },
  stepNumActive:  { color: Colors.gold },
  stepLine:       { flex: 1, height: 1, backgroundColor: Colors.steel, marginHorizontal: 4 },
  stepLineDone:   { backgroundColor: Colors.goldDeep },
  stepLabel:      { fontFamily: Typography.fontMono, fontSize: 9, letterSpacing: 1, color: Colors.textDim, marginTop: 4 },
  stepLabelActive:{ color: Colors.gold },
  body:           { flex: 1 },
  stepContent:    { padding: Spacing.xl },
  stepTitle:      { fontFamily: Typography.fontDisplayB, fontSize: 26, color: Colors.ivory, marginBottom: Spacing.md },
  pickCard:         { borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface, padding: Spacing.md, marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center' },
  pickCardActive:   { borderColor: Colors.gold, backgroundColor: Colors.graphite },
  pickCardDisabled: { opacity: 0.4 },
  pickCardInner:    { flex: 1, flexDirection: 'row', alignItems: 'center' },
  pickCardCat:      { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 2, color: Colors.gold, marginBottom: 2 },
  pickCardName:     { fontFamily: Typography.fontDisplayB, fontSize: 16, color: Colors.ivory },
  pickCardDur:      { fontFamily: Typography.fontMono, fontSize: 11, color: Colors.textDim, marginTop: 2 },
  pickCardPrice:    { fontFamily: Typography.fontDisplayB, fontSize: 18, color: Colors.gold, marginLeft: Spacing.md },
  pickCheckmark:    { marginLeft: Spacing.sm, width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center' },
  pickCheck:        { fontFamily: Typography.fontMonoM, fontSize: 11, color: Colors.obsidian },
  barberPickAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.borderGold },
  barberPickInitial:{ fontFamily: Typography.fontDisplayB, fontSize: 18, color: Colors.gold },
  unavailText:      { fontFamily: Typography.fontMono, fontSize: 10, color: Colors.steel, marginTop: 2 },
  subLabel:       { fontFamily: Typography.fontMono, fontSize: 10, letterSpacing: 3, color: Colors.gold, marginBottom: Spacing.sm },
  dayScroll:      { marginBottom: Spacing.sm },
  dayChip:        { width: 58, alignItems: 'center', paddingVertical: Spacing.sm, borderWidth: 1, borderColor: Colors.border, marginRight: Spacing.sm, backgroundColor: Colors.surface },
  dayChipActive:  { borderColor: Colors.gold, backgroundColor: Colors.graphite },
  dayLabel:       { fontFamily: Typography.fontMono, fontSize: 9, letterSpacing: 1, color: Colors.textDim },
  dayLabelActive: { color: Colors.gold },
  dayNum:         { fontFamily: Typography.fontDisplayB, fontSize: 22, color: Colors.pearl, marginVertical: 2 },
  dayNumActive:   { color: Colors.ivory },
  dayMonth:       { fontFamily: Typography.fontMono, fontSize: 9, color: Colors.textDim },
  dayMonthActive: { color: Colors.gold },
  timeGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  timeChip:        { borderWidth: 1, borderColor: Colors.border, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: Colors.surface },
  timeChipActive:  { borderColor: Colors.gold, backgroundColor: Colors.graphite },
  timeLabel:       { fontFamily: Typography.fontMono, fontSize: 11, color: Colors.textMuted },
  timeLabelActive: { color: Colors.gold },
  summaryCard:     { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, padding: Spacing.lg, marginBottom: Spacing.lg },
  summaryRow:      { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  summaryLabel:    { fontFamily: Typography.fontMono, fontSize: 12, color: Colors.textMuted, letterSpacing: 1 },
  summaryValue:    { fontFamily: Typography.fontBody, fontSize: 14, color: Colors.ivory },
  summaryGold:     { fontFamily: Typography.fontDisplayB, fontSize: 18, color: Colors.gold },
  summaryDivider:  { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm },
  disclaimer:      { fontFamily: Typography.fontBody, fontSize: 12, color: Colors.textDim, lineHeight: 18, fontStyle: 'italic' },
  navRow:          { flexDirection: 'row', gap: Spacing.md, padding: Spacing.xl, paddingTop: 0 },
  btnDisabled:     { opacity: 0.5 },
  confirmCheck:    { width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: Colors.gold, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl },
  confirmCheckText:{ fontFamily: Typography.fontDisplayB, fontSize: 32, color: Colors.gold },
  confirmTitle:    { fontFamily: Typography.fontDisplayB, fontSize: 36, color: Colors.ivory, textAlign: 'center' },
  confirmDetail:   { fontFamily: Typography.fontDisplayB, fontSize: 22, color: Colors.ivory, textAlign: 'center', marginTop: Spacing.md },
  confirmMeta:     { fontFamily: Typography.fontMono, fontSize: 12, color: Colors.gold, textAlign: 'center', marginTop: Spacing.sm, letterSpacing: 1, lineHeight: 20 },
  confirmAddress:  { fontFamily: Typography.fontBody, fontSize: 13, color: Colors.textMuted, textAlign: 'center', marginTop: Spacing.md },
});
