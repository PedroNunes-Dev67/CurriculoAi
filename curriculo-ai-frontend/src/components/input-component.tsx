import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import MaskInput from "react-native-mask-input";
import { COLORS, RADIUS, SPACING, FONT, INPUT_WIDTH } from "./style";

type InputProps = TextInputProps & {
  icone?: any;
  mask?: any;
  label?: string;
  erro?: string;
};

export function Input({ icone, secureTextEntry, mask, label, erro, ...rest }: InputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false);

  const borderColor = erro
    ? COLORS.borderError
    : focused
    ? COLORS.borderFocus
    : COLORS.border;

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          { borderColor },
          focused && styles.containerFocused,
        ]}
      >
        {icone && (
          <View style={styles.iconeWrapper}>
            <MaterialCommunityIcons name={icone} size={18} color={focused ? COLORS.accent : COLORS.textMuted} />
          </View>
        )}

        <MaskInput
          mask={mask}
          style={styles.input}
          secureTextEntry={isSecure}
          placeholderTextColor={COLORS.textPlaceholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />

        {secureTextEntry !== undefined && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.eyeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name={isSecure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: INPUT_WIDTH,
    marginTop: SPACING.sm,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  container: {
    height: 54,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  containerFocused: {
    backgroundColor: COLORS.bgInputFocus,
  },
  iconeWrapper: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.textPrimary,
    fontSize: FONT.md,
  },
  eyeButton: {
    paddingHorizontal: SPACING.sm,
    justifyContent: "center",
  },
  erroTexto: {
    color: COLORS.textError,
    fontSize: FONT.xs,
    marginTop: 4,
    marginLeft: 2,
  },
});

export default Input;
