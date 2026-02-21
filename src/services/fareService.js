// ─── fareService.js ───────────────────────────────────────────────────────────
// Fare calculation API client.
//
// ⚡ n8n INTEGRATION:
//   1. In n8n, create a Webhook node (HTTP Method: POST).
//   2. Copy the webhook URL and paste it below as N8N_WEBHOOK_URL.
//   3. Add your logic nodes (Google Maps Distance, pricing rules, etc.).
//   4. Set USE_MOCK = false to start hitting the real endpoint.
//
// MOCK MODE (default):
//   When USE_MOCK = true, requests are intercepted locally and return
//   realistic fake data so you can develop the UI without a live server.

import axios from 'axios';

// ── Configuration ─────────────────────────────────────────────────────────────

// 🔗 API en servidor Contabo:
const N8N_WEBHOOK_URL = 'http://167.86.87.109:3001/api/calculate-fare';

// Toggle mock mode (set false when your n8n webhook is ready):
const USE_MOCK = false;

// Timeout for real API calls (ms):
const REQUEST_TIMEOUT = 8000;

// ── Request type definitions (JSDoc for IDE support) ─────────────────────────
/**
 * @typedef {{ lat: number, lng: number }} Coords
 * @typedef {{ origin: Coords, destination: Coords, vehicle_type: string }} FareRequest
 * @typedef {{ type: string, min_price: number, max_price: number, eta: number }} FareOption
 * @typedef {{ estimated_time: number, fares: FareOption[] }} FareResponse
 */

// ── Main export ───────────────────────────────────────────────────────────────
/**
 * Calculate fare for a given origin → destination trip.
 * @param {FareRequest} params
 * @returns {Promise<FareResponse>}
 */
export async function calculateFare(params) {
  if (USE_MOCK) {
    return mockCalculateFare(params);
  }
  return realCalculateFare(params);
}

// ── Real API call (connects to n8n webhook) ───────────────────────────────────
async function realCalculateFare({ origin, destination, vehicle_type }) {
  try {
    const response = await axios.post(
      N8N_WEBHOOK_URL,
      { origin, destination, vehicle_type },
      {
        timeout: REQUEST_TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers here if needed:
          // 'Authorization': `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const data = response.data;

    // Validate response shape
    if (!data.fares || !Array.isArray(data.fares)) {
      throw new Error('Respuesta de API inválida: fares array faltante');
    }

    return data;
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      throw new Error('La solicitud tardó demasiado. Verifica tu conexión a internet.');
    }
    if (err.response) {
      throw new Error(`Error del servidor: ${err.response.status}`);
    }
    throw new Error('No se pudo conectar con el servidor de tarifas.');
  }
}

// ── Mock implementation ───────────────────────────────────────────────────────
// Simulates the n8n webhook response with realistic pricing.
// Uses haversine distance to vary prices based on actual coordinates.
async function mockCalculateFare({ origin, destination }) {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

  const distanceKm = haversineDistance(origin, destination);
  const baseFare = Math.max(5, distanceKm * 1.8); // $1.80/km base

  /** @type {FareResponse} */
  const response = {
    estimated_time: Math.round(distanceKm * 2.5 + 3), // ~2.5 min/km + 3 min pickup
    fares: [
      {
        type: 'Economy',
        min_price: Math.round(baseFare * 0.85),
        max_price: Math.round(baseFare * 1.0),
        eta: Math.round(2 + Math.random() * 4),
      },
      {
        type: 'Taxi',
        min_price: Math.round(baseFare * 1.0),
        max_price: Math.round(baseFare * 1.25),
        eta: Math.round(3 + Math.random() * 5),
      },
      {
        type: 'Comfort',
        min_price: Math.round(baseFare * 1.3),
        max_price: Math.round(baseFare * 1.6),
        eta: Math.round(4 + Math.random() * 6),
      },
      {
        type: 'Premium',
        min_price: Math.round(baseFare * 1.8),
        max_price: Math.round(baseFare * 2.2),
        eta: Math.round(5 + Math.random() * 7),
      },
      {
        type: 'XL',
        min_price: Math.round(baseFare * 1.5),
        max_price: Math.round(baseFare * 1.9),
        eta: Math.round(6 + Math.random() * 8),
      },
    ],
  };

  return response;
}

// ── Haversine distance helper ─────────────────────────────────────────────────
function haversineDistance(a, b) {
  const R = 6371; // Earth radius in km
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
