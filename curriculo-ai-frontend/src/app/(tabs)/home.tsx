import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS, FONT, RADIUS, SPACING } from "../../components/style";


const CURRICULOS = [
  {
    id: "1",
    titulo: "Desenvolvedor Frontend",
    subtitulo: "Atualizado há 2 dias",
    status: "Completo" as const,
  },
  {
    id: "2",
    titulo: "Analista de Dados",
    subtitulo: "Atualizado há 4 dias",
    status: "Completo" as const,
  },
  {
    id: "3",
    titulo: "Product Designer",
    subtitulo: "Em edição",
    status: "Rascunho" as const,
  },
];

const RECURSOS = [
  { id: "1", icone: "auto-fix", label: "IA\ninteligente" },
  { id: "2", icone: "chart-bar", label: "Performance" },
  { id: "3", icone: "file-document-outline", label: "Templates" },
  { id: "4", icone: "shield-check-outline", label: "ATS Score" },
] as const;

// telinha que deu dor de cabeça

export default function Home() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* bar de cima */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandName}>CURRICULO AI</Text>
          <Text style={styles.brandSub}>Crie, evolua e conquiste vagas</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* cardizinhos */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>
            O currículo perfeito{"\n"}começa com{" "}
            <Text style={styles.heroTitleAccent}>IA</Text>
          </Text>
          <Text style={styles.heroDesc}>
            Gere, melhore e otimize seu currículo para passar em qualquer
            processo seletivo.
          </Text>
          <TouchableOpacity
            style={styles.heroCTA}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/cadastro")}
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
        </View>

        {/* onde fica os curriculos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seus currículos</Text>

          {CURRICULOS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.curriculoCard}
              activeOpacity={0.75}
            >
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
          ))}
        </View>

        {/* recursos rapidos *IA que fez* */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos rápidos</Text>
          <View style={styles.recursosGrid}>
            {RECURSOS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recursoCard}
                activeOpacity={0.75}
              >
                <MaterialCommunityIcons
                  name={item.icone}
                  size={26}
                  color={COLORS.primary}
                />
                <Text style={styles.recursoLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// estilos

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  // bar de cima
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
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: "700",
  },

  // scroll
  scroll: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 48,
  },

  // card
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

  // ─── Section ──────────────────────────────────────────────────────────────
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.lg,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },

  // ─── Currículo Card ───────────────────────────────────────────────────────
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

  // ─── Recursos Grid ────────────────────────────────────────────────────────
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
