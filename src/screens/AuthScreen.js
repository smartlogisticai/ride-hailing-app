// ─── AuthScreen ───────────────────────────────────────────────────────────────
// Generated from Figma: "Sign In" frame (node 1:1588)
// Design: White card, Inter font, email + social auth flow

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// ── Design tokens (match Figma exactly) ─────────────────────────────────────
const C = {
  bg: '#FFFFFF',
  black: '#0D0D0D',
  gray: '#828282',
  border: '#E0E0E0',
  surface: '#EEEEEE',
  text: '#000000',
  textMuted: 'rgba(0,0,0,0.5)',
};

const AuthScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa tu correo electrónico.');
      return;
    }
    setLoading(true);
    // Simulate auth check — replace with real auth endpoint
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigation.replace('MainTabs');
  };

  const handleGoogle = () => {
    // TODO: Integrate Google OAuth via expo-auth-session
    Alert.alert('Google Auth', 'Conecta tu flujo de Google OAuth aquí.');
  };

  const handleApple = () => {
    // TODO: Integrate Apple Sign-In via expo-apple-authentication
    Alert.alert('Apple Auth', 'Conecta tu flujo de Apple Sign-In aquí.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 64, paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── App Name (Figma: node 1:1618) ─── */}
        <Text style={styles.appName}>Nombre de la aplicación</Text>

        {/* ── Auth Card ─── */}
        <View style={styles.card}>
          {/* Copy (node 1:1592) */}
          <View style={styles.copyBlock}>
            <Text style={styles.heading}>Crear una cuenta</Text>
            <Text style={styles.subheading}>
              Introduce tu correo electrónico para registrarte en esta aplicación
            </Text>
          </View>

          {/* Email input (node 1:1596) */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="email@domain.com"
              placeholderTextColor={C.gray}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Continue button (node 1:1598) */}
          <TouchableOpacity
            style={[styles.btnPrimary, loading && styles.btnDisabled]}
            onPress={handleContinue}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Text style={styles.btnPrimaryLabel}>Continuar</Text>
            )}
          </TouchableOpacity>

          {/* Divider (node 1:1600) */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons (node 1:1604) */}
          <TouchableOpacity style={styles.btnSocial} onPress={handleGoogle} activeOpacity={0.85}>
            {/* Google "G" using text since no icon library needed */}
            <View style={styles.socialIcon}>
              <Text style={styles.socialIconG}>G</Text>
            </View>
            <Text style={styles.btnSocialLabel}>Continuar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSocial} onPress={handleApple} activeOpacity={0.85}>
            <View style={styles.socialIcon}>
              <Text style={styles.socialIconA}>🍎</Text>
            </View>
            <Text style={styles.btnSocialLabel}>Continuar con Apple</Text>
          </TouchableOpacity>

          {/* Legal text (node 1:1617) */}
          <Text style={styles.legal}>
            Al hacer clic en continuar, aceptas nuestros{' '}
            <Text style={styles.legalLink}>Términos de Servicio</Text>
            {' '}y nuestra{' '}
            <Text style={styles.legalLink}>Política de Privacidad</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: C.black,
    letterSpacing: -0.24,
    marginBottom: 48,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  copyBlock: {
    alignItems: 'center',
    gap: 2,
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: C.black,
    lineHeight: 24,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '400',
    color: C.black,
    textAlign: 'center',
    lineHeight: 21,
  },
  inputWrapper: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: C.bg,
  },
  input: {
    fontSize: 14,
    color: C.black,
    fontWeight: '400',
  },
  btnPrimary: {
    width: '100%',
    height: 40,
    backgroundColor: C.black,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnPrimaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  dividerText: {
    fontSize: 14,
    color: C.gray,
    fontWeight: '400',
  },
  btnSocial: {
    width: '100%',
    height: 40,
    backgroundColor: C.surface,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconG: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4285F4',
  },
  socialIconA: {
    fontSize: 14,
  },
  btnSocialLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: C.black,
  },
  legal: {
    fontSize: 12,
    color: C.gray,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
  legalLink: {
    color: C.black,
    fontWeight: '500',
  },
});

export default AuthScreen;
