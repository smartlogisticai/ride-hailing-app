// ─── AuthScreen — Figma Code Connect ──────────────────────────────────────────
// Links AuthScreen to Figma frame "Sign In" (node 1:1588)
// File: 38jyq50lwKmwo6XwuhMPM8
//
// HOW TO PUBLISH:
//   1. npm install --save-dev @figma/code-connect
//   2. npx figma connect publish --token YOUR_FIGMA_ACCESS_TOKEN

import figma from '@figma/code-connect';
import React from 'react';
import AuthScreen from './AuthScreen';

// ── Main frame: "Sign In" ─────────────────────────────────────────────────────
figma.connect(
  AuthScreen,
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1588',
  {
    props: {
      // Map Figma text layer "Crear una cuenta" → heading prop
      heading: figma.string('Crear una cuenta'),
      // Map Figma text layer subheading
      subheading: figma.string('Introduce tu correo electrónico para registrarte en esta aplicación'),
    },
    example: (props) => (
      // @ts-ignore — React Native component used in Code Connect context
      <AuthScreen />
    ),
    links: [
      {
        name: 'Implementación',
        url: 'https://github.com/tu-repo/ride-hailing-app/blob/main/src/screens/AuthScreen.js',
      },
    ],
  }
);

// ── Sub-component: "Button" (node 1:1598) ────────────────────────────────────
figma.connect(
  // Primary CTA button inside the auth form
  'https://www.figma.com/design/38jyq50lwKmwo6XwuhMPM8/Sin-t%C3%ADtulo?node-id=1-1598',
  {
    props: {
      label: figma.string('Continuar'),
    },
    example: (props) => (
      <button style={{ background: '#0D0D0D', color: '#FFF', height: 40, borderRadius: 8, padding: '0 16px' }}>
        {props.label}
      </button>
    ),
  }
);
