import { DatePickerField } from "@/src/components/date-input";
import { salvarCertificacoes } from "@/src/services/CertificacaoService";
import { uriToByteArray } from "@/src/utils/fileToBytes";
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
import {
  COLORS,
  FONT,
  INPUT_WIDTH,
  RADIUS,
  SPACING,
} from "../../components/style";
import { useCurriculoData } from "../../context/curriculo-data-context";

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type Certificacao = {
  nomeCertificacao: string;
  id_instituicao: string;
  dataConclusao: Date | null; // Trocado de Date para string
  certificado: { name: string; uri: string; size?: number } | null;
};

const nova = (): Certificacao => ({
  nomeCertificacao: "",
  id_instituicao: "",
  dataConclusao: null,
  certificado: null,
});

// ─── Listas Padrões ────────────────────────────────────────────────────────────
const INSTITUICOES = [
  { label: "Alura", value: "2" },
  { label: "Udemy", value: "4" },
  { label: "Amazon Web Services (AWS)", value: "Amazon Web Services (AWS)" },
  { label: "Coursera", value: "3" },
  { label: "DIO (Digital Innovation One)", value: "1" },
  { label: "SENAC", value: "5" },
  { label: "SENAI", value: "6" },
  { label: "Outra", value: "7" },
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
  arquivo: Certificacao["certificado"];
  onSelect: (f: Certificacao["certificado"]) => void;
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
      Alert.alert(
        "Arquivo inválido",
        "Selecione um PDF, imagem ou documento Word.",
      );
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
          <MaterialCommunityIcons
            name="file-document-outline"
            size={20}
            color={COLORS.success}
          />
          <View style={{ flex: 1, marginLeft: SPACING.sm }}>
            <Text style={fp.fileName} numberOfLines={1}>
              {arquivo.name}
            </Text>
            {arquivo.size && (
              <Text style={fp.fileSize}>
                {(arquivo.size / 1024).toFixed(1)} KB
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleRemove}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[fp.picker, erro && { borderColor: COLORS.borderError }]}
          onPress={handlePick}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons
            name="upload-outline"
            size={20}
            color={COLORS.textMuted}
          />
          <Text style={fp.pickerText}>Toque para selecionar arquivo</Text>
        </TouchableOpacity>
      )}

      {erro ? <Text style={fp.erro}>{erro}</Text> : null}
    </View>
  );
}

// ─── Card de certificação salva ───────────────────────────────────────────────
function CardSalvo({
  cert,
  numero,
  onRemover,
}: {
  cert: Certificacao;
  numero: number;
  onRemover: () => void;
}) {
  const nomeInstituicao =
    INSTITUICOES.find((i) => i.value === cert.id_instituicao)?.label ??
    cert.id_instituicao;

  return (
    <View style={cs.card}>
      <View style={cs.leftBar} />
      <View style={cs.content}>
        <View style={cs.headerRow}>
          <Text style={cs.label}>✓ Certificação {numero}</Text>
          <TouchableOpacity
            onPress={onRemover}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={18}
              color={COLORS.borderError}
            />
          </TouchableOpacity>
        </View>
        <Text style={cs.nome}>{cert.nomeCertificacao}</Text>
        <Text style={cs.sub}>
          {nomeInstituicao}{" "}
          {cert.dataConclusao
            ? `· ${cert.dataConclusao.toLocaleDateString("pt-BR")}`
            : ""}
        </Text>
        {cert.certificado && (
          <View style={cs.fileRow}>
            <MaterialCommunityIcons
              name="file-check-outline"
              size={14}
              color={COLORS.success}
            />
            <Text style={cs.fileName}>{cert.certificado.name}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────
export default function Certificacoes() {
  const { updateCertificacoes } = useCurriculoData();
  const [salvas, setSalvas] = useState<Certificacao[]>([]);
  const [atual, setAtual] = useState<Certificacao>(nova());
  const [erros, setErros] = useState<
    Partial<Record<keyof Certificacao, string>>
  >({});

  function atualizar<K extends keyof Certificacao>(
    campo: K,
    valor: Certificacao[K],
  ) {
    setAtual((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  function removerCertificacao(index: number) {
    setSalvas((prev) => prev.filter((_, i) => i !== index));
  }

  function validar(): boolean {
    const e: Partial<Record<keyof Certificacao, string>> = {};
    if (!atual.nomeCertificacao.trim())
      e.nomeCertificacao = "Informe a certificação.";

    if (!atual.id_instituicao) {
      e.id_instituicao = "Selecione a instituição.";
    }

    if (!atual.certificado)
      e.certificado = "Selecione o documento da certificação.";

    setErros(e);
    return Object.keys(e).length === 0;
  }

  function handleAdicionar() {
    if (!validar()) return;
    if (salvas.length >= 20) return;

    const certFinal: Certificacao = {
      ...atual,
      id_instituicao: atual.id_instituicao,
    };

    setSalvas((prev) => [...prev, certFinal]);
    setAtual(nova());
    setErros({});
  }

  function salvarCertificacoesNoContexto(lista: Certificacao[]) {
    updateCertificacoes(
      lista.map(({ certificado, ...dados }) => ({
        nome: dados.nomeCertificacao,
        instituicao: dados.id_instituicao,
        dataConclusao: dados.dataConclusao
          ? dados.dataConclusao.toISOString().split("T")[0]
          : null,
      })),
    );
  }

  async function handleProximo() {
    let listaFinal = [...salvas];

    // Se o usuário preencheu algo mas não clicou em adicionar, inclui automaticamente
    if (atual.nomeCertificacao || atual.id_instituicao || atual.certificado) {
      if (!validar()) return;
      listaFinal.push(atual);
    }

    if (listaFinal.length === 0) {
      Alert.alert(
        "Atenção",
        "Adicione ao menos uma certificação ou clique em 'Não tenho certificações'.",
      );
      return;
    }

    const payload = await Promise.all(
      listaFinal.map(async (cert) => ({
        nomeCertificacao: cert.nomeCertificacao,
        id_instituicao: Number(cert.id_instituicao),
        dataConclusao: cert.dataConclusao
          ? cert.dataConclusao.toISOString().split("T")[0]
          : null,
        certificado: cert.certificado
          ? await uriToByteArray(cert.certificado.uri)
          : null,
      })),
    );

    salvarCertificacoesNoContexto(listaFinal);
    const response = await salvarCertificacoes(payload);
    console.log("Certificações salvas");
    router.push("/disponibilidade");
  }

  function handleSemCert() {
    updateCertificacoes([]);
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
          <CardSalvo
            key={i}
            cert={c}
            numero={i + 1}
            onRemover={() => removerCertificacao(i)}
          />
        ))}

        <View style={styles.sectionDivider}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionLabel}>
            {temCerts
              ? `Adicionar Certificação ${salvas.length + 1}`
              : "Adicionar Certificação 1"}
          </Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Nome da Certificação"
            icone="certificate-outline"
            placeholder="Ex: AWS Certified Developer"
            value={atual.nomeCertificacao}
            onChangeText={(v) => atualizar("nomeCertificacao", v)}
            erro={erros.nomeCertificacao}
          />

          <SelectModal
            label="Instituição"
            options={INSTITUICOES}
            value={atual.id_instituicao}
            onSelect={(v) => {
              atualizar("id_instituicao", v);
            }}
            placeholder="Selecione a instituição"
            icone="domain"
            erro={erros.id_instituicao}
          />

          {/* O Pulo do Gato: SelectModal simulando campo de Data para o Ano */}
          <DatePickerField
            label="Data de Conclusão (Opcional)"
            value={atual.dataConclusao}
            onChange={(d) => atualizar("dataConclusao", d)}
          />

          <FilePickerField
            arquivo={atual.certificado}
            onSelect={(f) => atualizar("certificado", f)}
            erro={erros.certificado as string | undefined}
          />
        </View>

        {salvas.length < 20 && (
          <TouchableOpacity
            onPress={handleAdicionar}
            style={styles.btnAdicionar}
          >
            <Text style={styles.btnAdicionarTexto}>
              + Adicionar Certificação
            </Text>
          </TouchableOpacity>
        )}

        <ButtonConfirm text="Próximo →" onPress={handleProximo} />

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
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT.xs,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  picker: {
    height: 54,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  pickerOutra: {
    height: 54,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  pickerText: { color: COLORS.textMuted, fontSize: FONT.sm },
  fileBox: {
    height: 54,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1.5,
    borderColor: COLORS.success,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  fileName: { color: COLORS.textPrimary, fontSize: FONT.sm, fontWeight: "600" },
  fileSize: { color: COLORS.textMuted, fontSize: FONT.xs },
  erro: { color: COLORS.textError, fontSize: FONT.xs, marginTop: 4 },
});

const cs = StyleSheet.create({
  card: {
    width: INPUT_WIDTH,
    flexDirection: "row",
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  leftBar: { width: 4, backgroundColor: COLORS.success },
  content: { flex: 1, padding: SPACING.md },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    color: COLORS.success,
    fontSize: FONT.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  nome: { color: COLORS.textPrimary, fontSize: FONT.md, fontWeight: "700" },
  sub: { color: COLORS.textSecondary, fontSize: FONT.sm, marginTop: 2 },
  fileRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  fileName: { color: COLORS.success, fontSize: FONT.xs },
});
