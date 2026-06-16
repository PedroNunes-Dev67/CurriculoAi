import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ButtonConfirm from "../components/button-confirm-compent";
import Divisao from "../components/divisao-component";
import { Input } from "../components/input-component";
import { COLORS, FONT, SPACING } from "../components/style";
import { useUserProfile } from "../context/user-profile-context";
import { salvarTokenJWT } from "../services/AuthService";
import { buscarUsuarioLogado, loginUsuario } from "../services/UsuarioService";

// ─── Validação ────────────────────────────────────────────────────────────────
function emailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// ─── Tela ─────────────────────────────────────────────────────────────────────
export default function Login() {
  const { updateProfile } = useUserProfile();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState<{ email?: string; senha?: string }>({});
  const [loading, setLoading] = useState(false);

  function validar() {
    const novosErros: { email?: string; senha?: string } = {};
    if (!email.trim()) novosErros.email = "Informe seu e-mail.";
    else if (!emailValido(email)) novosErros.email = "E-mail inválido.";
    if (!senha.trim()) novosErros.senha = "Informe sua senha.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function login() {
    if (!validar()) return;

    try {
      setLoading(true);

      const token = await loginUsuario({
        email: email.trim(),
        senha,
      });

      await salvarTokenJWT(token);

      const usuario = await buscarUsuarioLogado();

      console.log("Login efetuado");

      updateProfile({
        nome: usuario.usuario.nome,
        email: email.trim(),
        projetos: usuario.projetos,
      });

      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error ? error.message : "Erro ao realizar login",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      {/* Fundo com efeito */}
      <View style={styles.bgGlow} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/robofdp.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Header */}
        <Text style={styles.titulo}>Bem-vindo de volta</Text>
        <Text style={styles.subtitulo}>Entre com sua conta para continuar</Text>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="E-mail"
            icone="email-outline"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              setErros((e) => ({ ...e, email: undefined }));
            }}
            erro={erros.email}
          />

          <Input
            label="Senha"
            icone="lock-outline"
            placeholder="••••••••"
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry
            value={senha}
            onChangeText={(v) => {
              setSenha(v);
              setErros((e) => ({ ...e, senha: undefined }));
            }}
            erro={erros.senha}
          />

          <ButtonConfirm
            text="Entrar"
            onPress={login}
            loading={loading}
            disabled={loading}
          />
        </View>

        <Divisao />

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Não possui uma conta?</Text>
          <ButtonConfirm
            text="Criar conta gratuita"
            variant="secondary"
            onPress={() => router.push("/(tabs)/cadastro")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  bgGlow: {
    position: "absolute",
    top: -80,
    left: "50%",
    marginLeft: -180,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "rgba(59,130,246,0.08)",
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: 40,
    paddingBottom: 60,
  },
  logoWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(59,130,246,0.06)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    marginTop: SPACING.xl,
  },
  logo: {
    width: 110,
    height: 110,
  },
  titulo: {
    color: COLORS.textPrimary,
    fontSize: FONT.xxl,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitulo: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    textAlign: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  signupRow: {
    alignItems: "center",
    width: "100%",
    marginTop: SPACING.sm,
  },
  signupText: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    marginBottom: SPACING.xs,
  },
});
