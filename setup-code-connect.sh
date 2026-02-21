#!/bin/bash
# ─── setup-code-connect.sh ────────────────────────────────────────────────────
# Instala y publica Code Connect para que tu código aparezca en Figma Dev Mode.
#
# ANTES DE EJECUTAR:
#   1. Ve a figma.com → tu cuenta (arriba derecha) → Settings
#   2. En "Security" → "Personal access tokens" → crea uno nuevo
#   3. Copia el token y pégalo cuando te lo pida este script
#
# USO: bash setup-code-connect.sh

set -e

echo ""
echo "🎨 Figma Code Connect — Setup"
echo "================================"
echo ""

# ── 1. Instalar @figma/code-connect ──────────────────────────────────────────
echo "📦 Instalando @figma/code-connect..."
npm install --save-dev @figma/code-connect

echo ""
echo "✅ Dependencia instalada."
echo ""

# ── 2. Pedir el token ─────────────────────────────────────────────────────────
echo "🔑 Ingresa tu Figma Personal Access Token:"
echo "   (figma.com → Account Settings → Security → Personal access tokens)"
read -p "   Token: " FIGMA_TOKEN

if [ -z "$FIGMA_TOKEN" ]; then
  echo "❌ Token vacío. Abortando."
  exit 1
fi

# ── 3. Publicar a Figma ───────────────────────────────────────────────────────
echo ""
echo "🚀 Publicando Code Connect a Figma..."
echo ""

npx figma connect publish \
  --token "$FIGMA_TOKEN" \
  --config figma.config.json

echo ""
echo "✅ ¡Code Connect publicado exitosamente!"
echo ""
echo "📋 Qué ver ahora en Figma:"
echo "   1. Abre tu archivo de Figma"
echo "   2. Presiona Shift + D para activar Dev Mode"
echo "   3. Selecciona cualquier frame (Sign In, Dashboard, Booking, Checkout)"
echo "   4. En el panel derecho verás tu código React Native apareciendo"
echo ""
echo "Para actualizar el código publicado, corre este script de nuevo."
echo ""
