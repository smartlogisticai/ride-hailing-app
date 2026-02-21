// ─── DashboardScreen — Figma Code Connect ─────────────────────────────────────
// Links DashboardScreen to Figma frame "Dashboard" (node 1:1727)

import figma from '@figma/code-connect';
import DashboardScreen from './DashboardScreen';

// ── Main frame: "Dashboard" ───────────────────────────────────────────────────
figma.connect(
  DashboardScreen,
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1727',
  {
    props: {
      appTitle: figma.string('Nombre de la aplicación'),
    },
    // @ts-ignore
    example: () => <DashboardScreen />,
    links: [
      {
        name: 'Implementación',
        url: 'https://github.com/tu-repo/ride-hailing-app/blob/main/src/screens/DashboardScreen.js',
      },
    ],
  }
);

// ── Sub-component: Stat Card (node 1:1822) ────────────────────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1822',
  {
    props: {
      label: figma.string('Título'),
      value: figma.string('45 678,90 $'),
      change: figma.string('+20 % mes a mes'),
    },
    example: (props) => (
      <div style={{
        border: '1px solid #E0E0E0',
        borderRadius: 8,
        padding: 16,
        width: 200,
        fontFamily: 'Inter, sans-serif',
      }}>
        <p style={{ fontSize: 14, fontWeight: 600 }}>{props.label}</p>
        <p style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.56 }}>{props.value}</p>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#828282' }}>{props.change}</p>
      </div>
    ),
  }
);

// ── Sub-component: Pills / Tab Bar (node 1:1835) ──────────────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1835',
  {
    props: {
      label: figma.string('Pestaña'),
      active: figma.boolean('Active', { true: true, false: false }),
    },
    example: (props) => (
      <button style={{
        background: props.active ? 'rgba(0,0,0,0.9)' : '#F6F6F6',
        color: props.active ? '#FFF' : '#0D0D0D',
        borderRadius: 20,
        padding: '6px 14px',
        border: 'none',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
      }}>
        {props.label}
      </button>
    ),
  }
);

// ── Sub-component: Contact Cell (node 1:1730) ─────────────────────────────────
figma.connect(
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1730',
  {
    props: {
      name: figma.string('Elynn Lee'),
      email: figma.string('email@fakedomain.net'),
    },
    example: (props) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6E3FF3' }} />
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>{props.name}</p>
          <p style={{ fontSize: 12, color: '#828282', margin: 0 }}>{props.email}</p>
        </div>
      </div>
    ),
  }
);
