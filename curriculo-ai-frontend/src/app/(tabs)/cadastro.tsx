import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonConfirm from "../../components/button-confirm-compent";
import { Input } from "../../components/input-component";
import StepHeader from "../../components/step-header";
import { COLORS, FONT, INPUT_WIDTH, SPACING } from "../../components/style";
import { useCurriculoData } from "../../context/curriculo-data-context";
import { useUserProfile } from "../../context/user-profile-context";

// ─── Validação ────────────────────────────────────────────────────────────────
const nomeValido = (v: string) => /^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(v.trim());
const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const senhaForte = (v: string) =>
  v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v);

// ─── Indicador de força de senha ─────────────────────────────────────────────
function PasswordStrength({ senha }: { senha: string }) {
  const checks = [
    { ok: senha.length >= 8, label: "8+ caracteres" },
    { ok: /[A-Z]/.test(senha), label: "Maiúscula" },
    { ok: /[0-9]/.test(senha), label: "Número" },
    { ok: /[^a-zA-Z0-9]/.test(senha), label: "Símbolo" },
  ];
  if (!senha) return null;
  const score = checks.filter((c) => c.ok).length;
  const barColor =
    score <= 1 ? COLORS.error : score === 2 ? "#f59e0b" : score === 3 ? "#60a5fa" : COLORS.success;

  return (
    <View style={pw.container}>
      <View style={pw.bars}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              pw.bar,
              { backgroundColor: i <= score ? barColor : COLORS.border },
            ]}
          />
        ))}
      </View>
      <View style={pw.tags}>
        {checks.map((c) => (
          <View
            key={c.label}
            style={[pw.tag, c.ok && { backgroundColor: "rgba(52,211,153,0.12)", borderColor: COLORS.success }]}
          >
            <Text style={[pw.tagText, c.ok && { color: COLORS.success }]}>
              {c.ok ? "✓ " : ""}{c.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const pw = StyleSheet.create({
  container: { width: INPUT_WIDTH, marginTop: SPACING.sm },
  bars: { flexDirection: "row", gap: 4, marginBottom: SPACING.sm },
  bar: { flex: 1, height: 3, borderRadius: 2 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { color: COLORS.textMuted, fontSize: 11, fontWeight: "600" },
});

// ─── Tela ─────────────────────────────────────────────────────────────────────
export default function Cadastro() {
  const { updateDadosPessoais } = useCurriculoData();
  const { updateProfile } = useUserProfile();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [tentou, setTentou] = useState(false);

  const camposPreenchidos = useMemo(
    () => nome && sobrenome && email && senha && confirmarSenha,
    [nome, sobrenome, email, senha, confirmarSenha]
  );

  function validar() {
    const e: Record<string, string> = {};
    if (!nomeValido(nome)) e.nome = "Nome inválido (mínimo 2 letras, sem números).";
    if (!nomeValido(sobrenome)) e.sobrenome = "Sobrenome inválido.";
    if (!emailValido(email)) e.email = "Informe um e-mail válido.";
    if (!senhaForte(senha)) e.senha = "Senha deve ter 8+ chars, 1 maiúscula e 1 número.";
    if (senha !== confirmarSenha) e.confirmarSenha = "As senhas não coincidem.";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function handleProximo() {
    setTentou(true);
    if (!validar()) return;

    const dados = {
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      email: email.trim(),
    };

    updateDadosPessoais(dados);
    updateProfile({
      nome: `${dados.nome} ${dados.sobrenome}`.trim(),
      email: dados.email,
    });
    router.push("/formacao");
  }

  function limpar(campo: string) {
    if (tentou) setErros((prev) => ({ ...prev, [campo]: "" }));
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
      enableOnAndroid
      extraScrollHeight={20}
    >
      <StatusBar style="light" />

      <StepHeader
        etapa={1}
        titulo="Crie sua conta"
        descricao="Preencha seus dados pessoais para começar."
        etapaLabel="Etapa 1 de 5 · Dados pessoais"
      />

      <View style={styles.form}>
        <Input
          label="Nome"
          placeholder="Seu primeiro nome"
          autoCapitalize="words"
          value={nome}
          onChangeText={(v) => { setNome(v); limpar("nome"); }}
          erro={erros.nome}
        />
        <Input
          label="Sobrenome"
          placeholder="Seu sobrenome"
          autoCapitalize="words"
          value={sobrenome}
          onChangeText={(v) => { setSobrenome(v); limpar("sobrenome"); }}
          erro={erros.sobrenome}
        />
        <Input
          label="E-mail"
          icone="email-outline"
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(v) => { setEmail(v); limpar("email"); }}
          erro={erros.email}
        />
        <Input
          label="Senha"
          icone="lock-outline"
          placeholder="Mín. 8 chars, 1 maiúscula, 1 número"
          secureTextEntry
          autoCapitalize="none"
          value={senha}
          onChangeText={(v) => { setSenha(v); limpar("senha"); }}
          erro={erros.senha}
        />
        <PasswordStrength senha={senha} />

        <Input
          label="Confirmar Senha"
          icone="lock-check-outline"
          placeholder="Repita a senha"
          secureTextEntry
          autoCapitalize="none"
          value={confirmarSenha}
          onChangeText={(v) => { setConfirmarSenha(v); limpar("confirmarSenha"); }}
          erro={erros.confirmarSenha}
        />

        <ButtonConfirm text="Próximo →" onPress={handleProximo} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingBottom: 80,
  },
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: SPACING.md,
  },
});
