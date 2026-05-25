import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonConfirm from "../../components/button-confirm-compent";
import Checkbox from "../../components/checkbox";
import SelectModal from "../../components/select-modal";
import StepHeader from "../../components/step-header";
import { COLORS, FONT, INPUT_WIDTH, RADIUS, SPACING } from "../../components/style";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Experiencia = {
  cargo: string;
  empresa: string;
  empresaOutra?: string; // Auxiliar para quando o usuário seleciona "Outra"
  inicio: Date | null;
  termino: Date | null;
  atual: boolean;
  area: string;
};

const estadoInicial: Experiencia = {
  cargo: "",
  empresa: "",
  empresaOutra: "",
  inicio: null,
  termino: null,
  atual: false,
  area: "",
};

// ─── Listas de Seleção ────────────────────────────────────────────────────────
const CARGOS = [
  { label: "Desenvolvedor Frontend", value: "Desenvolvedor Frontend" },
  { label: "Desenvolvedor Backend", value: "Desenvolvedor Backend" },
  { label: "Desenvolvedor Full Stack", value: "Desenvolvedor Full Stack" },
  { label: "Desenvolvedor Mobile", value: "Desenvolvedor Mobile" },
  { label: "Engenheiro de Software", value: "Engenheiro de Software" },
  { label: "Arquiteto de Software", value: "Arquiteto de Software" },
  { label: "Engenheiro DevOps", value: "Engenheiro DevOps" },
  { label: "SRE (Site Reliability Engineer)", value: "SRE" },
  { label: "Engenheiro de Dados", value: "Engenheiro de Dados" },
  { label: "Cientista de Dados", value: "Cientista de Dados" },
  { label: "Analista de QA", value: "Analista de QA" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "Scrum Master / Agile Coach", value: "Scrum Master" },
  { label: "Tech Lead", value: "Tech Lead" },
  { label: "Designer UI/UX", value: "Designer UI/UX" },
  { label: "Estágio em Desenvolvimento", value: "Estágio em Desenvolvimento" },
  { label: "Outro", value: "Outro" },
];

const AREAS = [
  { label: "Backend", value: "Backend" },
  { label: "Frontend", value: "Frontend" },
  { label: "Full Stack", value: "Full Stack" },
  { label: "Mobile", value: "Mobile" },
  { label: "DevOps / SRE", value: "DevOps" },
  { label: "Data Engineering", value: "Data Engineering" },
  { label: "QA / Testes", value: "QA" },
  { label: "UI/UX Engineering", value: "UI/UX Engineering" },
  { label: "Software Engineering", value: "Software Engineering" },
  { label: "Segurança / CyberSec", value: "Segurança" },
  { label: "Machine Learning / IA", value: "Machine Learning" },
];

const EMPRESAS_TECH = [
  { label: "Google", value: "Google" },
  { label: "Microsoft", value: "Microsoft" },
  { label: "Amazon / AWS", value: "Amazon / AWS" },
  { label: "Meta", value: "Meta" },
  { label: "Apple", value: "Apple" },
  { label: "Netflix", value: "Netflix" },
  { label: "Uber", value: "Uber" },
  { label: "Nubank", value: "Nubank" },
  { label: "Mercado Livre", value: "Mercado Livre" },
  { label: "Itaú", value: "Itaú" },
  { label: "iFood", value: "iFood" },
  { label: "IBM", value: "IBM" },
  { label: "Oracle", value: "Oracle" },
  { label: "Outra", value: "Outra" },
];

// ─── Componentes Auxiliares ───────────────────────────────────────────────────

type TextInputInlineProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

function TextInputInline({ placeholder, value, onChangeText }: TextInputInlineProps) {
  return (
    <TextInput
      style={{
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: FONT.md,
        height: 54,
        marginLeft: 0,
      }}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textPlaceholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

function DateField({
  label,
  value,
  onChange,
  erro,
}: {
  label: string;
  value: Date | null;
  onChange: (d: Date) => void;
  erro?: string;
}) {
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
      <Text style={df.label}>{label}</Text>
      
      <TouchableOpacity
        style={[df.dateField, erro && { borderColor: COLORS.borderError }]}
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
        <Text style={[df.dateText, !value && df.datePlaceholder]}>
          {formatted || "MM/AAAA"}
        </Text>
      </TouchableOpacity>
      
      {erro ? <Text style={df.erro}>{erro}</Text> : null}

      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
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
            style={df.modalOverlay} 
            activeOpacity={1} 
            onPress={handleCancelIOS}
          >
            <View 
              style={df.modalContent} 
              onStartShouldSetResponder={() => true}
            >
              <View style={df.modalHeader}>
                <TouchableOpacity onPress={handleCancelIOS} style={df.modalBtn}>
                  <Text style={df.modalCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmIOS} style={df.modalBtn}>
                  <Text style={df.modalConfirmText}>Confirmar</Text>
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
                style={df.iosPicker}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

function CardSalvo({ exp, numero, onRemover }: { exp: Experiencia; numero: number; onRemover: () => void }) {
  const inicio = exp.inicio?.toLocaleDateString("pt-BR", { month: "2-digit", year: "numeric" }) || "";
  const termino = exp.atual
    ? "Presente"
    : exp.termino?.toLocaleDateString("pt-BR", { month: "2-digit", year: "numeric" }) || "";

  return (
    <View style={cs.card}>
      <View style={cs.leftBar} />
      <View style={cs.content}>
        <View style={cs.headerRow}>
          <Text style={cs.label}>✓ Experiência {numero}</Text>
          <TouchableOpacity onPress={onRemover} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.borderError} />
          </TouchableOpacity>
        </View>
        <Text style={cs.cargo}>{exp.cargo}</Text>
        <Text style={cs.empresa}>{exp.empresa} · {exp.area}</Text>
        <Text style={cs.periodo}>{inicio} → {termino}</Text>
      </View>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────
export default function Experiencia() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [card, setCard] = useState<Experiencia>(estadoInicial);
  const [erros, setErros] = useState<Partial<Record<keyof Experiencia, string>>>({});

  function atualizar<K extends keyof Experiencia>(campo: K, valor: Experiencia[K]) {
    setCard((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  function removerExperiencia(index: number) {
    setExperiencias((prev) => prev.filter((_, i) => i !== index));
  }

  function validar(): boolean {
    const e: Partial<Record<keyof Experiencia, string>> = {};
    if (!card.cargo) e.cargo = "Selecione um cargo.";
    
    if (!card.empresa) {
      e.empresa = "Selecione a empresa.";
    } else if (card.empresa === "Outra" && (!card.empresaOutra || !card.empresaOutra.trim())) {
      e.empresa = "Especifique o nome da empresa.";
    }

    if (!card.area) e.area = "Selecione a área de atuação.";
    if (!card.inicio) e.inicio = "Informe a data de início.";
    
    if (!card.atual) {
      if (!card.termino) {
        e.termino = "Informe a data de término.";
      } else if (card.inicio && card.termino && card.inicio > card.termino) {
        e.termino = "Término não pode ser antes do início.";
      }
    }
    
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function handleAdicionar() {
    if (!validar()) return;
    if (experiencias.length >= 15) return; // Regra de limite

    // Resolve a empresa "Outra" para o nome exato digitado antes de salvar
    const expFinal: Experiencia = {
      ...card,
      empresa: card.empresa === "Outra" ? (card.empresaOutra || "") : card.empresa,
    };

    setExperiencias((prev) => [...prev, expFinal]);
    setCard(estadoInicial);
    setErros({});
  }

  function handleProximo() {
    // Retira o campo 'empresaOutra' do payload, mandando a lista limpa para o Axios
    const payload = {
      experiencias: experiencias.map(({ empresaOutra, ...dados }) => dados)
    };
    console.log("Payload de Experiências para o Spring Boot:", payload);
    
    router.navigate("/certificacoes");
  }

  function handleSemExperiencia() {
    router.navigate("/certificacoes");
  }

  const temExp = experiencias.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StepHeader
          etapa={3}
          titulo="Experiência"
          descricao="Adicione sua experiência profissional em tecnologia."
          etapaLabel="Etapa 3 de 5 · Experiência"
        />

        {/* Cards salvos */}
        {experiencias.map((exp, i) => (
          <CardSalvo key={i} exp={exp} numero={i + 1} onRemover={() => removerExperiencia(i)} />
        ))}

        <View style={styles.sectionDivider}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionLabel}>
            {temExp ? `Adicionar Experiência ${experiencias.length + 1}` : "Adicionar Experiência 1"}
          </Text>
          <View style={styles.sectionLine} />
        </View>

        {/* Form de nova experiência (Sem box restritiva) */}
        <View style={styles.formContainer}>

          <SelectModal
            label="Cargo"
            options={CARGOS}
            value={card.cargo}
            onSelect={(v) => atualizar("cargo", v)}
            placeholder="Selecione seu cargo"
            icone="briefcase-outline"
            erro={erros.cargo}
          />

          <SelectModal
            label="Empresa"
            options={EMPRESAS_TECH}
            value={card.empresa}
            onSelect={(v) => {
              atualizar("empresa", v);
              if (v !== "Outra") atualizar("empresaOutra", "");
            }}
            placeholder="Selecione a empresa"
            icone="office-building-outline"
            erro={erros.empresa}
          />

          {card.empresa === "Outra" && (
            <View style={{ width: INPUT_WIDTH, marginTop: SPACING.sm }}>
              <TouchableOpacity style={[styles.inputBox, erros.empresa && { borderColor: COLORS.borderError }]} activeOpacity={1}>
                <TextInputInline
                  placeholder="Qual o nome da empresa?"
                  value={card.empresaOutra || ""}
                  onChangeText={(v) => atualizar("empresaOutra", v)}
                />
              </TouchableOpacity>
            </View>
          )}

          <SelectModal
            label="Área de Atuação"
            options={AREAS}
            value={card.area}
            onSelect={(v) => atualizar("area", v)}
            placeholder="Selecione sua área"
            icone="code-tags"
            erro={erros.area}
          />

          <DateField
            label="Data de Início"
            value={card.inicio}
            onChange={(d) => atualizar("inicio", d)}
            erro={erros.inicio}
          />

          {!card.atual && (
            <DateField
              label="Data de Término"
              value={card.termino}
              onChange={(d) => atualizar("termino", d)}
              erro={erros.termino}
            />
          )}

          <Checkbox
            label="Trabalho aqui atualmente"
            checked={card.atual}
            onToggle={() => {
              const novoEstado = !card.atual;
              atualizar("atual", novoEstado);
              if (novoEstado) atualizar("termino", null);
            }}
          />
        </View>

        {/* Regra de Ocultar Botão se limite de 15 for atingido */}
        {experiencias.length < 15 && (
          <TouchableOpacity onPress={handleAdicionar} style={styles.btnAdicionar}>
            <Text style={styles.btnAdicionarTexto}>+ Adicionar Experiência</Text>
          </TouchableOpacity>
        )}

        {temExp ? (
          <ButtonConfirm text="Próximo →" onPress={handleProximo} />
        ) : (
          <ButtonConfirm text="Não tenho experiência" variant="ghost" onPress={handleSemExperiencia} />
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scroll: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingBottom: 80,
  },
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    width: INPUT_WIDTH,
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  formContainer: {
    width: INPUT_WIDTH,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  inputBox: {
    height: 54,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  btnAdicionar: {
    width: INPUT_WIDTH,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderStyle: "dashed",
    paddingVertical: 14,
    alignItems: "center",
  },
  btnAdicionarTexto: {
    color: COLORS.textSecondary,
    fontSize: FONT.md,
    fontWeight: "600",
  },
});

const df = StyleSheet.create({
  label: { color: COLORS.textSecondary, fontSize: FONT.xs, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6 },
  dateField: { height: 54, backgroundColor: COLORS.bgInput, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, flexDirection: "row", alignItems: "center", paddingHorizontal: SPACING.md },
  dateText: { color: COLORS.textPrimary, fontSize: FONT.md },
  datePlaceholder: { color: COLORS.textPlaceholder },
  erro: { color: COLORS.textError, fontSize: FONT.xs, marginTop: 4 },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.4)" },
  modalContent: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: 30 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#E5E5E5" },
  modalBtn: { paddingVertical: 8 },
  modalCancelText: { color: "#EF4444", fontSize: 16 },
  modalConfirmText: { color: "#3B82F6", fontSize: 16, fontWeight: "600" },
  iosPicker: { width: "100%", height: 220, backgroundColor: "#FFFFFF" },
});

const cs = StyleSheet.create({
  card: { width: INPUT_WIDTH, flexDirection: "row", backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md, marginBottom: SPACING.sm, overflow: "hidden", borderWidth: 1, borderColor: COLORS.border },
  leftBar: { width: 4, backgroundColor: COLORS.success },
  content: { flex: 1, padding: SPACING.md },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  label: { color: COLORS.success, fontSize: FONT.xs, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  cargo: { color: COLORS.textPrimary, fontSize: FONT.md, fontWeight: "700" },
  empresa: { color: COLORS.textSecondary, fontSize: FONT.sm, marginTop: 2 },
  periodo: { color: COLORS.textMuted, fontSize: FONT.xs, marginTop: 4 },
});