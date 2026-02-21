// ─── CheckoutScreen & FareSelectionScreen — Figma Code Connect ────────────────
// Links to Figma frame "Checkout" (node 1:1493)
// This frame covers both fare selection and trip confirmation.

import figma from '@figma/code-connect';
import FareSelectionScreen from './FareSelectionScreen';
import CheckoutScreen from './CheckoutScreen';

// ── Frame: "Checkout" → FareSelectionScreen ───────────────────────────────────
figma.connect(
  FareSelectionScreen,
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1493',
  {
    props: {
      buttonLabel: figma.string('Haz un pedido'),
    },
    // @ts-ignore
    example: () => <FareSelectionScreen />,
    links: [
      {
        name: 'Implementación',
        url: 'https://github.com/tu-repo/ride-hailing-app/blob/main/src/screens/FareSelectionScreen.js',
      },
    ],
  }
);

// ── Sub-component: "Haz un pedido" button (node 1:1497) ──────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1497',
  {
    props: {
      label: figma.string('Haz un pedido'),
    },
    example: (props) => (
      <button style={{
        height: 52,
        backgroundColor: '#0D0D0D',
        borderRadius: 8,
        color: '#FFF',
        fontSize: 16,
        fontWeight: 500,
        border: 'none',
        width: '100%',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
      }}>
        {props.label}
      </button>
    ),
  }
);

// ── Sub-component: Checkout Info Row — RUTA (node 1:1513) ────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1513',
  {
    props: {
      label: figma.string('ENVÍO'),
      value: figma.string('Añadir dirección de envío'),
    },
    example: (props) => (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
        borderBottom: '0.5px solid #E6E6E6',
        fontFamily: 'Inter, sans-serif',
      }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#0D0D0D' }}>{props.label}</span>
        <span style={{ fontSize: 14, color: '#0D0D0D' }}>{props.value} ›</span>
      </div>
    ),
  }
);

// ── Sub-component: Price Total (node 1:1509) ──────────────────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1509',
  {
    props: {
      total: figma.string('21,98 €'),
      label: figma.string('Total'),
    },
    example: (props) => (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontFamily: 'Inter, sans-serif',
      }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{props.label}</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{props.total}</span>
      </div>
    ),
  }
);
