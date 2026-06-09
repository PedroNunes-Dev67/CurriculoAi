import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "./style";

export function Divisao() {
  return (
    <View style={styles.container}>
      <View style={styles.linha} />
      <Text style={styles.texto}>ou</Text>
      <View style={styles.linha} />
    </View>
  );
}

export default Divisao;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.md,
    width: "80%",
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  texto: {
    color: COLORS.textMuted,
    marginHorizontal: SPACING.md,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
