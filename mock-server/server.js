// ─── mock-server/server.js ────────────────────────────────────────────────────
// Standalone Express mock server that simulates your n8n webhook.
// Run: node mock-server/server.js
//
// Then set in fareService.js:
//   const N8N_WEBHOOK_URL = 'http://localhost:3001/api/calculate-fare';
//   const USE_MOCK = false;
//
// The server validates the request body and returns a realistic fare response.

const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// ── CORS for local Expo development ──────────────────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── POST /api/calculate-fare ──────────────────────────────────────────────────
// Request body: { origin: { lat, lng }, destination: { lat, lng }, vehicle_type }
// Response: { estimated_time, fares: [{ type, min_price, max_price, eta }] }
app.post('/api/calculate-fare', (req, res) => {
  const { origin, destination, vehicle_type } = req.body;

  // ── Validation ─────────────────────────────────────────────────────────────
  if (!origin?.lat || !origin?.lng) {
    return res.status(400).json({ error: 'origin.lat and origin.lng are required' });
  }
  if (!destination?.lat || !destination?.lng) {
    return res.status(400).json({ error: 'destination.lat and destination.lng are required' });
  }

  // ── Calculate distance (haversine) ─────────────────────────────────────────
  const distanceKm = haversineDistance(origin, destination);
  const baseFare = Math.max(5, distanceKm * 1.8);

  // ── Build response ─────────────────────────────────────────────────────────
  const response = {
    estimated_time: Math.round(distanceKm * 2.5 + 3),
    distance_km: Math.round(distanceKm * 10) / 10,
    fares: buildFares(baseFare, vehicle_type),
  };

  // Simulate processing delay (like a real n8n workflow would have)
  setTimeout(() => {
    console.log(`[FARE] ${origin.lat},${origin.lng} → ${destination.lat},${destination.lng} | ${distanceKm.toFixed(2)} km | ${response.fares.length} fares`);
    res.json(response);
  }, 300);
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── Helpers ───────────────────────────────────────────────────────────────────
function buildFares(baseFare, preferredType) {
  const allFares = [
    { type: 'Economy',  multiplierMin: 0.85, multiplierMax: 1.00, etaBase: 2 },
    { type: 'Taxi',     multiplierMin: 1.00, multiplierMax: 1.25, etaBase: 3 },
    { type: 'Comfort',  multiplierMin: 1.30, multiplierMax: 1.60, etaBase: 4 },
    { type: 'Premium',  multiplierMin: 1.80, multiplierMax: 2.20, etaBase: 5 },
    { type: 'XL',       multiplierMin: 1.50, multiplierMax: 1.90, etaBase: 6 },
    { type: 'Moto',     multiplierMin: 0.70, multiplierMax: 0.85, etaBase: 1 },
  ];

  return allFares.map(f => ({
    type: f.type,
    min_price: Math.round(baseFare * f.multiplierMin),
    max_price: Math.round(baseFare * f.multiplierMax),
    eta: f.etaBase + Math.floor(Math.random() * 5),
    recommended: f.type === preferredType || (f.type === 'Economy' && !preferredType),
  }));
}

function haversineDistance(a, b) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Mock Fare Server running at http://localhost:${PORT}`);
  console.log(`   POST /api/calculate-fare`);
  console.log(`   GET  /health`);
  console.log(`\n   To connect: set N8N_WEBHOOK_URL = 'http://localhost:${PORT}/api/calculate-fare'`);
  console.log(`   and USE_MOCK = false in src/services/fareService.js\n`);
});
