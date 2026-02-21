# Ride-Hailing App — Expo (React Native)

> UI generated from Figma file `38jyq50lwKmwo6XwuhMPM8`
> API-first architecture · n8n-ready fare engine

---

## Screens (from Figma)

| Screen | Figma Frame | File |
|---|---|---|
| Auth / Sign In | `1:1588` | `AuthScreen.js` |
| Dashboard | `1:1727` | `DashboardScreen.js` |
| Booking + Map | `1:1352` | `BookingScreen.js` |
| Fare Selection | (checkout adapted) `1:1493` | `FareSelectionScreen.js` |
| Checkout / Confirm | `1:1493` | `CheckoutScreen.js` |

---

## Folder Structure

```
ride-hailing-app/
├── App.js                        # Entry point + splash
├── app.json                      # Expo config
├── package.json                  # Dependencies
├── babel.config.js
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js       # Stack + Tabs
│   ├── screens/
│   │   ├── AuthScreen.js         # Figma: Sign In
│   │   ├── DashboardScreen.js    # Figma: Dashboard
│   │   ├── BookingScreen.js      # Figma: Booking + map
│   │   ├── FareSelectionScreen.js# Figma: Checkout (adapted)
│   │   └── CheckoutScreen.js     # Trip confirmation
│   ├── services/
│   │   └── fareService.js        # ⚡ n8n fare API client
│   └── constants/
│       ├── colors.js
│       ├── spacing.js
│       └── typography.js
└── mock-server/
    ├── server.js                 # Express mock (simulates n8n)
    └── package.json
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Expo app

```bash
npx expo start
```

Scan the QR code with **Expo Go** on your phone, or press `i` for iOS Simulator / `a` for Android.

### 3. (Optional) Run the mock server

```bash
cd mock-server
npm install
npm start
# → Server at http://localhost:3001
```

---

## Connecting n8n (Fare Engine)

1. Open `src/services/fareService.js`
2. Set `N8N_WEBHOOK_URL` to your n8n webhook URL:
   ```js
   const N8N_WEBHOOK_URL = 'https://your-n8n.com/webhook/calculate-fare';
   ```
3. Set `USE_MOCK = false`
4. Your n8n webhook must accept:

**POST /webhook/calculate-fare**
```json
{
  "origin": { "lat": 37.7749, "lng": -122.4194 },
  "destination": { "lat": 37.8044, "lng": -122.2712 },
  "vehicle_type": "standard"
}
```

**Expected response:**
```json
{
  "estimated_time": 18,
  "fares": [
    { "type": "Economy", "min_price": 12, "max_price": 15, "eta": 4 },
    { "type": "Taxi",    "min_price": 15, "max_price": 19, "eta": 6 },
    { "type": "Premium", "min_price": 25, "max_price": 32, "eta": 8 }
  ]
}
```

---

## Google Maps Setup

Add your Google Maps API key to `app.json`:

```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
    }
  }
}
```

For iOS, add to `AppDelegate.mm`:
```objc
[GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"];
```

---

## Tech Stack

- **Expo SDK 50** — cross-platform runtime
- **React Navigation 6** — stack + bottom tabs
- **react-native-maps** — map with route polyline
- **expo-location** — GPS positioning
- **axios** — HTTP client for fare API
- **expo-splash-screen** — managed splash screen

---

## Design System

All colors, spacing and typography tokens are in `src/constants/`.
Primary brand color: `#6E3FF3` (purple).
Change `COLORS.primary` in `colors.js` to rebrand instantly.
