import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// ─── TOKENS ────────────────────────────────────────────────────────────────────

export const COLORS = {
  // Backgrounds
  bg:        "#050d1f",
  bgCard:    "#0b1735",
  bgInput:   "#0d1e40",
  bgInputFocus: "#112348",

  // Borders
  border:    "#1a3060",
  borderFocus: "#3b82f6",
  borderError: "#ef4444",

  // Brand
  primary:   "#3b82f6",
  primaryDark: "#1a6dcc",
  accent:    "#60a5fa",
  accentGlow: "rgba(59,130,246,0.25)",

  // Text
  textPrimary:   "#f0f6ff",
  textSecondary: "#7ea3c8",
  textMuted:     "#3a5a80",
  textPlaceholder: "#3a5a80",
  textError:     "#fca5a5",

  // States
  success:   "#34d399",
  successBg: "rgba(52,211,153,0.12)",
  error:     "#ef4444",
  disabled:  "rgba(255,255,255,0.12)",

  // Misc
  white: "#ffffff",
  overlay: "rgba(5,13,31,0.85)",
};

export const SPACING = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

export const RADIUS = {
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  full: 999,
};

export const FONT = {
  // weights
  regular: "400" as const,
  medium:  "500" as const,
  semibold:"600" as const,
  bold:    "700" as const,
  extrabold:"800" as const,

  // sizes
  xs:   11,
  sm:   13,
  md:   15,
  lg:   17,
  xl:   21,
  xxl:  26,
  xxxl: 32,
};

export const SHADOW = {
  card: {
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
};

export const INPUT_WIDTH = Math.min(width - 48, 360);

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────

export const GlobalStyles = StyleSheet.create({
  // ─── Screens ───────────────────────────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingBottom: 80,
    width: "100%",
  },

  // Legacy aliases (keep for compat)
  fundoazullogin: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
  },

  // ─── Typography ────────────────────────────────────────────────────────────
  titulo: {
    color: COLORS.textPrimary,
    fontSize: FONT.xxl,
    fontWeight: FONT.extrabold,
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  subtitulo: {
    color: COLORS.textSecondary,
    fontSize: FONT.md,
    fontWeight: FONT.medium,
    marginTop: SPACING.sm,
    textAlign: "center",
    lineHeight: 22,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    fontWeight: FONT.semibold,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ─── Input ────────────────────────────────────────────────────────────────
  inputTS: {
    width: INPUT_WIDTH,
    height: 54,
    backgroundColor: COLORS.bgInput,
    borderColor: COLORS.border,
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
  },
  inputTextDentro: {
    flex: 1,
    height: "100%",
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    marginLeft: SPACING.sm,
  },

  // ─── Buttons ──────────────────────────────────────────────────────────────
  botao: {
    width: INPUT_WIDTH,
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.md,
    ...SHADOW.glow,
  },
  textoBotao: {
    color: COLORS.white,
    fontSize: FONT.lg,
    fontWeight: FONT.bold,
    letterSpacing: 0.3,
  },

  // ─── Misc ────────────────────────────────────────────────────────────────
  container_selection: {
    width: INPUT_WIDTH,
    marginTop: SPACING.sm,
  },
  pickerw: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  picker: { height: 54, color: COLORS.textPrimary },
  botaoCadastro: {
    width: INPUT_WIDTH,
    height: 54,
    backgroundColor: COLORS.bgCard,
    borderColor: COLORS.border,
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.md,
  },
  result: { marginTop: SPACING.sm, color: COLORS.textSecondary },
});
