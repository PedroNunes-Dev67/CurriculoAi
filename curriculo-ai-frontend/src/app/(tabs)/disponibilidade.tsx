import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonConfirm from "../../components/button-confirm-compent";
import Checkbox from "../../components/checkbox";
import StepHeader from "../../components/step-header";
import { COLORS, FONT, INPUT_WIDTH, RADIUS, SPACING } from "../../components/style";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Modalidade = "Presencial" | "Híbrido" | "Home Office" | "";
type NivelIdioma = 1 | 2 | 3;

type Idioma = {
  nome: string;
  nivel: NivelIdioma | 0;
};

// ─── Idiomas disponíveis ──────────────────────────────────────────────────────
const IDIOMAS = [
  "Português", "Inglês", "Espanhol", "Francês", "Alemão",
  "Italiano", "Mandarim", "Japonês", "Coreano", "Árabe",
  "Russo", "Hindi", "Neerlandês", "Polonês", "Turco",
];

const NIVEL_TEXTO = ["", "Básico", "Intermediário", "Fluente"];
const NIVEL_COR = ["", "#f59e0b", "#60a5fa", COLORS.success] as const;

// ─── DateField (Padrão atualizado) ────────────────────────────────────────────
function DateField({
  value,
  onChange,
  disabled,
  erro,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
  disabled?: boolean;
  erro?: string;
}) {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const formatted = value ? value.toLocaleDateString("pt-BR") : null;

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
      <Text style={s.fieldLabel}>Data de disponibilidade</Text>
      
      <TouchableOpacity
        style={[s.dateField, erro && { borderColor: COLORS.borderError }, disabled && { opacity: 0.4 }]}
        onPress={() => {
          if (!disabled) {
            setTempDate(value || new Date());
            setShow(true);
          }
        }}
        activeOpacity={disabled ? 1 : 0.75}
      >
        <MaterialCommunityIcons 
          name="calendar-outline" 
          size={18} 
          color={disabled ? COLORS.textMuted : COLORS.accent} 
          style={{ marginRight: SPACING.sm }} 
        />
        <Text style={[s.dateText, !value && s.datePlaceholder]}>
          {disabled ? "Início imediato" : formatted || "DD/MM/AAAA"}
        </Text>
      </TouchableOpacity>
      
      {erro ? <Text style={s.erroText}>{erro}</Text> : null}

      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShow(false);
            if (event.type === "set" && selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}

      {show && Platform.OS === "ios" && (
        <Modal transparent={true} animationType="slide" visible={show}>
          <TouchableOpacity 
            style={s.modalOverlay} 
            activeOpacity={1} 
            onPress={handleCancelIOS}
          >
            <View 
              style={s.modalContent} 
              onStartShouldSetResponder={() => true}
            >
              <View style={s.modalHeader}>
                <TouchableOpacity onPress={handleCancelIOS} style={s.modalBtn}>
                  <Text style={s.modalCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmIOS} style={s.modalBtn}>
                  <Text style={s.modalConfirmText}>Confirmar</Text>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                minimumDate={new Date()}
                textColor="#000000"
                themeVariant="light"
                onChange={(_, selectedDate) => {
                  if (selectedDate) setTempDate(selectedDate);
                }}
                style={s.iosPicker}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

// ─── Seletor de idioma ────────────────────────────────────────────────────────
function IdiomaItem({
  idioma,
  index,
  onChange,
  onRemove,
  podeRemover,
}: {
  idioma: Idioma;
  index: number;
  onChange: (i: number, campo: keyof Idioma, valor: any) => void;
  onRemove: (i: number) => void;
  podeRemover: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={ii.container}>
      <View style={ii.row}>
        <TouchableOpacity
          style={ii.selector}
          onPress={() => setOpen(true)}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons name="translate" size={16} color={idioma.nome ? COLORS.accent : COLORS.textMuted} style={{ marginRight: 8 }} />
          <Text style={[ii.selectorText, !idioma.nome && ii.selectorPlaceholder]}>
            {idioma.nome || "Selecione o idioma"}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
        {podeRemover && (
          <TouchableOpacity onPress={() => onRemove(index)} style={ii.btnRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.borderError} />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal de seleção de idioma listado */}
      {open && (
        <View style={ii.dropdownContainer}>
          <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
            {IDIOMAS.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[ii.option, idioma.nome === lang && ii.optionSelected]}
                onPress={() => {
                  onChange(index, "nome", lang);
                  setOpen(false);
                }}
              >
                <Text style={[ii.optionText, idioma.nome === lang && ii.optionTextSelected]}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Instrução e Nível em estrelas */}
      <View style={{ marginTop: SPACING.sm }}>
        <Text style={ii.instrucaoLabel}>Selecione o nível de fluência desse idioma:</Text>
        <View style={ii.nivelRow}>
          {[1, 2, 3].map((n) => (
            <TouchableOpacity
              key={n}
              onPress={() => onChange(index, "nivel", n as NivelIdioma)}
              style={ii.nivelBtn}
            >
              <Text style={{ fontSize: 26, color: idioma.nivel >= n ? "#FFD700" : "rgba(255,255,255,0.18)" }}>★</Text>
            </TouchableOpacity>
          ))}
          {idioma.nivel > 0 && (
            <Text style={[ii.nivelTexto, { color: NIVEL_COR[idioma.nivel] }]}>
              {NIVEL_TEXTO[idioma.nivel]}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const ii = StyleSheet.create({
  container: { width: INPUT_WIDTH, marginTop: SPACING.sm, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  row: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  selector: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.bgInput, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md, height: 44, borderWidth: 1, borderColor: COLORS.border },
  selectorText: { flex: 1, color: COLORS.textPrimary, fontSize: FONT.sm },
  selectorPlaceholder: { color: COLORS.textPlaceholder },
  btnRemove: { padding: 4 }, // Removido bordas para ficar igual a lixeira das outras telas
  instrucaoLabel: { color: COLORS.textMuted, fontSize: FONT.xs, marginBottom: 4 },
  nivelRow: { flexDirection: "row", alignItems: "center", gap: SPACING.xs },
  nivelBtn: { padding: 2 },
  nivelTexto: { fontSize: FONT.xs, fontWeight: "700", marginLeft: SPACING.sm },
  dropdownContainer: { backgroundColor: COLORS.bgInput, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.border, marginTop: SPACING.sm, overflow: "hidden" },
  option: { paddingVertical: 10, paddingHorizontal: SPACING.md },
  optionSelected: { backgroundColor: "rgba(59,130,246,0.12)" },
  optionText: { color: COLORS.textSecondary, fontSize: FONT.sm },
  optionTextSelected: { color: COLORS.textPrimary, fontWeight: "600" },
});

// ─── Tela principal ───────────────────────────────────────────────────────────
const MODALIDADES: Modalidade[] = ["Presencial", "Híbrido", "Home Office"];

export default function Disponibilidade() {
  const [dataDisponibilidade, setDataDisponibilidade] = useState<Date | null>(null);
  const [imediato, setImediato] = useState(false);
  const [modalidade, setModalidade] = useState<Modalidade>("");
  const [idiomas, setIdiomas] = useState<Idioma[]>([{ nome: "", nivel: 0 }]);
  const [erros, setErros] = useState<Record<string, string>>({});

  function atualizarIdioma(index: number, campo: keyof Idioma, valor: any) {
    setIdiomas((prev) => {
      const novos = [...prev];
      novos[index] = { ...novos[index], [campo]: valor };
      return novos;
    });
    setErros((prev) => ({ ...prev, idiomas: "" }));
  }

  function removerIdioma(index: number) {
    setIdiomas((prev) => prev.filter((_, i) => i !== index));
    setErros((prev) => ({ ...prev, idiomas: "" }));
  }

  function validarIdiomasPreenchidos(): boolean {
    return idiomas.every((i) => i.nome !== "" && i.nivel > 0);
  }

  function adicionarIdioma() {
    // REGRA: Só permite adicionar se o atual estiver preenchido
    if (!validarIdiomasPreenchidos()) {
      setErros((prev) => ({ ...prev, idiomas: "Preencha o idioma atual antes de adicionar outro." }));
      return;
    }
    
    // Limite sugerido de idiomas simultâneos
    if (idiomas.length >= 8) return; 

    setIdiomas((prev) => [...prev, { nome: "", nivel: 0 }]);
    setErros((prev) => ({ ...prev, idiomas: "" }));
  }

  function validar(): boolean {
    const e: Record<string, string> = {};
    
    if (!imediato && !dataDisponibilidade) e.data = "Informe a data ou marque início imediato.";
    if (!modalidade) e.modalidade = "Selecione pelo menos uma modalidade.";
    
    // REGRA: Impede avançar se houver algum card em branco
    if (!validarIdiomasPreenchidos()) {
      e.idiomas = "Preencha os idiomas adicionados ou exclua os que estiverem em branco.";
    } else if (idiomas.length === 0) {
      e.idiomas = "Informe pelo menos um idioma com nível.";
    }

    setErros(e);
    return Object.keys(e).length === 0;
  }

  function handleFinalizar() {
    if (!validar()) return;

    // Payload final pronto para o Axios
    const payload = {
      inicioImediato: imediato,
      dataDisponibilidade: imediato ? null : dataDisponibilidade,
      modalidade,
      idiomas,
    };

    console.log("Payload de Disponibilidade para o Spring Boot:", payload);

    Alert.alert("Perfil criado!", "Seu perfil foi estruturado com sucesso para desenvolvedores. Em breve você será redirecionado.", [
      { text: "OK" }
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
      >
        <StepHeader
          etapa={5}
          titulo="Disponibilidade"
          descricao="Informe quando e como você pode trabalhar, e quais idiomas você domina."
          etapaLabel="Etapa 5 de 5 · Disponibilidade e Idiomas"
        />

        {/* ─── Disponibilidade ─── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Quando você está disponível?</Text>

          <DateField
            value={dataDisponibilidade}
            onChange={setDataDisponibilidade}
            disabled={imediato}
            erro={erros.data}
          />

          <Checkbox
            label="Estou disponível para início imediato"
            checked={imediato}
            onToggle={() => {
              setImediato(!imediato);
              if (!imediato) setDataDisponibilidade(null);
              setErros((e) => ({ ...e, data: "" }));
            }}
          />
        </View>

        {/* ─── Modalidade ─── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Modalidade de trabalho</Text>
          {erros.modalidade ? <Text style={s.erroText}>{erros.modalidade}</Text> : null}
          <View style={s.modalidadeRow}>
            {MODALIDADES.map((m) => {
              const sel = modalidade === m;
              return (
                <TouchableOpacity
                  key={m}
                  style={[s.modalidadeBtn, sel && s.modalidadeBtnSel]}
                  onPress={() => { setModalidade(m); setErros((e) => ({ ...e, modalidade: "" })); }}
                  activeOpacity={0.75}
                >
                  <MaterialCommunityIcons
                    name={m === "Presencial" ? "office-building" : m === "Híbrido" ? "laptop" : "home"}
                    size={18}
                    color={sel ? COLORS.primary : COLORS.textMuted}
                  />
                  <Text style={[s.modalidadeTexto, sel && s.modalidadeTextoSel]}>{m}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─── Idiomas ─── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Idiomas que você domina</Text>
          <Text style={s.sectionDesc}>Selecione um ou mais idiomas e indique seu nível</Text>
          {erros.idiomas ? <Text style={s.erroText}>{erros.idiomas}</Text> : null}

          {idiomas.map((idioma, i) => (
            <IdiomaItem
              key={i}
              idioma={idioma}
              index={i}
              onChange={atualizarIdioma}
              onRemove={removerIdioma}
              podeRemover={idiomas.length > 1}
            />
          ))}

          {idiomas.length < 8 && (
            <TouchableOpacity onPress={adicionarIdioma} style={s.btnAddIdioma}>
              <MaterialCommunityIcons name="plus" size={16} color={COLORS.textSecondary} />
              <Text style={s.btnAddIdiomaTexto}>Adicionar idioma</Text>
            </TouchableOpacity>
          )}
        </View>

        <ButtonConfirm text="Finalizar →" onPress={handleFinalizar} />
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  scroll: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingBottom: 80,
  },
  section: {
    width: INPUT_WIDTH,
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  sectionDesc: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    marginBottom: SPACING.sm,
  },
  fieldLabel: {
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
  erroText: {
    color: COLORS.textError,
    fontSize: FONT.xs,
    marginTop: 4,
    marginBottom: SPACING.sm,
  },
  modalidadeRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  modalidadeBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    gap: 6,
  },
  modalidadeBtnSel: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(59,130,246,0.1)",
  },
  modalidadeTexto: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    fontWeight: "600",
    textAlign: "center",
  },
  modalidadeTextoSel: {
    color: COLORS.primary,
  },
  btnAddIdioma: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderStyle: "dashed",
    alignSelf: "flex-start",
  },
  btnAddIdiomaTexto: {
    color: COLORS.textSecondary,
    fontSize: FONT.sm,
    fontWeight: "600",
  },
  // Estilos do Modal do iOS
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.4)" },
  modalContent: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: 30 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#E5E5E5" },
  modalBtn: { paddingVertical: 8 },
  modalCancelText: { color: "#EF4444", fontSize: 16 },
  modalConfirmText: { color: "#3B82F6", fontSize: 16, fontWeight: "600" },
  iosPicker: { width: "100%", height: 220, backgroundColor: "#FFFFFF" },
});