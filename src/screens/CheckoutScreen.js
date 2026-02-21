// ─── CheckoutScreen ───────────────────────────────────────────────────────────
// Generated from Figma: "Checkout" frame (node 1:1493) — adapted for ride summary
// Displays trip confirmation before final submission

import React, { useState } from 'react';
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

const CheckoutScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { origin, destination, selectedFare, estimatedTime } = route.params ?? {};
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    // TODO: POST ride request to your backend / n8n webhook
    await new Promise(r => setTimeout(r, 2000));
    setConfirming(false);
    Alert.alert(
      '¡Viaje solicitado! 🎉',
      `Tu ${selectedFare?.type} llegará en ${selectedFare?.eta} minutos.`,
      [
        {
          text: 'Ver inicio',
          onPress: () => navigation.navigate('MainTabs'),
        },
      ]
    );
  };

  const totalEstimated = selectedFare
    ? `${selectedFare.min_price} – ${selectedFare.max_price} $`
    : '–';

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
        <Text style={styles.headerTitle}>Confirmar viaje</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* ── Route section (Figma: ENVÍO row node 1:1513) ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RUTA</Text>
          <View style={styles.routeBlock}>
            <View style={styles.routeRow}>
              <View style={[styles.routeIndicator, { backgroundColor: '#6E3FF3' }]} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeInfoLabel}>Origen</Text>
                <Text style={styles.routeInfoValue}>{origin ?? 'No especificado'}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
            <View style={styles.routeDivider} />
            <View style={styles.routeRow}>
              <View style={[styles.routeIndicator, { backgroundColor: '#0D0D0D' }]} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeInfoLabel}>Destino</Text>
                <Text style={styles.routeInfoValue}>{destination ?? 'No especificado'}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>
        </View>

        {/* ── ETA section (Figma: ENTREGA row node 1:1519) ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ENTREGA</Text>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoValue}>
                {selectedFare?.type ?? '–'}
              </Text>
              <Text style={styles.infoSub}>
                ETA: {selectedFare?.eta ?? estimatedTime ?? '–'} min
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>

        {/* ── Payment section (Figma: PAGO row node 1:1527) ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PAGO</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>Google Pay</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>

        {/* ── Promo section (Figma: PROMOCIONES row node 1:1533) ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PROMOCIONES</Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoValue, { color: 'rgba(0,0,0,0.5)' }]}>
              Aplicar código promocional
            </Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>

        {/* ── Selected vehicle summary (Figma: Items section node 1:1539) ─── */}
        <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <Text style={styles.sectionLabel}>VEHÍCULO</Text>
          {selectedFare && (
            <View style={styles.vehicleCard}>
              <View style={styles.vehicleIcon}>
                <Text style={{ fontSize: 28 }}>🚕</Text>
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleType}>{selectedFare.type}</Text>
                <Text style={styles.vehicleDetail}>ETA aprox. {selectedFare.eta} min</Text>
                <Text style={styles.vehicleDetail}>Precio estimado</Text>
              </View>
              <Text style={styles.vehiclePrice}>
                {selectedFare.min_price}–{selectedFare.max_price} $
              </Text>
            </View>
          )}
        </View>

        {/* ── Price breakdown (Figma: Text node 1:1499) ─── */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tarifa base</Text>
            <Text style={styles.priceValue}>{selectedFare?.min_price ?? 0} $</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total de servicio</Text>
            <Text style={styles.priceValue}>Gratis</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Impuestos</Text>
            <Text style={styles.priceValue}>Incluido</Text>
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, styles.priceLabelBold]}>Total estimado</Text>
            <Text style={[styles.priceValue, styles.priceValueBold]}>{totalEstimated}</Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Confirm button (Figma node 1:1497) ─── */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[styles.confirmBtn, confirming && styles.confirmBtnLoading]}
          onPress={handleConfirm}
          disabled={confirming}
          activeOpacity={0.85}
        >
          {confirming ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.confirmBtnLabel}>Confirmar viaje</Text>
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

  // Info sections
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0D0D0D',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  // Route block
  routeBlock: {},
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  routeIndicator: { width: 10, height: 10, borderRadius: 5 },
  routeInfo: { flex: 1 },
  routeInfoLabel: { fontSize: 12, color: 'rgba(0,0,0,0.5)', marginBottom: 2 },
  routeInfoValue: { fontSize: 14, color: '#0D0D0D', fontWeight: '400' },
  routeDivider: { height: 1, backgroundColor: '#E6E6E6', marginLeft: 22 },
  chevron: { fontSize: 18, color: '#0D0D0D' },

  // Info row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoValue: { fontSize: 14, color: '#0D0D0D', fontWeight: '400' },
  infoSub: { fontSize: 14, color: '#0D0D0D', fontWeight: '400' },

  // Vehicle card
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
  },
  vehicleIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleInfo: { flex: 1, gap: 2 },
  vehicleType: { fontSize: 14, fontWeight: '500', color: '#0D0D0D' },
  vehicleDetail: { fontSize: 14, color: '#0D0D0D' },
  vehiclePrice: { fontSize: 14, fontWeight: '600', color: '#0D0D0D' },

  // Price breakdown (node 1:1499)
  priceSection: {
    padding: 16,
    gap: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: { fontSize: 14, color: '#0D0D0D', fontWeight: '400' },
  priceValue: { fontSize: 14, color: '#0D0D0D', fontWeight: '400', textAlign: 'right' },
  priceLabelBold: { fontWeight: '500' },
  priceValueBold: { fontWeight: '500' },
  priceDivider: { height: 1, backgroundColor: '#E6E6E6', marginVertical: 4 },

  // Bottom bar (node 1:1494)
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
  confirmBtn: {
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
  confirmBtnLoading: { backgroundColor: '#6E3FF3' },
  confirmBtnLabel: { fontSize: 16, fontWeight: '500', color: '#FFFFFF' },
});

export default CheckoutScreen;
