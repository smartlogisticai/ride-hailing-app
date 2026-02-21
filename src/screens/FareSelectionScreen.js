// ─── FareSelectionScreen ──────────────────────────────────────────────────────
// Adapts Figma "Checkout" frame (node 1:1493) for ride fare selection.
// Renders fare options dynamically from the API response.
//
// Receives params: { origin, destination, fareData }
// fareData: { estimated_time, fares: [{ type, min_price, max_price, eta }] }

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ── Vehicle type emoji map ────────────────────────────────────────────────────
const VEHICLE_EMOJI = {
  Taxi: '🚕',
  Economy: '🚗',
  Premium: '🚙',
  Comfort: '🛻',
  XL: '🚐',
  Moto: '🏍️',
  default: '🚘',
};

// ── Single fare option card ───────────────────────────────────────────────────
const FareCard = ({ fare, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.fareCard, selected && styles.fareCardSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.fareLeft}>
      <View style={[styles.fareIcon, selected && styles.fareIconSelected]}>
        <Text style={{ fontSize: 22 }}>{VEHICLE_EMOJI[fare.type] ?? VEHICLE_EMOJI.default}</Text>
      </View>
      <View>
        <Text style={[styles.fareType, selected && styles.fareTypeSelected]}>{fare.type}</Text>
        <Text style={styles.fareEta}>ETA: {fare.eta} min</Text>
      </View>
    </View>
    <View style={styles.fareRight}>
      <Text style={[styles.farePrice, selected && styles.farePriceSelected]}>
        {fare.min_price} – {fare.max_price} $
      </Text>
      {selected && (
        <View style={styles.checkmark}>
          <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700' }}>✓</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// ── Main Screen ───────────────────────────────────────────────────────────────
const FareSelectionScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { origin, destination, fareData } = route.params ?? {};

  const fares = fareData?.fares ?? [];
  const [selectedId, setSelectedId] = useState(fares[0]?.type ?? null);
  const [requesting, setRequesting] = useState(false);

  const selectedFare = useMemo(
    () => fares.find(f => f.type === selectedId),
    [fares, selectedId]
  );

  const handleRequestRide = async () => {
    if (!selectedFare) {
      Alert.alert('Selecciona una tarifa', 'Por favor elige un tipo de vehículo antes de continuar.');
      return;
    }
    setRequesting(true);
    // Simulate request confirmation delay
    await new Promise(r => setTimeout(r, 1500));
    setRequesting(false);
    navigation.navigate('Checkout', {
      origin,
      destination,
      selectedFare,
      estimatedTime: fareData?.estimated_time,
    });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header (Figma node 1:1559) ─── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pide tu viaje</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* ── Route summary bar ─── */}
      <View style={styles.routeBar}>
        <View style={styles.routeDot} />
        <Text style={styles.routeText} numberOfLines={1}>{origin}</Text>
        <View style={styles.routeArrow}><Text>→</Text></View>
        <View style={[styles.routeDot, { backgroundColor: '#0D0D0D' }]} />
        <Text style={styles.routeText} numberOfLines={1}>{destination}</Text>
      </View>

      {/* ── Estimated time ─── */}
      {fareData?.estimated_time && (
        <View style={styles.etaBar}>
          <Text style={styles.etaText}>⏱ Tiempo estimado: {fareData.estimated_time} min</Text>
        </View>
      )}

      {/* ── Fare options list (Figma: checkout info rows node 1:1512) ─── */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}
      >
        {fares.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay tarifas disponibles en este momento.</Text>
          </View>
        ) : (
          fares.map(fare => (
            <FareCard
              key={fare.type}
              fare={fare}
              selected={selectedId === fare.type}
              onPress={() => setSelectedId(fare.type)}
            />
          ))
        )}

        {/* Payment method (Figma: PAGO row node 1:1527) */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>PAGO</Text>
          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoValue}>Google Pay</Text>
            <Text style={styles.infoChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Promo code (Figma: PROMOCIONES row node 1:1533) */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>PROMOCIONES</Text>
          <TouchableOpacity style={styles.infoRow}>
            <Text style={[styles.infoValue, { color: 'rgba(0,0,0,0.5)' }]}>
              Aplicar código promocional
            </Text>
            <Text style={styles.infoChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Price breakdown (Figma: Text node 1:1499) */}
        {selectedFare && (
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceRowLabel}>Tarifa base</Text>
              <Text style={styles.priceRowValue}>{selectedFare.min_price} $</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceRowLabel}>Tarifa máx. estimada</Text>
              <Text style={styles.priceRowValue}>{selectedFare.max_price} $</Text>
            </View>
            <View style={styles.priceRowDivider} />
            <View style={styles.priceRow}>
              <Text style={[styles.priceRowLabel, { fontWeight: '600' }]}>Total estimado</Text>
              <Text style={[styles.priceRowValue, { fontWeight: '600', fontSize: 16 }]}>
                {selectedFare.min_price} – {selectedFare.max_price} $
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ── Request Ride button (Figma node 1:1497) ─── */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[styles.requestBtn, requesting && styles.requestBtnLoading]}
          onPress={handleRequestRide}
          disabled={requesting || !selectedFare}
          activeOpacity={0.85}
        >
          {requesting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.requestBtnLabel}>
              {selectedFare ? `Pedir ${selectedFare.type} · ${selectedFare.min_price}–${selectedFare.max_price} $` : 'Selecciona una tarifa'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },

  // Header (node 1:1559)
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backArrow: { fontSize: 22, color: '#0D0D0D' },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#0D0D0D', letterSpacing: -0.34 },

  // Route bar
  routeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    gap: 6,
  },
  routeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6E3FF3' },
  routeText: { flex: 1, fontSize: 13, color: '#0D0D0D', fontWeight: '500' },
  routeArrow: { paddingHorizontal: 4 },

  // ETA bar
  etaBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
  },
  etaText: { fontSize: 13, color: '#6E3FF3', fontWeight: '500' },

  scroll: { flex: 1 },

  // Fare card
  fareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  fareCardSelected: {
    borderColor: '#6E3FF3',
    backgroundColor: '#F5F0FF',
  },
  fareLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fareIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fareIconSelected: { backgroundColor: '#EDE8FD' },
  fareType: { fontSize: 15, fontWeight: '600', color: '#0D0D0D', marginBottom: 2 },
  fareTypeSelected: { color: '#6E3FF3' },
  fareEta: { fontSize: 12, color: '#828282' },
  fareRight: { alignItems: 'flex-end', gap: 6 },
  farePrice: { fontSize: 14, fontWeight: '600', color: '#0D0D0D' },
  farePriceSelected: { color: '#6E3FF3' },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6E3FF3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Info sections (Figma checkout info rows)
  infoSection: {
    borderTopWidth: 0.5,
    borderTopColor: '#E6E6E6',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0D0D0D',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoValue: { fontSize: 14, color: '#0D0D0D' },
  infoChevron: { fontSize: 18, color: '#0D0D0D' },

  // Price breakdown
  priceBreakdown: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  priceRowLabel: { fontSize: 14, color: '#0D0D0D', fontWeight: '400' },
  priceRowValue: { fontSize: 14, color: '#0D0D0D', fontWeight: '400' },
  priceRowDivider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 8 },

  // Empty state
  emptyState: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 14, color: '#828282', textAlign: 'center' },

  // Bottom bar (Figma node 1:1494)
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  requestBtn: {
    height: 52,
    backgroundColor: '#0D0D0D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  requestBtnLoading: { backgroundColor: '#6E3FF3' },
  requestBtnLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

export default FareSelectionScreen;
