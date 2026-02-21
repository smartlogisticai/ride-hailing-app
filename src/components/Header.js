// ─── Header ──────────────────────────────────────────────────────────────────
// App-wide navigation header with optional back button and right action.

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { SPACING, SHADOW } from '../constants/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';

// ── Internal: Back Arrow Icon (no external icon lib required) ────────────────
const BackArrow = ({ color }) => (
  <View style={{ width: 20, height: 20, justifyContent: 'center' }}>
    <View
      style={{
        width: 12,
        height: 12,
        borderLeftWidth: 2.5,
        borderBottomWidth: 2.5,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginLeft: 4,
      }}
    />
  </View>
);

const Header = ({
  title,
  showBack = false,
  onBack,
  rightElement,
  transparent = false,
  dark = false,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const textColor = dark || transparent ? COLORS.white : COLORS.textPrimary;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + SPACING.sm },
        transparent ? styles.transparent : styles.solid,
      ]}
    >
      <View style={styles.inner}>
        {/* Left: back button */}
        <View style={styles.side}>
          {showBack && (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={handleBack}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <BackArrow color={textColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center: title */}
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>

        {/* Right: optional element */}
        <View style={[styles.side, styles.sideRight]}>
          {rightElement ?? null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.base,
    zIndex: 10,
  },
  solid: {
    backgroundColor: COLORS.white,
    ...SHADOW.sm,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  side: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  backBtn: {
    padding: SPACING.xs,
    borderRadius: SPACING.md,
    backgroundColor: COLORS.background,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: -0.3,
  },
});

export default Header;
