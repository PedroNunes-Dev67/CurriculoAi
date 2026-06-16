import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONT, SPACING, RADIUS } from "./style";

type Props = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export default function Checkbox({ label, checked, onToggle }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.75}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && (
          <MaterialCommunityIcons name="check" size={14} color={COLORS.bg} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginTop: SPACING.md,
    alignSelf: "flex-start",
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.sm - 2,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT.md,
    fontWeight: "500",
  },
});
