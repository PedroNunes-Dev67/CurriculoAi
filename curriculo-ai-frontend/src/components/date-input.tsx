import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT, INPUT_WIDTH, RADIUS, SPACING } from "./style";

type Props = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  erro?: string;
};

export function DatePickerField({ label, value, onChange, erro }: Props) {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const formatted = value
    ? value.toLocaleDateString("pt-BR", { month: "2-digit", year: "numeric" })
    : null;

  const handleConfirmIOS = () => {
    onChange(tempDate);
    setShow(false);
  };

  const handleCancelIOS = () => {
    setTempDate(value || new Date());
    setShow(false);
  };

  return (
    <View style={{ width: INPUT_WIDTH, marginTop: SPACING.sm }}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.dateField, erro && { borderColor: COLORS.borderError }]}
        onPress={() => {
          setTempDate(value || new Date());
          setShow(true);
        }}
        activeOpacity={0.75}
      >
        <MaterialCommunityIcons
          name="calendar-outline"
          size={18}
          color={value ? COLORS.accent : COLORS.textMuted}
          style={{ marginRight: SPACING.sm }}
        />
        <Text style={[styles.dateText, !value && styles.datePlaceholder]}>
          {formatted || "MM/AAAA"}
        </Text>
      </TouchableOpacity>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false);
            if (event.type === "set" && selectedDate) onChange(selectedDate);
          }}
        />
      )}

      {show && Platform.OS === "ios" && (
        <Modal transparent animationType="slide" visible={show}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleCancelIOS}
          >
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={handleCancelIOS}
                  style={styles.modalBtn}
                >
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirmIOS}
                  style={styles.modalBtn}
                >
                  <Text style={styles.modalConfirmText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                textColor="#000000"
                themeVariant="light"
                onChange={(_, selectedDate) => {
                  if (selectedDate) setTempDate(selectedDate);
                }}
                style={styles.iosPicker}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
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
  dateField: {
    height: 54,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  dateText: { color: COLORS.textPrimary, fontSize: FONT.md },
  datePlaceholder: { color: COLORS.textPlaceholder },
  erro: { color: COLORS.textError, fontSize: FONT.xs, marginTop: 4 },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalBtn: { paddingVertical: 8 },
  modalCancelText: { color: "#EF4444", fontSize: 16 },
  modalConfirmText: { color: "#3B82F6", fontSize: 16, fontWeight: "600" },
  iosPicker: { width: "100%", height: 220, backgroundColor: "#FFFFFF" },
});
