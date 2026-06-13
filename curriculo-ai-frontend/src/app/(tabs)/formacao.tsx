import { salvarArea } from "@/src/services/AreaService";
import { salvarFormacoes } from "@/src/services/FormacaoService";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonConfirm from "../../components/button-confirm-compent";
import FormacaoComponent from "../../components/formacao-component";
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
import { dateToIso } from "../../utils/date-format";

export type FormacaoData = {
  id: string;
  curso: string;
  tipoFormacao: string;
  dataInicio: Date | null;
  dataConclusao: Date | null;
  emAndamento: boolean;
};

const AREAS = [
  { label: "Backend", value: "31" },
  { label: "Frontend", value: "32" },
  { label: "Full Stack", value: "33" },
  { label: "Mobile", value: "34" },
  { label: "DevOps / SRE", value: "35" },
  { label: "Data Engineering", value: "36" },
  { label: "QA / Testes", value: "37" },
  { label: "UI/UX Engineering", value: "38" },
  { label: "Software Engineering", value: "39" },
  { label: "Segurança / CyberSec", value: "40" },
  { label: "Machine Learning / IA", value: "41" },
];

export default function Formacao() {
  const { updateFormacao } = useCurriculoData();
  const [formacoes, setFormacoes] = useState<FormacaoData[]>([]);
  const [area, setArea] = useState("");
  const [areaErro, setAreaErro] = useState("");
  const [errosGlobais, setErrosGlobais] = useState<
    Record<string, Partial<Record<keyof FormacaoData, string>>>
  >({});

  function adicionarFormacao() {
    if (!validarCampos()) return;
    if (formacoes.length >= 10) return;

    const novaFormacao: FormacaoData = {
      id: Math.random().toString(36).substring(2, 9),
      curso: "0",
      tipoFormacao: "",
      dataInicio: null,
      dataConclusao: null,
      emAndamento: false,
    };

    setFormacoes((prev) => [...prev, novaFormacao]);
  }

  function removerFormacao(id: string) {
    setFormacoes((prev) => prev.filter((f) => f.id !== id));
    setErrosGlobais((prev) => {
      const novosErros = { ...prev };
      delete novosErros[id];
      return novosErros;
    });
  }

  function atualizarFormacao(
    id: string,
    campo: keyof FormacaoData,
    valor: any,
  ) {
    setFormacoes((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [campo]: valor } : f)),
    );
    setErrosGlobais((prev) => ({
      ...prev,
      [id]: { ...prev[id], [campo]: undefined },
    }));
  }

  function validarCampos(): boolean {
    let valido = true;
    const novosErros: Record<
      string,
      Partial<Record<keyof FormacaoData, string>>
    > = {};

    if (!area) {
      setAreaErro("Selecione sua área de atuação.");
      valido = false;
    }

    formacoes.forEach((f) => {
      const erroCard: Partial<Record<keyof FormacaoData, string>> = {};

      if (!f.curso) {
        erroCard.curso = "Selecione o curso.";
        valido = false;
      }

      if (!f.tipoFormacao) {
        erroCard.tipoFormacao = "Selecione o tipo de formação.";
        valido = false;
      }

      if (!f.dataInicio) {
        erroCard.dataInicio = "Data de início obrigatória.";
        valido = false;
      }

      if (!f.emAndamento) {
        if (!f.dataConclusao) {
          erroCard.dataConclusao = "Data de término obrigatória.";
          valido = false;
        }

        if (f.dataInicio && f.dataConclusao && f.dataInicio > f.dataConclusao) {
          erroCard.dataConclusao =
            "A data de término não pode ser anterior ao início.";
          valido = false;
        }
      }
      if (Object.keys(erroCard).length > 0) {
        novosErros[f.id] = erroCard;
      }
    });

    setErrosGlobais(novosErros);
    return valido;
  }

  function salvarFormacaoNoContexto() {
    updateFormacao(
      area,
      formacoes.map((f) => ({
        curso: f.curso,
        tipoFormacao: f.tipoFormacao,
        dataInicio: dateToIso(f.dataInicio),
        dataConclusao: dateToIso(f.dataConclusao),
        emAndamento: f.emAndamento,
      })),
    );
  }

  async function handleProximo() {
    if (!validarCampos()) return;
    const temCursoInvalido = formacoes.some((f) => f.curso === "0");
    if (temCursoInvalido) {
      Alert.alert("Erro", "Selecione o curso de todas as formações.");
      return;
    }

    salvarFormacaoNoContexto();

    try {
      const responseArea = await salvarArea(area);

      console.log("Area cadastrada com sucesso");

      const responseFormacoes = await salvarFormacoes(formacoes);

      console.log("Formações salvar com sucesso");

      router.push("/experiencia");
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error ? error.message : "Erro inesperado",
      );
    }
  }

  function handleSemFormacao() {
    updateFormacao(area, []);
    router.push("/experiencia");
  }

  const temFormacao = formacoes.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar style="light" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={20}
      >
        <StepHeader
          etapa={2}
          titulo="Sua Formação"
          descricao="Informe sua área de atuação e formação acadêmica."
          etapaLabel="Etapa 2 de 5 · Formação"
        />

        <SelectModal
          label="Área de Atuação"
          options={AREAS}
          value={area}
          onSelect={(v: string) => {
            setArea(v);
            setAreaErro("");
          }}
          placeholder="Selecione sua área"
          icone="code-tags"
          erro={areaErro}
        />

        <View style={styles.sectionDivider}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionLabel}>Formações acadêmicas</Text>
          <View style={styles.sectionLine} />
        </View>

        {formacoes.map((f, index) => (
          <FormacaoComponent
            key={f.id}
            numero={index + 1}
            data={f}
            erros={errosGlobais[f.id] || {}}
            onUpdate={(campo: keyof FormacaoData, valor: any) =>
              atualizarFormacao(f.id, campo, valor)
            }
            onRemover={() => removerFormacao(f.id)}
            podeRemover={true}
          />
        ))}

        {/* REGRA 3: Esconde o botão se atingir o máximo de 10 */}
        {formacoes.length < 10 && (
          <TouchableOpacity
            onPress={adicionarFormacao}
            style={styles.btnAdicionar}
          >
            <Text style={styles.btnAdicionarTexto}>+ Adicionar formação</Text>
          </TouchableOpacity>
        )}

        <ButtonConfirm text="Próximo →" onPress={handleProximo} />
      </KeyboardAwareScrollView>
    </View>
  );
}

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
