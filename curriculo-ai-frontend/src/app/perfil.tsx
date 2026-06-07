import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCurriculoData } from "../context/curriculo-data-context";
import { useUserProfile } from "../context/user-profile-context";
import { COLORS, FONT, RADIUS, SPACING } from "../components/style";

const REDES_SUGERIDAS = ["LinkedIn", "GitHub", "Instagram", "Portfolio", "Outro"];

export default function Perfil() {
  const {
    profile,
    setFotoUri,
    addRedeSocial,
    removeRedeSocial,
    addProjeto,
    removeProjeto,
    getInitials,
    logout,
  } = useUserProfile();
  const { resetCurriculoData } = useCurriculoData();

  const [novaRedePlataforma, setNovaRedePlataforma] = useState(REDES_SUGERIDAS[0]);
  const [novaRedeUrl, setNovaRedeUrl] = useState("");
  const [novoProjetoNome, setNovoProjetoNome] = useState("");
  const [novoProjetoDescricao, setNovoProjetoDescricao] = useState("");
  const [novoProjetoLink, setNovoProjetoLink] = useState("");

  async function escolherFoto() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setFotoUri(result.assets[0].uri);
    }
  }

  function handleAdicionarRede() {
    if (!novaRedeUrl.trim()) {
      Alert.alert("Campo vazio", "Informe o link ou usuário da rede social.");
      return;
    }
    addRedeSocial({ plataforma: novaRedePlataforma, url: novaRedeUrl.trim() });
    setNovaRedeUrl("");
  }

  function handleAdicionarProjeto() {
    if (!novoProjetoNome.trim()) {
      Alert.alert("Campo vazio", "Informe o nome do projeto.");
      return;
    }
    addProjeto({
      nome: novoProjetoNome.trim(),
      descricao: novoProjetoDescricao.trim(),
      link: novoProjetoLink.trim(),
    });
    setNovoProjetoNome("");
    setNovoProjetoDescricao("");
    setNovoProjetoLink("");
  }

  function handleLogout() {
    Alert.alert("Sair da conta", "Deseja encerrar sua sessão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          logout();
          resetCurriculoData();
          router.replace("/login");
        },
      },
    ]);
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Meu perfil</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={20}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={escolherFoto}
            activeOpacity={0.8}
          >
            {profile.fotoUri ? (
              <Image source={{ uri: profile.fotoUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{getInitials()}</Text>
              </View>
            )}
            <View style={styles.avatarBadge}>
              <MaterialCommunityIcons name="camera" size={14} color={COLORS.white} />
            </View>
          </TouchableOpacity>

          <Text style={styles.profileName}>{profile.nome}</Text>
          <Text style={styles.profileEmail}>{profile.email || "E-mail não informado"}</Text>
          <Text style={styles.photoHint}>Toque na foto para alterar</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="share-variant-outline" size={20} color={COLORS.primary} />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Redes sociais</Text>
              <Text style={styles.sectionSubtitle}>Opcional · destaque seu perfil profissional</Text>
            </View>
          </View>

          {profile.redesSociais.map((rede) => (
            <View key={rede.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{rede.plataforma}</Text>
                <Text style={styles.itemSub} numberOfLines={1}>
                  {rede.url}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeRedeSocial(rede.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <MaterialCommunityIcons name="close-circle" size={22} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.formCard}>
            <Text style={styles.fieldLabel}>Plataforma</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {REDES_SUGERIDAS.map((rede) => (
                <TouchableOpacity
                  key={rede}
                  style={[styles.chip, novaRedePlataforma === rede && styles.chipActive]}
                  onPress={() => setNovaRedePlataforma(rede)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      novaRedePlataforma === rede && styles.chipTextActive,
                    ]}
                  >
                    {rede}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.fieldLabel}>Link ou usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="https://linkedin.com/in/seu-perfil"
              placeholderTextColor={COLORS.textPlaceholder}
              value={novaRedeUrl}
              onChangeText={setNovaRedeUrl}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAdicionarRede} activeOpacity={0.8}>
              <MaterialCommunityIcons name="plus" size={18} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Adicionar rede social</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="folder-outline" size={20} color={COLORS.primary} />
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>Projetos</Text>
              <Text style={styles.sectionSubtitle}>Opcional · mostre o que você já construiu</Text>
            </View>
          </View>

          {profile.projetos.map((projeto) => (
            <View key={projeto.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{projeto.nome}</Text>
                {projeto.descricao ? (
                  <Text style={styles.itemSub} numberOfLines={2}>
                    {projeto.descricao}
                  </Text>
                ) : null}
                {projeto.link ? (
                  <Text style={styles.itemLink} numberOfLines={1}>
                    {projeto.link}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={() => removeProjeto(projeto.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <MaterialCommunityIcons name="close-circle" size={22} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.formCard}>
            <Text style={styles.fieldLabel}>Nome do projeto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: App de finanças pessoais"
              placeholderTextColor={COLORS.textPlaceholder}
              value={novoProjetoNome}
              onChangeText={setNovoProjetoNome}
            />

            <Text style={styles.fieldLabel}>Descrição (opcional)</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Breve descrição do projeto"
              placeholderTextColor={COLORS.textPlaceholder}
              value={novoProjetoDescricao}
              onChangeText={setNovoProjetoDescricao}
              multiline
            />

            <Text style={styles.fieldLabel}>Link (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="https://github.com/seu-usuario/projeto"
              placeholderTextColor={COLORS.textPlaceholder}
              value={novoProjetoLink}
              onChangeText={setNovoProjetoLink}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAdicionarProjeto} activeOpacity={0.8}>
              <MaterialCommunityIcons name="plus" size={18} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Adicionar projeto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <MaterialCommunityIcons name="logout" size={20} color={COLORS.error} />
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingTop: 52,
    paddingBottom: SPACING.md,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonPlaceholder: {
    width: 38,
  },
  topBarTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.lg,
    fontWeight: "700",
  },
  scroll: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 48,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: SPACING.md,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.full,
  },
  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.full,
    backgroundColor: "#1f4e8c",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(59,130,246,0.3)",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: FONT.xxl,
    fontWeight: "700",
  },
  avatarBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.bg,
  },
  profileName: {
    color: COLORS.textPrimary,
    fontSize: FONT.xl,
    fontWeight: "800",
    marginBottom: 4,
  },
  profileEmail: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
  },
  photoHint: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    marginTop: SPACING.sm,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.lg,
    fontWeight: "700",
  },
  sectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    marginTop: 2,
  },
  itemCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.08)",
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  itemTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    fontWeight: "700",
    marginBottom: 2,
  },
  itemSub: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
  },
  itemLink: {
    color: COLORS.accent,
    fontSize: FONT.xs,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.08)",
  },
  fieldLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
    marginTop: SPACING.sm,
  },
  chipScroll: {
    marginBottom: SPACING.xs,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: "rgba(59,130,246,0.15)",
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
    fontWeight: "600",
  },
  chipTextActive: {
    color: COLORS.primary,
  },
  input: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: FONT.md,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: SPACING.md,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.3)",
    backgroundColor: "rgba(59,130,246,0.08)",
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: "700",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.35)",
    backgroundColor: "rgba(239,68,68,0.08)",
  },
  logoutButtonText: {
    color: COLORS.error,
    fontSize: FONT.md,
    fontWeight: "700",
  },
});
