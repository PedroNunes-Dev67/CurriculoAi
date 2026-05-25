import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonConfirm from "../../components/button-confirm-compent";
import { Input } from "../../components/input-component";
import SelectModal from "../../components/select-modal";
import StepHeader from "../../components/step-header";
import { COLORS, FONT, INPUT_WIDTH, RADIUS, SPACING } from "../../components/style";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Certificacao = {
  nome: string;
  instituicao: string;
  instituicaoOutra?: string;
  anoConclusao: string; // Trocado de Date para string (apenas o ano)
  arquivo: { name: string; uri: string; size?: number } | null;
};

const nova = (): Certificacao => ({
  nome: "",
  instituicao: "",
  instituicaoOutra: "",
  anoConclusao: "",
  arquivo: null,
});

// ─── Listas Padrões ────────────────────────────────────────────────────────────
const INSTITUICOES = [
  { label: "Alura", value: "Alura" },
  { label: "Udemy", value: "Udemy" },
  { label: "Amazon Web Services (AWS)", value: "Amazon Web Services (AWS)" },
  { label: "Microsoft", value: "Microsoft" },
  { label: "Google Cloud", value: "Google Cloud" },
  { label: "Cisco", value: "Cisco" },
  { label: "Oracle", value: "Oracle" },
  { label: "Coursera", value: "Coursera" },
  { label: "edX", value: "edX" },
  { label: "Rocketseat", value: "Rocketseat" },
  { label: "DIO (Digital Innovation One)", value: "DIO" },
  { label: "IBM", value: "IBM" },
  { label: "Scrum.org", value: "Scrum.org" },
  { label: "Outra", value: "Outra" },
];

// Gera uma lista dinâmica dos últimos 50 anos
const ANO_ATUAL = new Date().getFullYear();
const ANOS_OPCOES = Array.from({ length: 50 }, (_, i) => {
  const ano = String(ANO_ATUAL - i);
  return { label: ano, value: ano };
});

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

// ─── Seletor de arquivo ───────────────────────────────────────────────────────
const TIPOS_VALIDOS = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function FilePickerField({
  arquivo,
  onSelect,
  erro,
}: {
  arquivo: Certificacao["arquivo"];
  onSelect: (f: Certificacao["arquivo"]) => void;
  erro?: string;
}) {
  async function handlePick() {
    const result = await DocumentPicker.getDocumentAsync({
      type: TIPOS_VALIDOS,
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    if (!TIPOS_VALIDOS.includes(file.mimeType || "")) {
      Alert.alert("Arquivo inválido", "Selecione um PDF, imagem ou documento Word.");
      return;
    }

    onSelect({ name: file.name, uri: file.uri, size: file.size });
  }

  function handleRemove() {
    onSelect(null);
  }

  return (
    <View style={{ width: INPUT_WIDTH, marginTop: SPACING.sm }}>
      <Text style={fp.label}>Certificado (PDF / Imagem / Word)</Text>

      {arquivo ? (
        <View style={fp.fileBox}>
          <MaterialCommunityIcons name="file-document-outline" size={20} color={COLORS.success} />
          <View style={{ flex: 1, marginLeft: SPACING.sm }}>
            <Text style={fp.fileName} numberOfLines={1}>{arquivo.name}</Text>
            {arquivo.size && (
              <Text style={fp.fileSize}>{(arquivo.size / 1024).toFixed(1)} KB</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[fp.picker, erro && { borderColor: COLORS.borderError }]}
          onPress={handlePick}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons name="upload-outline" size={20} color={COLORS.textMuted} />
          <Text style={fp.pickerText}>Toque para selecionar arquivo</Text>
        </TouchableOpacity>
      )}

      {erro ? <Text style={fp.erro}>{erro}</Text> : null}
    </View>
  );
}

// ─── Card de certificação salva ───────────────────────────────────────────────
function CardSalvo({ cert, numero, onRemover }: { cert: Certificacao; numero: number; onRemover: () => void }) {
  return (
    <View style={cs.card}>
      <View style={cs.leftBar} />
      <View style={cs.content}>
        <View style={cs.headerRow}>
          <Text style={cs.label}>✓ Certificação {numero}</Text>
          <TouchableOpacity onPress={onRemover} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.borderError} />
          </TouchableOpacity>
        </View>
        <Text style={cs.nome}>{cert.nome}</Text>
        <Text style={cs.sub}>{cert.instituicao} {cert.anoConclusao ? `· ${cert.anoConclusao}` : ""}</Text>
        {cert.arquivo && (
          <View style={cs.fileRow}>
            <MaterialCommunityIcons name="file-check-outline" size={14} color={COLORS.success} />
            <Text style={cs.fileName}>{cert.arquivo.name}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────
export default function Certificacoes() {
  const [salvas, setSalvas] = useState<Certificacao[]>([]);
  const [atual, setAtual] = useState<Certificacao>(nova());
  const [erros, setErros] = useState<Partial<Record<keyof Certificacao, string>>>({});

  function atualizar<K extends keyof Certificacao>(campo: K, valor: Certificacao[K]) {
    setAtual((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  function removerCertificacao(index: number) {
    setSalvas((prev) => prev.filter((_, i) => i !== index));
  }

  function validar(): boolean {
    const e: Partial<Record<keyof Certificacao, string>> = {};
    if (!atual.nome.trim()) e.nome = "Informe o nome da certificação.";
    
    if (!atual.instituicao) {
      e.instituicao = "Selecione a instituição.";
    } else if (atual.instituicao === "Outra" && (!atual.instituicaoOutra || !atual.instituicaoOutra.trim())) {
      e.instituicao = "Especifique o nome da instituição.";
    }

    if (!atual.arquivo) e.arquivo = "Selecione o documento da certificação.";
    
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function handleAdicionar() {
    if (!validar()) return;
    if (salvas.length >= 20) return;

    const certFinal: Certificacao = {
      ...atual,
      instituicao: atual.instituicao === "Outra" ? (atual.instituicaoOutra || "") : atual.instituicao,
    };

    setSalvas((prev) => [...prev, certFinal]);
    setAtual(nova());
    setErros({});
  }

  function handleProximo() {
    const payload = {
      certificacoes: salvas.map(({ instituicaoOutra, ...dados }) => dados)
    };
    console.log("Payload de Certificações:", payload);

    router.push("/disponibilidade");
  }

  function handleSemCert() {
    router.push("/disponibilidade");
  }

  const temCerts = salvas.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StepHeader
          etapa={4}
          titulo="Certificações"
          descricao="Adicione certificações que comprovem suas habilidades técnicas."
          etapaLabel="Etapa 4 de 5 · Certificações"
        />

        {salvas.map((c, i) => (
          <CardSalvo key={i} cert={c} numero={i + 1} onRemover={() => removerCertificacao(i)} />
        ))}

        <View style={styles.sectionDivider}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionLabel}>
            {temCerts ? `Adicionar Certificação ${salvas.length + 1}` : "Adicionar Certificação 1"}
          </Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Nome da Certificação"
            icone="certificate-outline"
            placeholder="Ex: AWS Certified Developer"
            value={atual.nome}
            onChangeText={(v) => atualizar("nome", v)}
            erro={erros.nome}
          />

          <SelectModal
            label="Instituição"
            options={INSTITUICOES}
            value={atual.instituicao}
            onSelect={(v) => {
              atualizar("instituicao", v);
              if (v !== "Outra") atualizar("instituicaoOutra", "");
            }}
            placeholder="Selecione a instituição"
            icone="domain"
            erro={erros.instituicao}
          />

          {atual.instituicao === "Outra" && (
            <View style={{ width: INPUT_WIDTH, marginTop: SPACING.sm }}>
              <TouchableOpacity style={[fp.pickerOutra, erros.instituicao && { borderColor: COLORS.borderError }]} activeOpacity={1}>
                <TextInputInline
                  placeholder="Qual o nome da instituição?"
                  value={atual.instituicaoOutra || ""}
                  onChangeText={(v) => atualizar("instituicaoOutra", v)}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* O Pulo do Gato: SelectModal simulando campo de Data para o Ano */}
          <SelectModal
            label="Ano de Conclusão (Opcional)"
            options={ANOS_OPCOES}
            value={atual.anoConclusao}
            onSelect={(v) => atualizar("anoConclusao", v)}
            placeholder="AAAA"
            icone="calendar-outline"
          />

          <FilePickerField
            arquivo={atual.arquivo}
            onSelect={(f) => atualizar("arquivo", f)}
            erro={erros.arquivo as string | undefined}
          />
        </View>

        {salvas.length < 20 && (
          <TouchableOpacity onPress={handleAdicionar} style={styles.btnAdicionar}>
            <Text style={styles.btnAdicionarTexto}>+ Adicionar Certificação</Text>
          </TouchableOpacity>
        )}

        {temCerts ? (
          <ButtonConfirm text="Próximo →" onPress={handleProximo} />
        ) : (
          <ButtonConfirm text="Não tenho certificações" variant="ghost" onPress={handleSemCert} />
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

const fp = StyleSheet.create({
  label: { color: COLORS.textSecondary, fontSize: FONT.xs, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6 },
  picker: { height: 54, backgroundColor: COLORS.bgInput, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, borderStyle: "dashed", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: SPACING.md, gap: SPACING.sm },
  pickerOutra: { height: 54, backgroundColor: COLORS.bgInput, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, flexDirection: "row", alignItems: "center", paddingHorizontal: SPACING.md },
  pickerText: { color: COLORS.textMuted, fontSize: FONT.sm },
  fileBox: { height: 54, backgroundColor: COLORS.bgCard, borderWidth: 1.5, borderColor: COLORS.success, borderRadius: RADIUS.md, flexDirection: "row", alignItems: "center", paddingHorizontal: SPACING.md },
  fileName: { color: COLORS.textPrimary, fontSize: FONT.sm, fontWeight: "600" },
  fileSize: { color: COLORS.textMuted, fontSize: FONT.xs },
  erro: { color: COLORS.textError, fontSize: FONT.xs, marginTop: 4 },
});

const cs = StyleSheet.create({
  card: { width: INPUT_WIDTH, flexDirection: "row", backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md, marginBottom: SPACING.sm, overflow: "hidden", borderWidth: 1, borderColor: COLORS.border },
  leftBar: { width: 4, backgroundColor: COLORS.success },
  content: { flex: 1, padding: SPACING.md },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  label: { color: COLORS.success, fontSize: FONT.xs, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  nome: { color: COLORS.textPrimary, fontSize: FONT.md, fontWeight: "700" },
  sub: { color: COLORS.textSecondary, fontSize: FONT.sm, marginTop: 2 },
  fileRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  fileName: { color: COLORS.success, fontSize: FONT.xs },
});