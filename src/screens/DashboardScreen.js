// ─── DashboardScreen ──────────────────────────────────────────────────────────
// Generated from Figma: "Dashboard" frame (node 1:1727)
// Design: Stats cards + line chart + contact list + tab bar

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_W } = Dimensions.get('window');

// ── Mock data (replace with real API) ────────────────────────────────────────
const STAT_CARDS = [
  { id: '1', label: 'Título', value: '45 678,90 $', change: '+20 % mes a mes', positive: true },
  { id: '2', label: 'Título', value: '2405', change: '+33 % mes a mes', positive: true },
  { id: '3', label: 'MAU (Usuarios Activos Mensuales)', value: '10 353', change: '-8 % mes a mes', positive: false },
];

const CONTACTS = [
  { id: '1', name: 'Elynn Lee', email: 'email@fakedomain.net' },
  { id: '2', name: 'Oscar Dum', email: 'email@fakedomain.net' },
  { id: '3', name: 'Carlo Emilion', email: 'email@fakedomain.net' },
  { id: '4', name: 'Daniel Jay Park', email: 'djpark@gmail.com' },
  { id: '5', name: 'Mark Rojas', email: 'rojasmar@skiff.com' },
];

const PILLS = ['Pestaña', 'Pestaña', 'Pestaña'];

// ── Mini chart (uses SVG-free pure RN bars) ───────────────────────────────────
const CHART_POINTS = [30, 35, 32, 38, 42, 40, 46, 49]; // normalized 0-50 scale (thousands $)

const MiniChart = () => {
  const chartH = 120;
  const chartW = SCREEN_W - 32 - 32;
  const maxVal = Math.max(...CHART_POINTS);
  const step = chartW / (CHART_POINTS.length - 1);

  return (
    <View style={chartStyles.container}>
      {/* Y-axis labels */}
      <View style={chartStyles.yAxis}>
        {['50 000 $', '45 000 $', '40 000 $', '35 000 $', '30 000 $'].map((l, i) => (
          <Text key={i} style={chartStyles.axisLabel}>{l}</Text>
        ))}
      </View>
      {/* Chart area with bars */}
      <View style={[chartStyles.chartArea, { height: chartH }]}>
        {CHART_POINTS.map((val, i) => (
          <View
            key={i}
            style={[
              chartStyles.bar,
              {
                height: (val / maxVal) * chartH * 0.85,
                left: i * step,
                backgroundColor: i === CHART_POINTS.length - 1 ? '#6E3FF3' : '#E8E4FD',
              },
            ]}
          />
        ))}
      </View>
      {/* X-axis labels */}
      <View style={chartStyles.xAxis}>
        {['23 nov', '24', '25', '26', '27', '28', '29', '30'].map((l, i) => (
          <Text key={i} style={chartStyles.axisLabel}>{l}</Text>
        ))}
      </View>
    </View>
  );
};

const chartStyles = StyleSheet.create({
  container: { flex: 1 },
  yAxis: { position: 'absolute', left: 0, top: 0, bottom: 20, justifyContent: 'space-between' },
  axisLabel: { fontSize: 10, color: '#828282', fontWeight: '400' },
  chartArea: { marginLeft: 56, marginBottom: 20, position: 'relative', overflow: 'hidden' },
  bar: {
    position: 'absolute',
    bottom: 0,
    width: 8,
    borderRadius: 4,
  },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginLeft: 56 },
});

// ── Avatar placeholder ────────────────────────────────────────────────────────
const Avatar = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#6E3FF3', '#22C55E', '#F59E0B', '#3B82F6', '#EF4444'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <View style={[avatarStyles.circle, { backgroundColor: color }]}>
      <Text style={avatarStyles.text}>{initials}</Text>
    </View>
  );
};

const avatarStyles = StyleSheet.create({
  circle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 12, fontWeight: '600', color: '#FFF' },
});

// ── Main Screen ───────────────────────────────────────────────────────────────
const DashboardScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activePill, setActivePill] = useState(0);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header (node 1:1761) ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <View style={styles.menuLine} />
          <View style={[styles.menuLine, { width: 14 }]} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
        <Text style={styles.appTitle}>Nombre de la aplicación</Text>
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>U</Text>
        </View>
      </View>

      {/* ── Pills (node 1:1834) ─── */}
      <View style={styles.pills}>
        {PILLS.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.pill, activePill === i && styles.pillActive]}
            onPress={() => setActivePill(i)}
          >
            <Text style={[styles.pillLabel, activePill === i && styles.pillLabelActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}
      >
        {/* ── Stats cards (node 1:1821) ─── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
          {STAT_CARDS.map(card => (
            <View key={card.id} style={styles.statCard}>
              <Text style={styles.statLabel}>{card.label}</Text>
              <Text style={styles.statValue}>{card.value}</Text>
              <Text style={[styles.statChange, !card.positive && styles.statChangeNeg]}>
                {card.change}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Chart (node 1:1792) ─── */}
        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Título</Text>
          <View style={{ height: 180, marginTop: 8 }}>
            <MiniChart />
          </View>
        </View>

        {/* ── Contact list (node 1:1728) ─── */}
        <View style={styles.listCard}>
          <Text style={styles.sectionTitle}>Título</Text>
          {CONTACTS.map(contact => (
            <TouchableOpacity key={contact.id} style={styles.contactRow} activeOpacity={0.7}>
              <Avatar name={contact.name} />
              <View style={styles.contactText}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactEmail}>{contact.email}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },

  // Header (node 1:1761)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  menuBtn: { width: 24, height: 24, justifyContent: 'space-between', paddingVertical: 3 },
  menuLine: { height: 2, width: 18, backgroundColor: '#0D0D0D', borderRadius: 1 },
  appTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#0D0D0D',
    letterSpacing: -0.4,
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6E3FF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: { fontSize: 10, fontWeight: '600', color: '#FFF' },

  // Pills (node 1:1834)
  pills: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
  },
  pillActive: { backgroundColor: 'rgba(0,0,0,0.9)' },
  pillLabel: { fontSize: 14, fontWeight: '500', color: '#0D0D0D' },
  pillLabelActive: { color: '#FFFFFF' },

  // Stats row (node 1:1821)
  statsRow: { marginBottom: 12 },
  statCard: {
    width: 200,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  statLabel: { fontSize: 14, fontWeight: '600', color: '#0D0D0D', marginBottom: 8 },
  statValue: { fontSize: 28, fontWeight: '600', color: '#0D0D0D', letterSpacing: -0.56, marginBottom: 8 },
  statChange: { fontSize: 12, fontWeight: '500', color: '#828282' },
  statChangeNeg: { color: '#EF4444' },

  // Chart card (node 1:1792)
  chartCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    overflow: 'hidden',
  },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#0D0D0D' },

  // Contact list (node 1:1728)
  listCard: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    overflow: 'hidden',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  contactText: { flex: 1 },
  contactName: { fontSize: 14, fontWeight: '500', color: '#0D0D0D', lineHeight: 20 },
  contactEmail: { fontSize: 12, fontWeight: '400', color: '#828282', lineHeight: 18 },
});

export default DashboardScreen;
