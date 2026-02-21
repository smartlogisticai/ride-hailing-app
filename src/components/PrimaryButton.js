// ─── PrimaryButton ───────────────────────────────────────────────────────────
// Reusable CTA button with loading state support.

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, SHADOW } from '../constants/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';

const PrimaryButton = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'filled', // 'filled' | 'outline' | 'ghost'
  icon = null,
  style,
  labelStyle,
}) => {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.base,
    variant === 'filled' && styles.filled,
    variant === 'outline' && styles.outline,
    variant === 'ghost' && styles.ghost,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.label,
    variant === 'outline' && styles.labelOutline,
    variant === 'ghost' && styles.labelGhost,
    isDisabled && styles.labelDisabled,
    labelStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.82}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'filled' ? COLORS.white : COLORS.primary}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text style={textStyle}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    ...SHADOW.md,
  },
  filled: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconWrapper: {
    marginRight: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textOnPrimary,
    letterSpacing: 0.2,
  },
  labelOutline: {
    color: COLORS.primary,
  },
  labelGhost: {
    color: COLORS.primary,
  },
  labelDisabled: {
    color: COLORS.textMuted,
  },
});

export default PrimaryButton;
