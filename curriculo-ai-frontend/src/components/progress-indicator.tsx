import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, SPACING } from "./style";

type Props = {
  etapaAtual: number;
  total?: number;
  labels?: string[];
};

export default function ProgressIndicator({ etapaAtual, total = 5, labels }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => i + 1).map((etapa) => {
        const isAtual = etapa === etapaAtual;
        const isConcluida = etapa < etapaAtual;
        return (
          <View key={etapa} style={styles.etapaWrapper}>
            {etapa > 1 && (
              <View
                style={[
                  styles.linha,
                  (isConcluida || isAtual) && styles.linhaAtiva,
                ]}
              />
            )}
            <View
              style={[
                styles.circulo,
                isAtual && styles.circuloAtual,
                isConcluida && styles.circuloConcluido,
              ]}
            >
              {isConcluida ? (
                <Text style={styles.checkmark}>✓</Text>
              ) : (
                <Text
                  style={[
                    styles.numero,
                    isAtual && styles.numeroAtual,
                  ]}
                >
                  {etapa}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACING.lg,
    gap: 0,
  },
  etapaWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  linha: {
    width: 28,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 4,
  },
  linhaAtiva: {
    backgroundColor: COLORS.primary,
  },
  circulo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  circuloAtual: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  circuloConcluido: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  numero: {
    color: "rgba(255,255,255,0.4)",
    fontWeight: "600",
    fontSize: 12,
  },
  numeroAtual: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 13,
  },
});
