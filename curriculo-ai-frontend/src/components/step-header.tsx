import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SPACING } from "./style";
import ProgressIndicator from "./progress-indicator";

type Props = {
  etapa: number;
  total?: number;
  titulo: string;
  descricao?: string;
  etapaLabel: string;
};

export default function StepHeader({ etapa, total = 5, titulo, descricao, etapaLabel }: Props) {
  return (
    <View style={styles.container}>
      {/* Step badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{etapaLabel}</Text>
      </View>

      <Text style={styles.titulo}>{titulo}</Text>
      {descricao && <Text style={styles.descricao}>{descricao}</Text>}

      <ProgressIndicator etapaAtual={etapa} total={total} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: SPACING.xxl + 16,
    width: "100%",
    paddingHorizontal: SPACING.lg,
  },
  badge: {
    backgroundColor: "rgba(59,130,246,0.12)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.3)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: SPACING.md,
  },
  badgeText: {
    color: COLORS.accent,
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  titulo: {
    color: COLORS.textPrimary,
    fontSize: FONT.xxl,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  descricao: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    textAlign: "center",
    marginTop: SPACING.sm,
    lineHeight: 20,
    paddingHorizontal: SPACING.md,
  },
});