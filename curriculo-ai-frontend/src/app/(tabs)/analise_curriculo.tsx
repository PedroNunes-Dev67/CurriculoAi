import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../../components/style";
import { analisarCurriculoPdf } from "../../services/analise-curriculo-service";
import { AnaliseCurriculoResult } from "../../types/curriculo-completo";

type ArquivoPdf = {
  name: string;
  uri: string;
  size?: number;
};

function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? COLORS.success : score >= 60 ? COLORS.accent : "#f59e0b";
  return (
    <View style={styles.scoreRingCard}>
      <View style={[styles.scoreRingOuter, { borderColor: color }]}>
        <Text style={[styles.scoreRingValue, { color }]}>{score}</Text>
      </View>
      <Text style={styles.scoreRingLabel}>{label}</Text>
    </View>
  );
}

function InsightList({
  title,
  icon,
  items,
  tone,
}: {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  items: string[];
  tone: "success" | "warning";
}) {
  const color = tone === "success" ? COLORS.success : "#f59e0b";
  return (
    <View style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <MaterialCommunityIcons name={icon} size={18} color={color} />
        <Text style={styles.insightTitle}>{title}</Text>
      </View>
      {items.map((item, i) => (
        <View key={i} style={styles.insightRow}>
          <View style={[styles.insightDot, { backgroundColor: color }]} />
          <Text style={styles.insightText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function AnaliseCurriculo() {
  const [arquivo, setArquivo] = useState<ArquivoPdf | null>(null);
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState<AnaliseCurriculoResult | null>(null);

  async function selecionarPdf() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets[0]) return;

    const file = result.assets[0];
    if (file.mimeType && file.mimeType !== "application/pdf") {
      Alert.alert("Arquivo inválido", "Selecione um arquivo PDF.");
      return;
    }

    setArquivo({ name: file.name, uri: file.uri, size: file.size });
    setResultado(null);
  }

  async function handleAnalisar() {
    if (!arquivo) {
      Alert.alert("Nenhum arquivo", "Faça upload do seu currículo em PDF primeiro.");
      return;
    }

    setAnalisando(true);
    try {
      const analise = await analisarCurriculoPdf(arquivo.uri, arquivo.name);
      setResultado(analise);
    } catch {
      Alert.alert("Erro", "Não foi possível analisar o currículo. Tente novamente.");
    } finally {
      setAnalisando(false);
    }
  }

  function formatFileSize(size?: number) {
    if (!size) return "";
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Análise de currículo</Text>
        <View style={styles.iconBtnPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroGlow} pointerEvents="none" />
          <MaterialCommunityIcons name="robot-outline" size={32} color={COLORS.primary} />
          <Text style={styles.heroTitle}>Análise inteligente com IA</Text>
          <Text style={styles.heroDesc}>
            Envie seu currículo em PDF e receba feedback sobre ATS, clareza e palavras-chave.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.uploadZone, arquivo && styles.uploadZoneFilled]}
          onPress={selecionarPdf}
          activeOpacity={0.85}
        >
          <View style={styles.uploadIconWrap}>
            <MaterialCommunityIcons
              name={arquivo ? "file-pdf-box" : "cloud-upload-outline"}
              size={36}
              color={arquivo ? COLORS.error : COLORS.primary}
            />
          </View>
          <Text style={styles.uploadTitle}>
            {arquivo ? arquivo.name : "Toque para enviar seu PDF"}
          </Text>
          <Text style={styles.uploadSub}>
            {arquivo
              ? formatFileSize(arquivo.size) || "Arquivo selecionado"
              : "Apenas arquivos .pdf · máx. recomendado 10 MB"}
          </Text>
          {arquivo ? (
            <View style={styles.uploadBadge}>
              <MaterialCommunityIcons name="check-circle" size={14} color={COLORS.success} />
              <Text style={styles.uploadBadgeText}>Pronto para análise</Text>
            </View>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.analyzeBtn, (!arquivo || analisando) && styles.analyzeBtnDisabled]}
          onPress={handleAnalisar}
          disabled={!arquivo || analisando}
          activeOpacity={0.85}
        >
          {analisando ? (
            <>
              <ActivityIndicator color={COLORS.white} />
              <Text style={styles.analyzeBtnText}>Analisando currículo...</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons name="auto-fix" size={20} color={COLORS.white} />
              <Text style={styles.analyzeBtnText}>Analisar currículo</Text>
            </>
          )}
        </TouchableOpacity>

        {resultado ? (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Resultado da análise</Text>
              <View style={styles.scoreGeralBadge}>
                <Text style={styles.scoreGeralValue}>{resultado.scoreGeral}</Text>
                <Text style={styles.scoreGeralLabel}>Score geral</Text>
              </View>
            </View>

            <View style={styles.scoreGrid}>
              <ScoreRing score={resultado.scoreAts} label="ATS" />
              <ScoreRing score={resultado.scoreClareza} label="Clareza" />
              <ScoreRing score={resultado.scorePalavrasChave} label="Keywords" />
            </View>

            <View style={styles.resumoCard}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={COLORS.accent} />
              <Text style={styles.resumoText}>{resultado.resumo}</Text>
            </View>

            <InsightList
              title="Pontos fortes"
              icon="thumb-up-outline"
              items={resultado.pontosFortes}
              tone="success"
            />
            <InsightList
              title="Sugestões de melhoria"
              icon="trending-up"
              items={resultado.melhorias}
              tone="warning"
            />
          </View>
        ) : (
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Dicas para melhor resultado</Text>
            {[
              "Use PDF gerado digitalmente (não escaneado)",
              "Evite colunas complexas ou tabelas pesadas",
              "Inclua palavras-chave da vaga que deseja",
            ].map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <MaterialCommunityIcons name="check" size={16} color={COLORS.primary} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
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
  heroCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: "center",
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.12)",
    overflow: "hidden",
    position: "relative",
  },
  heroGlow: {
    position: "absolute",
    top: -30,
    left: "50%",
    marginLeft: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(59,130,246,0.1)",
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.xl,
    fontWeight: "800",
    marginTop: SPACING.sm,
    textAlign: "center",
  },
  heroDesc: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    textAlign: "center",
    lineHeight: 22,
    marginTop: SPACING.sm,
  },
  uploadZone: {
    borderWidth: 2,
    borderColor: "rgba(59,130,246,0.25)",
    borderStyle: "dashed",
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
    backgroundColor: "rgba(59,130,246,0.04)",
    marginBottom: SPACING.md,
  },
  uploadZoneFilled: {
    borderColor: "rgba(52,211,153,0.4)",
    backgroundColor: "rgba(52,211,153,0.06)",
    borderStyle: "solid",
  },
  uploadIconWrap: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(59,130,246,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  uploadTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  uploadSub: { color: COLORS.textMuted, fontSize: FONT.xs, textAlign: "center" },
  uploadBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: SPACING.sm,
    backgroundColor: "rgba(52,211,153,0.12)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  uploadBadgeText: { color: COLORS.success, fontSize: FONT.xs, fontWeight: "700" },
  analyzeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  analyzeBtnDisabled: { opacity: 0.5 },
  analyzeBtnText: { color: COLORS.white, fontSize: FONT.md, fontWeight: "700" },
  resultsSection: { gap: SPACING.md },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsTitle: { color: COLORS.textPrimary, fontSize: FONT.lg, fontWeight: "700" },
  scoreGeralBadge: {
    alignItems: "center",
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.2)",
  },
  scoreGeralValue: { color: COLORS.primary, fontSize: FONT.xxl, fontWeight: "800" },
  scoreGeralLabel: { color: COLORS.textMuted, fontSize: 10, fontWeight: "600" },
  scoreGrid: { flexDirection: "row", gap: SPACING.sm },
  scoreRingCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.08)",
  },
  scoreRingOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  scoreRingValue: { fontSize: FONT.lg, fontWeight: "800" },
  scoreRingLabel: { color: COLORS.textSecondary, fontSize: FONT.xs, fontWeight: "600" },
  resumoCard: {
    flexDirection: "row",
    gap: SPACING.sm,
    backgroundColor: "rgba(59,130,246,0.08)",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.15)",
  },
  resumoText: { flex: 1, color: COLORS.textSecondary, fontSize: FONT.sm, lineHeight: 22 },
  insightCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.08)",
  },
  insightHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: SPACING.sm },
  insightTitle: { color: COLORS.textPrimary, fontSize: FONT.md, fontWeight: "700" },
  insightRow: { flexDirection: "row", gap: SPACING.sm, marginBottom: 8 },
  insightDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  insightText: { flex: 1, color: COLORS.textSecondary, fontSize: FONT.sm, lineHeight: 20 },
  tipsCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.08)",
  },
  tipsTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },
  tipRow: { flexDirection: "row", gap: SPACING.sm, marginBottom: SPACING.sm, alignItems: "flex-start" },
  tipText: { flex: 1, color: COLORS.textSecondary, fontSize: FONT.sm, lineHeight: 20 },
});
