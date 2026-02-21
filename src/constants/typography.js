// ─── Design System: Typography Tokens ───────────────────────────────────────

import { Platform } from 'react-native';

const BASE_FONT = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const FONTS = {
  regular: BASE_FONT,
  medium: BASE_FONT,
  semiBold: BASE_FONT,
  bold: BASE_FONT,
};

export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 38,
};

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const LINE_HEIGHT = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
};
