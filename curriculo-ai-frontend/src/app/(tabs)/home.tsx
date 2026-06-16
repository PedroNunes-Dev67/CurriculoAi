import { pegarTokenJWT } from "@/src/services/AuthService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Href, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../../components/style";
import { useUserProfile } from "../../context/user-profile-context";
import { useCurriculos } from "../../hooks/use-curriculos";
import { Curriculo } from "../../types/curriculo";

const RECURSOS = [
  { id: "1", icone: "auto-fix", label: "IA\ninteligente" },
  { id: "2", icone: "chart-bar", label: "Performance" },
  { id: "3", icone: "file-document-outline", label: "Templates" },
  { id: "4", icone: "shield-check-outline", label: "ATS Score" },
] as const;

function CurriculoCard({ item }: { item: Curriculo }) {
  return (
    <TouchableOpacity style={styles.curriculoCard} activeOpacity={0.75}>
      <View style={styles.curriculoInfo}>
        <Text style={styles.curriculoTitulo}>{item.titulo}</Text>
        <Text style={styles.curriculoSub}>{item.subtitulo}</Text>
      </View>
      <View
        style={[
          styles.badge,
          item.status === "Completo"
            ? styles.badgeCompleto
            : styles.badgeRascunho,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            item.status === "Completo"
              ? styles.badgeTextCompleto
              : styles.badgeTextRascunho,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Home() {
  const { profile, getInitials } = useUserProfile();
  const { curriculos, loading, error, refreshing, refresh } = useCurriculos({
    userId: profile.email || undefined,
  });

  useEffect(() => {
    async function verificarAutenticacao() {
      const token = await pegarTokenJWT();

      if (!token) {
        router.replace("/login");
      }
    }

    verificarAutenticacao();
  }, []);

  const renderCurriculo: ListRenderItem<Curriculo> = useCallback(
    ({ item }) => <CurriculoCard item={item} />,
    [],
  );

  const ListHeader = (
    <>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>
          O currículo perfeito{"\n"}começa com{" "}
          <Text style={styles.heroTitleAccent}>IA</Text>
        </Text>
        <Text style={styles.heroDesc}>
          Gere, melhore e otimize seu currículo para passar em qualquer processo
          seletivo.
        </Text>

        <TouchableOpacity
          style={styles.heroCTA}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/curriculo_novo" as Href)}
        >
          <View style={styles.heroCTALeft}>
            <Text style={styles.heroCTAPlus}>+</Text>
            <Text style={styles.heroCTAText}>Criar novo currículo</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.heroCTASecondary}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/analise_curriculo" as Href)}
        >
          <View style={styles.heroCTALeft}>
            <MaterialCommunityIcons
              name="file-search-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.heroCTASecondaryText}>
              Analisar o seu currículo atual
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Seus currículos</Text>
    </>
  );

  const ListEmpty = (
    <View style={styles.emptyState}>
      {loading ? (
        <>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.emptyText}>Carregando currículos...</Text>
        </>
      ) : error ? (
        <>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={28}
            color={COLORS.error}
          />
          <Text style={styles.emptyText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refresh}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={28}
            color={COLORS.textMuted}
          />
          <Text style={styles.emptyText}>Nenhum currículo encontrado.</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandName}>CURRICULO AI</Text>
          <Text style={styles.brandSub}>Crie, evolua e conquiste vagas</Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => router.push("/(tabs)/perfil" as Href)}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Abrir perfil do usuário"
        >
          {profile.fotoUri ? (
            <Image
              source={{ uri: profile.fotoUri }}
              style={styles.avatarImage}
            />
          ) : (
            <Text style={styles.avatarText}>{getInitials()}</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={curriculos}
        keyExtractor={(item) => item.id}
        renderItem={renderCurriculo}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refresh}
      />
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: SPACING.md,
    paddingTop: 52,
    paddingBottom: SPACING.md,
  },
  brandName: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  brandSub: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
    marginTop: 3,
    fontWeight: "400",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: "#1f4e8c",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.3)",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: "700",
  },
  scroll: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 48,
    flexGrow: 1,
  },
  heroCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.12)",
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.xxl,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: SPACING.sm,
  },
  heroTitleAccent: {
    color: COLORS.primary,
  },
  heroDesc: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  heroCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  heroCTASecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(59,130,246,0.08)",
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.3)",
  },
  heroCTALeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroCTAPlus: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "300",
    lineHeight: 24,
  },
  heroCTAText: {
    color: COLORS.white,
    fontSize: FONT.md,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  heroCTASecondaryText: {
    color: COLORS.primary,
    fontSize: FONT.md,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  section: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.lg,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },
  curriculoCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.08)",
  },
  curriculoInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  curriculoTitulo: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    fontWeight: "700",
    marginBottom: 3,
  },
  curriculoSub: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
  },
  badge: {
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  badgeCompleto: {
    backgroundColor: COLORS.primary,
  },
  badgeRascunho: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: {
    fontSize: FONT.xs,
    fontWeight: "700",
  },
  badgeTextCompleto: {
    color: COLORS.white,
  },
  badgeTextRascunho: {
    color: COLORS.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    textAlign: "center",
  },
  retryButton: {
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.3)",
  },
  retryButtonText: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: "700",
  },
  recursosGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  recursoCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: SPACING.sm,
    alignItems: "center",
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.08)",
  },
  recursoLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 14,
  },
});
