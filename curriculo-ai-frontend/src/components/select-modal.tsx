import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, RADIUS, SPACING, INPUT_WIDTH } from "./style";

type Option = { label: string; value: string };

type Props = {
  options: Option[];
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
  icone?: any;
  erro?: string;
};

export default function SelectModal({
  options,
  value,
  onSelect,
  placeholder = "Selecione uma opção",
  label,
  icone,
  erro,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={{ width: INPUT_WIDTH, marginTop: SPACING.sm }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.trigger, erro && { borderColor: COLORS.borderError }]}
        onPress={() => setOpen(true)}
        activeOpacity={0.75}
      >
        {icone && (
          <MaterialCommunityIcons
            name={icone}
            size={18}
            color={value ? COLORS.accent : COLORS.textMuted}
            style={{ marginRight: SPACING.sm }}
          />
        )}
        <Text style={[styles.triggerText, !value && styles.placeholder]}>
          {selected ? selected.label : placeholder}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={20}
          color={COLORS.textMuted}
        />
      </TouchableOpacity>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        />
        <View style={styles.sheet}>
          {/* Handle */}
          <View style={styles.handle} />

          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{label || placeholder}</Text>
            <TouchableOpacity onPress={() => setOpen(false)} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <MaterialCommunityIcons name="close" size={22} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
            {options.map((op) => {
              const isSel = op.value === value;
              return (
                <TouchableOpacity
                  key={op.value}
                  style={[styles.option, isSel && styles.optionSelected]}
                  onPress={() => {
                    onSelect(op.value);
                    setOpen(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, isSel && styles.optionTextSelected]}>
                    {op.label}
                  </Text>
                  {isSel && (
                    <MaterialCommunityIcons name="check" size={18} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  trigger: {
    height: 54,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  triggerText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT.md,
  },
  placeholder: {
    color: COLORS.textPlaceholder,
  },
  erro: {
    color: COLORS.textError,
    fontSize: FONT.xs,
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  sheet: {
    backgroundColor: "#0c1830",
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: SPACING.md,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sheetTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.lg,
    fontWeight: "700",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginBottom: 2,
  },
  optionSelected: {
    backgroundColor: "rgba(59,130,246,0.12)",
  },
  optionText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: FONT.md,
  },
  optionTextSelected: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
});
