// ─── BookingScreen — Figma Code Connect ───────────────────────────────────────
// Links BookingScreen to Figma frame "Booking" (node 1:1352)

import figma from '@figma/code-connect';
import BookingScreen from './BookingScreen';

// ── Main frame: "Booking" ─────────────────────────────────────────────────────
figma.connect(
  BookingScreen,
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1352',
  {
    props: {
      searchLabel: figma.string('Text'),
    },
    // @ts-ignore
    example: () => <BookingScreen />,
    links: [
      {
        name: 'Implementación',
        url: 'https://github.com/tu-repo/ride-hailing-app/blob/main/src/screens/BookingScreen.js',
      },
      {
        name: 'API de tarifas (fareService)',
        url: 'https://github.com/tu-repo/ride-hailing-app/blob/main/src/services/fareService.js',
      },
    ],
  }
);

// ── Sub-component: Search Box (node 1:1354) ───────────────────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1354',
  {
    props: {
      city: figma.string('Text'),
      filters: figma.string('Label'),
    },
    example: (props) => (
      <div style={{
        background: '#F5F5F5',
        borderRadius: 12,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 12,
        fontFamily: 'Inter, sans-serif',
      }}>
        <span>🔍</span>
        <div>
          <p style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>{props.city}</p>
          <p style={{ fontSize: 14, color: '#828282', margin: 0 }}>Hoy · 1 pasajero · Ahora</p>
        </div>
        <span style={{ marginLeft: 'auto' }}>✏️</span>
      </div>
    ),
  }
);

// ── Sub-component: Price Chip (node 1:1382) ───────────────────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1382',
  {
    props: {
      price: figma.string('Price'),
      selected: figma.boolean('Selected', { true: true, false: false }),
    },
    example: (props) => (
      <div style={{
        background: props.selected ? 'rgba(0,0,0,0.9)' : '#FCFEFF',
        color: props.selected ? '#FFF' : '#1B2228',
        borderRadius: 24,
        padding: '8px 12px',
        fontSize: 13,
        fontWeight: 500,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        {props.price}
      </div>
    ),
  }
);

// ── Sub-component: Listing Card (node 1:1400) ─────────────────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1400',
  {
    props: {
      name: figma.string('Product name'),
      price: figma.string('Price'),
    },
    example: (props) => (
      <div style={{ fontFamily: 'Inter, sans-serif', marginBottom: 24 }}>
        <div style={{ height: 150, borderRadius: 8, background: '#F0EDFF', marginBottom: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🗺️</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, margin: '0 0 4px' }}>{props.name}</p>
            <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', margin: 0 }}>⭐ 4.8 · 📍 2 km</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 20, fontWeight: 500, margin: 0 }}>{props.price}</p>
            <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', margin: 0 }}>/viaje</p>
          </div>
        </div>
      </div>
    ),
  }
);
