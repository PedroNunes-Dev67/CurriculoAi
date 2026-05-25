import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "./checkbox";
import SelectModal from "./select-modal";
import { COLORS, FONT, INPUT_WIDTH, RADIUS, SPACING } from "./style";

export type FormacaoData = {
  id?: string;
  curso: string;
  nomeCursoOutro?: string; // Adicionado para espelhar a tipagem do pai
  tipoFormacao: string;
  dataInicio: Date | null;
  dataTermino: Date | null;
  cursando: boolean;
};

type Props = {
  numero: number;
  data: FormacaoData;
  erros: Partial<Record<keyof FormacaoData, string>>;
  onUpdate: <K extends keyof FormacaoData>(campo: K, valor: FormacaoData[K]) => void;
  onRemover: () => void;
  podeRemover: boolean;
};

const TIPOS_FORMACAO = [
  { label: "Graduação", value: "Graduação" },
  { label: "Especialização", value: "Especialização" },
  { label: "Pós-graduação", value: "Pós-graduação" },
  { label: "Mestrado", value: "Mestrado" },
  { label: "Bootcamp / Curso Técnico", value: "Bootcamp / Curso Técnico" },
];

const CURSOS_TECH = [
  { label: "Análise e Desenvolvimento de Sistemas", value: "Análise e Desenvolvimento de Sistemas" },
  { label: "Ciência da Computação", value: "Ciência da Computação" },
  { label: "Engenharia de Software", value: "Engenharia de Software" },
  { label: "Sistemas de Informação", value: "Sistemas de Informação" },
  { label: "Engenharia da Computação", value: "Engenharia da Computação" },
  { label: "Redes de Computadores", value: "Redes de Computadores" },
  { label: "Banco de Dados", value: "Banco de Dados" },
  { label: "Ciência de Dados / Inteligência Artificial", value: "Ciência de Dados / Inteligência Artificial" },
  { label: "Segurança da Informação / CyberSec", value: "Segurança da Informação / CyberSec" },
  { label: "Sistemas para Internet", value: "Sistemas para Internet" },
  { label: "Gestão da Tecnologia da Informação", value: "Gestão da Tecnologia da Informação" },
  { label: "Jogos Digitais", value: "Jogos Digitais" },
  { label: "Engenharia de Controle e Automação", value: "Engenharia de Controle e Automação" },
  { label: "Outro", value: "Outro" },
];

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
            if (event.type === "set" && selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}

      {show && Platform.OS === "ios" && (
        <Modal transparent={true} animationType="slide" visible={show}>
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
                <TouchableOpacity onPress={handleCancelIOS} style={styles.modalBtn}>
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmIOS} style={styles.modalBtn}>
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

type TextInputInlineProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

function TextInputInline({
  placeholder,
  value,
  onChangeText,
}: TextInputInlineProps) {
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

export default function FormacaoComponent({
  numero,
  data,
  erros,
  onUpdate,
  onRemover,
  podeRemover,
}: Props) {
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.numeroBadge}>
            <Text style={styles.numeroTexto}>{numero}</Text>
          </View>
          <Text style={styles.tituloCard}>Formação {numero}</Text>
        </View>
        {podeRemover && (
          <TouchableOpacity onPress={onRemover} style={styles.btnRemover} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.borderError} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.campos}>
        
        {/* AQUI ESTÁ A MUDANÇA: O SelectModal de Curso entra no lugar do TextInput antigo */}
        <SelectModal
          label="Curso"
          options={CURSOS_TECH}
          value={data.curso}
          onSelect={(v) => {
            onUpdate("curso", v);
            if (v !== "Outro") {
              onUpdate("nomeCursoOutro", ""); // Limpa o "outro" se escolher um curso da lista
            }
          }}
          placeholder="Selecione o curso"
          icone="school-outline"
          erro={erros.curso}
        />

        {/* E AQUI A CONDICIONAL: O input livre só aparece se ele marcou "Outro" */}
        {data.curso === "Outro" && (
          <View style={{ width: INPUT_WIDTH, marginTop: SPACING.sm }}>
            <TouchableOpacity style={[styles.inputBox, erros.curso && { borderColor: COLORS.borderError }]} activeOpacity={1}>
              <TextInputInline
                placeholder="Qual o nome do curso?"
                value={data.nomeCursoOutro || ""}
                onChangeText={(v) => onUpdate("nomeCursoOutro", v)}
              />
            </TouchableOpacity>
          </View>
        )}

        <SelectModal
          label="Tipo de Formação"
          options={TIPOS_FORMACAO}
          value={data.tipoFormacao}
          onSelect={(v) => onUpdate("tipoFormacao", v)}
          placeholder="Selecione o tipo"
          icone="certificate-outline"
          erro={erros.tipoFormacao}
        />

        <DateField
          label="Data de Início"
          value={data.dataInicio}
          onChange={(d) => onUpdate("dataInicio", d)}
          erro={erros.dataInicio}
        />

        {!data.cursando && (
          <DateField
            label="Data de Término"
            value={data.dataTermino}
            onChange={(d) => onUpdate("dataTermino", d)}
            erro={erros.dataTermino}
          />
        )}

        <Checkbox
          label="Cursando atualmente"
          checked={data.cursando}
          onToggle={() => {
            const novoEstado = !data.cursando;
            onUpdate("cursando", novoEstado);
            if (novoEstado) {
              onUpdate("dataTermino", null);
            }
          }}
        />
      </View>

      <View style={styles.divisor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: INPUT_WIDTH,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  numeroBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(59,130,246,0.15)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  numeroTexto: {
    color: COLORS.accent,
    fontSize: FONT.sm,
    fontWeight: "700",
  },
  tituloCard: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
    fontWeight: "700",
  },
  btnRemover: {
    padding: SPACING.xs,
  },
  campos: {
    alignItems: "center",
    width: "100%",
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
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
  dateText: {
    color: COLORS.textPrimary,
    fontSize: FONT.md,
  },
  datePlaceholder: {
    color: COLORS.textPlaceholder,
  },
  erro: {
    color: COLORS.textError,
    fontSize: FONT.xs,
    marginTop: 4,
  },
  divisor: {
    width: INPUT_WIDTH,
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: SPACING.lg,
  },
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
  modalBtn: {
    paddingVertical: 8,
  },
  modalCancelText: {
    color: "#EF4444", 
    fontSize: 16,
  },
  modalConfirmText: {
    color: "#3B82F6", 
    fontSize: 16,
    fontWeight: "600",
  },
  iosPicker: {
    width: "100%",
    height: 220,
    backgroundColor: "#FFFFFF",
  },
});