import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { COLORS, RADIUS, FONT, INPUT_WIDTH, SPACING } from "./style";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
};

export default function ButtonConfirm({
  text,
  variant = "primary",
  loading = false,
  disabled,
  fullWidth = true,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        styles.base,
        fullWidth && { width: INPUT_WIDTH },
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "ghost" && styles.ghost,
        variant === "danger" && styles.danger,
        isDisabled && styles.disabled,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? "#fff" : COLORS.primary} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "secondary" && styles.textSecondary,
            variant === "ghost" && styles.textGhost,
            variant === "danger" && styles.textDanger,
            isDisabled && styles.textDisabled,
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.md,
  },
  primary: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.borderError,
  },
  disabled: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT.md,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  textSecondary: {
    color: COLORS.textSecondary,
  },
  textGhost: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    textDecorationLine: "underline",
  },
  textDanger: {
    color: COLORS.borderError,
  },
  textDisabled: {
    color: COLORS.textMuted,
  },
});
