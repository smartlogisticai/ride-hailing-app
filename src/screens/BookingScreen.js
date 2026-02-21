// ─── BookingScreen ────────────────────────────────────────────────────────────
// Generated from Figma: "Booking" frame (node 1:1352)
// Adapted for ride-hailing: map + origin/destination search → fare API call
//
// ⚡ n8n INTEGRATION POINT:
//    Replace FARE_API_ENDPOINT with your n8n webhook URL.
//    The webhook must accept POST { origin, destination, vehicle_type }
//    and return { estimated_time, fares: [{ type, min_price, max_price, eta }] }

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { calculateFare } from '../services/fareService';

const { height: SCREEN_H } = Dimensions.get('window');

// ── Mock locations (replace with Google Places API or Mapbox) ────────────────
const MOCK_ORIGIN = { lat: 37.7749, lng: -122.4194, label: 'San Francisco, CA' };
const MOCK_DESTINATION = { lat: 37.8044, lng: -122.2712, label: 'Oakland, CA' };

// ── Price chips shown on the map (from Figma node 1:1380) ────────────────────
const PRICE_CHIPS = [
  { id: '1', price: '199 $', top: '25%', left: '45%', selected: false },
  { id: '2', price: '123 $', top: '42%', left: '45%', selected: true }, // selected = dark
  { id: '3', price: '234 $', top: '30%', left: '8%', selected: false },
  { id: '4', price: '567 $', top: '55%', left: '5%', selected: false },
  { id: '5', price: '345 $', top: '68%', left: '28%', selected: false },
  { id: '6', price: '299 $', top: '28%', left: '77%', selected: false },
  { id: '7', price: '176 $', top: '56%', left: '73%', selected: false },
];

const BookingScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [origin, setOrigin] = useState(MOCK_ORIGIN.label);
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapRegion] = useState({
    latitude: (MOCK_ORIGIN.lat + MOCK_DESTINATION.lat) / 2,
    longitude: (MOCK_ORIGIN.lng + MOCK_DESTINATION.lng) / 2,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  // ── Request location permission ───────────────────────────────────────────
  const requestLocationPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación para encontrar tu posición.');
    }
  }, []);

  // ── Calculate fares → navigate to FareSelection ───────────────────────────
  const handleSearch = async () => {
    if (!destination.trim()) {
      Alert.alert('Destino requerido', 'Ingresa tu destino para continuar.');
      return;
    }
    setLoading(true);
    try {
      // ── FARE API CALL ─────────────────────────────────────────────────────
      // 🔗 n8n webhook replaces this call automatically via fareService.js
      const fareData = await calculateFare({
        origin: { lat: MOCK_ORIGIN.lat, lng: MOCK_ORIGIN.lng },
        destination: { lat: MOCK_DESTINATION.lat, lng: MOCK_DESTINATION.lng },
        vehicle_type: 'standard',
      });
      navigation.navigate('FareSelection', {
        origin: MOCK_ORIGIN.label,
        destination: destination || MOCK_DESTINATION.label,
        fareData,
      });
    } catch (err) {
      Alert.alert('Error', 'No se pudo calcular la tarifa. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ── Search Bar (Figma node 1:1354) ─── */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          {/* Search icon */}
          <View style={styles.searchIcon}>
            <Text style={{ fontSize: 16 }}>🔍</Text>
          </View>
          <View style={styles.searchTextBlock}>
            <Text style={styles.searchCity}>{origin || 'Origen'}</Text>
            <View style={styles.searchMeta}>
              <Text style={styles.searchMetaText}>Hoy</Text>
              <View style={styles.dot} />
              <Text style={styles.searchMetaText}>1 pasajero</Text>
              <View style={styles.dot} />
              <Text style={styles.searchMetaText}>Ahora</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleSearch} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={{ fontSize: 16 }}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Destination input */}
        <View style={styles.destinationRow}>
          <TextInput
            style={styles.destinationInput}
            placeholder="¿A dónde vas?"
            placeholderTextColor="#828282"
            value={destination}
            onChangeText={setDestination}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <Text style={styles.resultsCount}>99 resultados</Text>
        </View>

        {/* Filter chips (node 1:1371) */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterLabel}>Filtro ▾</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterLabel}>Clasificar ▾</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Map with price chips (Figma node 1:1380) ─── */}
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          region={mapRegion}
          showsUserLocation
          showsMyLocationButton={false}
        >
          <Marker
            coordinate={{ latitude: MOCK_ORIGIN.lat, longitude: MOCK_ORIGIN.lng }}
            pinColor="#6E3FF3"
          />
          <Marker
            coordinate={{ latitude: MOCK_DESTINATION.lat, longitude: MOCK_DESTINATION.lng }}
            pinColor="#0D0D0D"
          />
          <Polyline
            coordinates={[
              { latitude: MOCK_ORIGIN.lat, longitude: MOCK_ORIGIN.lng },
              { latitude: MOCK_DESTINATION.lat, longitude: MOCK_DESTINATION.lng },
            ]}
            strokeColor="#6E3FF3"
            strokeWidth={3}
            lineDashPattern={[6, 3]}
          />
        </MapView>

        {/* Price chips overlaid on map */}
        {PRICE_CHIPS.map(chip => (
          <View
            key={chip.id}
            style={[
              styles.priceChip,
              chip.selected && styles.priceChipSelected,
              { top: chip.top, left: chip.left },
            ]}
          >
            <Text style={[styles.priceChipText, chip.selected && styles.priceChipTextSelected]}>
              {chip.price}
            </Text>
          </View>
        ))}
      </View>

      {/* ── Bottom sheet: listings (Figma node 1:1396) ─── */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 16 }]}>
        {/* Handle */}
        <View style={styles.handle} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Listing card 1 */}
          <ListingCard
            name="Origen → Destino"
            rating="4.8"
            reviews="500"
            distance="2 km"
            price="123 $"
            onSelect={handleSearch}
            loading={loading}
          />
          {/* Listing card 2 */}
          <ListingCard
            name="Ruta alternativa"
            rating="4.7"
            reviews="800"
            distance="2.5 km"
            price="178 $"
            onSelect={() => {}}
          />
        </ScrollView>
      </View>
    </View>
  );
};

// ── Listing card sub-component (Figma node 1:1400) ────────────────────────────
const ListingCard = ({ name, rating, reviews, distance, price, onSelect, loading }) => (
  <TouchableOpacity style={listStyles.card} activeOpacity={0.85} onPress={onSelect}>
    {/* Image placeholder */}
    <View style={listStyles.image}>
      <Text style={listStyles.imagePlaceholder}>🗺️</Text>
    </View>
    {/* Info row */}
    <View style={listStyles.info}>
      <View style={listStyles.textBlock}>
        <Text style={listStyles.name}>{name}</Text>
        <View style={listStyles.metaRow}>
          <Text style={listStyles.meta}>⭐ {rating} ({reviews} reseñas)</Text>
          <Text style={listStyles.meta}>  📍 {distance}</Text>
        </View>
      </View>
      <View style={listStyles.priceRow}>
        <View>
          <Text style={listStyles.price}>{price}</Text>
          <Text style={listStyles.priceUnit}>/viaje</Text>
        </View>
        <TouchableOpacity style={listStyles.selectBtn} onPress={onSelect}>
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={listStyles.selectBtnLabel}>Seleccionar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const listStyles = StyleSheet.create({
  card: { marginBottom: 24 },
  image: {
    height: 150,
    borderRadius: 8,
    backgroundColor: '#F0EDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  imagePlaceholder: { fontSize: 48 },
  info: { gap: 8 },
  textBlock: { gap: 2 },
  name: { fontSize: 14, fontWeight: '500', color: '#0D0D0D', lineHeight: 20 },
  metaRow: { flexDirection: 'row', gap: 4 },
  meta: { fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 20 },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  price: { fontSize: 20, fontWeight: '500', color: '#0D0D0D' },
  priceUnit: { fontSize: 12, color: 'rgba(0,0,0,0.5)', lineHeight: 22 },
  selectBtn: {
    height: 32,
    backgroundColor: '#0D0D0D',
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 86,
  },
  selectBtnLabel: { fontSize: 14, fontWeight: '500', color: '#FFFFFF' },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },

  // Search bar (node 1:1354)
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    zIndex: 10,
  },
  searchBox: {
    margin: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },
  searchIcon: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  searchTextBlock: { flex: 1, gap: 2 },
  searchCity: { fontSize: 16, fontWeight: '500', color: '#0D0D0D', lineHeight: 24 },
  searchMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  searchMetaText: { fontSize: 14, color: '#828282', lineHeight: 22 },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#828282' },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  destinationInput: {
    flex: 1,
    height: 36,
    fontSize: 14,
    color: '#0D0D0D',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  resultsCount: { fontSize: 14, color: 'rgba(0,0,0,0.9)' },
  filterRow: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 8, gap: 8 },
  filterChip: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterLabel: { fontSize: 14, fontWeight: '500', color: '#1A1A1A' },

  // Map (node 1:1380)
  mapContainer: {
    flex: 1,
    backgroundColor: '#FAFCFF',
    position: 'relative',
  },
  priceChip: {
    position: 'absolute',
    backgroundColor: '#FCFEFF',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  priceChipSelected: { backgroundColor: 'rgba(0,0,0,0.9)' },
  priceChipText: { fontSize: 13, fontWeight: '500', color: '#1B2228' },
  priceChipTextSelected: { color: '#FFFFFF' },

  // Bottom sheet (node 1:1396)
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: SCREEN_H * 0.42,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  handle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default BookingScreen;
