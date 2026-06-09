import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../../components/style";
import { useCurriculoData } from "../../context/curriculo-data-context";
import { useUserProfile } from "../../context/user-profile-context";
import { CurriculoCompletoData } from "../../types/curriculo-completo";
import { formatPeriodo } from "../../utils/date-format";

const NIVEL_LABEL: Record<number, string> = {
  1: "Básico",
  2: "Intermediário",
  3: "Fluente",
};

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.scoreRow}>
      <View style={styles.scoreLabelRow}>
        <Text style={styles.scoreLabel}>{label}</Text>
        <Text style={[styles.scoreValue, { color }]}>{value}%</Text>
      </View>
      <View style={styles.scoreTrack}>
        <View style={[styles.scoreFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function SectionBlock({
  title,
  icon,
  children,
  empty,
}: {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  children?: React.ReactNode;
  empty?: string;
}) {
  const hasContent = React.Children.count(children) > 0;
  return (
    <View style={styles.cvSection}>
      <View style={styles.cvSectionHeader}>
        <MaterialCommunityIcons name={icon} size={16} color={COLORS.primary} />
        <Text style={styles.cvSectionTitle}>{title}</Text>
      </View>
      {!hasContent ? (
        <Text style={styles.cvEmpty}>{empty || "Não informado"}</Text>
      ) : (
        children
      )}
    </View>
  );
}

function calcularCompletude(data: CurriculoCompletoData): number {
  let score = 20;
  if (data.dadosPessoais?.nome) score += 15;
  if (data.areaAtuacao) score += 10;
  if (data.formacoes.length) score += 15;
  if (data.experiencias.length) score += 20;
  if (data.certificacoes.length) score += 10;
  if (data.disponibilidade) score += 10;
  return Math.min(score, 100);
}

export default function CurriculoNovo() {
  const { data, hasCurriculoData, getNomeCompleto } = useCurriculoData();
  const { profile } = useUserProfile();

  const nome = getNomeCompleto() || profile.nome || "Seu nome";
  const email = data.dadosPessoais?.email || profile.email || "";
  const temDados = hasCurriculoData();

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Seu currículo</Text>
        <View style={styles.iconBtnPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBadge}>
          <MaterialCommunityIcons name="file-document-check-outline" size={18} color={COLORS.primary} />
          <Text style={styles.heroBadgeText}>Gerado com base no seu cadastro</Text>
        </View>

        {!temDados ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconWrap}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={40} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>Currículo ainda não montado</Text>
            <Text style={styles.emptyDesc}>
              Preencha as etapas de cadastro para gerarmos seu currículo automaticamente.
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/(tabs)/cadastro")}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>Preencher cadastro</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.previewCard}>
              <View style={styles.previewGlow} pointerEvents="none" />

              <View style={styles.cvHeader}>
                <View style={styles.cvAvatar}>
                  <Text style={styles.cvAvatarText}>
                    {nome
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")
                      .toUpperCase()}
                  </Text>
                </View>
                <View style={styles.cvHeaderInfo}>
                  <Text style={styles.cvName}>{nome}</Text>
                  {email ? (
                    <View style={styles.cvContactRow}>
                      <MaterialCommunityIcons name="email-outline" size={14} color="#64748b" />
                      <Text style={styles.cvContact}>{email}</Text>
                    </View>
                  ) : null}
                  {data.areaAtuacao ? (
                    <View style={styles.cvAreaTag}>
                      <Text style={styles.cvAreaTagText}>{data.areaAtuacao}</Text>
                    </View>
                  ) : null}
                </View>
              </View>

              <View style={styles.cvDivider} />

              <SectionBlock
                title="Formação acadêmica"
                icon="school-outline"
                empty="Nenhuma formação adicionada"
              >
                {data.formacoes.map((f, i) => (
                  <View key={`form-${i}`} style={styles.cvItem}>
                    <Text style={styles.cvItemTitle}>{f.curso}</Text>
                    <Text style={styles.cvItemSub}>{f.tipoFormacao}</Text>
                    <Text style={styles.cvItemMeta}>
                      {formatPeriodo(f.dataInicio, f.cursando ? null : f.dataTermino, f.cursando)}
                    </Text>
                  </View>
                ))}
              </SectionBlock>

              <SectionBlock
                title="Experiência profissional"
                icon="briefcase-outline"
                empty="Nenhuma experiência adicionada"
              >
                {data.experiencias.map((e, i) => (
                  <View key={`exp-${i}`} style={styles.cvItem}>
                    <Text style={styles.cvItemTitle}>{e.cargo}</Text>
                    <Text style={styles.cvItemSub}>
                      {e.empresa} · {e.area}
                    </Text>
                    <Text style={styles.cvItemMeta}>
                      {formatPeriodo(e.inicio, e.termino, e.atual)}
                    </Text>
                  </View>
                ))}
              </SectionBlock>

              <SectionBlock
                title="Certificações"
                icon="certificate-outline"
                empty="Nenhuma certificação adicionada"
              >
                {data.certificacoes.map((c, i) => (
                  <View key={`cert-${i}`} style={styles.cvItem}>
                    <Text style={styles.cvItemTitle}>{c.nome}</Text>
                    <Text style={styles.cvItemSub}>
                      {c.instituicao}
                      {c.anoConclusao ? ` · ${c.anoConclusao}` : ""}
                    </Text>
                  </View>
                ))}
              </SectionBlock>

              {data.disponibilidade ? (
                <SectionBlock title="Disponibilidade" icon="calendar-clock-outline">
                  <View style={styles.cvItem}>
                    <Text style={styles.cvItemSub}>
                      {data.disponibilidade.inicioImediato
                        ? "Disponível para início imediato"
                        : `Disponível a partir de ${data.disponibilidade.dataDisponibilidade || "—"}`}
                    </Text>
                    {data.disponibilidade.modalidade ? (
                      <Text style={styles.cvItemMeta}>
                        Modalidade: {data.disponibilidade.modalidade}
                      </Text>
                    ) : null}
                  </View>
                  {data.disponibilidade.idiomas.filter((i) => i.nome && i.nivel > 0).length > 0 ? (
                    <View style={styles.idiomasWrap}>
                      {data.disponibilidade.idiomas
                        .filter((i) => i.nome && i.nivel > 0)
                        .map((idioma, i) => (
                          <View key={`idioma-${i}`} style={styles.idiomaChip}>
                            <Text style={styles.idiomaChipText}>
                              {idioma.nome} · {NIVEL_LABEL[idioma.nivel] || "—"}
                            </Text>
                          </View>
                        ))}
                    </View>
                  ) : null}
                </SectionBlock>
              ) : null}

              {profile.redesSociais.length > 0 && (
                <SectionBlock title="Redes sociais" icon="share-variant-outline">
                  {profile.redesSociais.map((rede) => (
                    <View key={rede.id} style={styles.cvItem}>
                      <Text style={styles.cvItemTitle}>{rede.plataforma}</Text>
                      <Text style={styles.cvItemSub}>{rede.url}</Text>
                    </View>
                  ))}
                </SectionBlock>
              )}

              {profile.projetos.length > 0 && (
                <SectionBlock title="Projetos" icon="folder-outline">
                  {profile.projetos.map((projeto) => (
                    <View key={projeto.id} style={styles.cvItem}>
                      <Text style={styles.cvItemTitle}>{projeto.nome}</Text>
                      {projeto.descricao ? (
                        <Text style={styles.cvItemSub}>{projeto.descricao}</Text>
                      ) : null}
                      {projeto.link ? <Text style={styles.cvItemLink}>{projeto.link}</Text> : null}
                    </View>
                  ))}
                </SectionBlock>
              )}
            </View>

            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Qualidade do currículo</Text>
              <ScoreBar label="Completude" value={calcularCompletude(data)} color={COLORS.primary} />
              <ScoreBar
                label="Experiência"
                value={data.experiencias.length > 0 ? 85 : 30}
                color={COLORS.success}
              />
              <ScoreBar
                label="Formação"
                value={data.formacoes.length > 0 ? 80 : 25}
                color={COLORS.accent}
              />
            </View>
          </>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push("/(tabs)/cadastro")}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name="pencil-outline" size={18} color={COLORS.primary} />
            <Text style={styles.secondaryBtnText}>Editar informações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.replace("/(tabs)/home")}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Voltar para home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingTop: 52,
    paddingBottom: SPACING.md,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnPlaceholder: { width: 38 },
  topTitle: { color: COLORS.textPrimary, fontSize: FONT.lg, fontWeight: "700" },
  scroll: { paddingHorizontal: SPACING.md, paddingBottom: 48 },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    backgroundColor: "rgba(59,130,246,0.1)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.25)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: SPACING.md,
  },
  heroBadgeText: {
    color: COLORS.accent,
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  emptyCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.12)",
    marginBottom: SPACING.lg,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(59,130,246,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.xl,
    fontWeight: "800",
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  emptyDesc: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  previewCard: {
    backgroundColor: "#f8fbff",
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.15)",
    overflow: "hidden",
    position: "relative",
  },
  previewGlow: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(59,130,246,0.08)",
  },
  cvHeader: { flexDirection: "row", gap: SPACING.md, marginBottom: SPACING.md },
  cvAvatar: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    backgroundColor: "#1e3a5f",
    justifyContent: "center",
    alignItems: "center",
  },
  cvAvatarText: { color: COLORS.primary, fontSize: FONT.lg, fontWeight: "800" },
  cvHeaderInfo: { flex: 1, justifyContent: "center" },
  cvName: { color: "#0f172a", fontSize: FONT.xl, fontWeight: "800", marginBottom: 4 },
  cvContactRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  cvContact: { color: "#475569", fontSize: FONT.sm },
  cvAreaTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(59,130,246,0.12)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cvAreaTagText: { color: COLORS.primaryDark, fontSize: FONT.xs, fontWeight: "700" },
  cvDivider: { height: 1, backgroundColor: "rgba(15,23,42,0.08)", marginBottom: SPACING.md },
  cvSection: { marginBottom: SPACING.md },
  cvSectionHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: SPACING.sm },
  cvSectionTitle: {
    color: "#0f172a",
    fontSize: FONT.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  cvEmpty: { color: "#94a3b8", fontSize: FONT.sm, fontStyle: "italic" },
  cvItem: { marginBottom: SPACING.sm },
  cvItemTitle: { color: "#0f172a", fontSize: FONT.md, fontWeight: "700" },
  cvItemSub: { color: "#475569", fontSize: FONT.sm, marginTop: 2 },
  cvItemMeta: { color: "#64748b", fontSize: FONT.xs, marginTop: 2 },
  cvItemLink: { color: COLORS.primary, fontSize: FONT.xs, marginTop: 2 },
  idiomasWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: SPACING.xs },
  idiomaChip: {
    backgroundColor: "rgba(59,130,246,0.1)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  idiomaChipText: { color: COLORS.primaryDark, fontSize: FONT.xs, fontWeight: "600" },
  statsCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.12)",
  },
  statsTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.lg,
    fontWeight: "700",
    marginBottom: SPACING.md,
  },
  scoreRow: { marginBottom: SPACING.sm },
  scoreLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  scoreLabel: { color: COLORS.textSecondary, fontSize: FONT.sm },
  scoreValue: { fontSize: FONT.sm, fontWeight: "700" },
  scoreTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 999,
    overflow: "hidden",
  },
  scoreFill: { height: "100%", borderRadius: 999 },
  actions: { gap: SPACING.sm },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: { color: COLORS.white, fontSize: FONT.md, fontWeight: "700" },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(59,130,246,0.08)",
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.3)",
    marginBottom: SPACING.sm,
  },
  secondaryBtnText: { color: COLORS.primary, fontSize: FONT.md, fontWeight: "700" },
});
