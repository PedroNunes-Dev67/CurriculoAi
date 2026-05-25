import ButtonConfirm from "@/src/components/button-confirm-compent";
import FormacaoComponent from "@/src/components/formacao-component";
import SelectModal from "@/src/components/select-modal";
import StepHeader from "@/src/components/step-header";
import { COLORS, FONT, INPUT_WIDTH, RADIUS, SPACING } from "@/src/components/style";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type FormacaoData = {
  id: string;
  curso: string;
  nomeCursoOutro?: string; // Campo auxiliar temporário
  tipoFormacao: string;
  dataInicio: Date | null;
  dataTermino: Date | null;
  cursando: boolean;
};

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

export default function Formacao() {
  const [formacoes, setFormacoes] = useState<FormacaoData[]>([]);
  const [area, setArea] = useState("");
  const [areaErro, setAreaErro] = useState("");
  const [errosGlobais, setErrosGlobais] = useState<Record<string, Partial<Record<keyof FormacaoData, string>>>>({});

  function adicionarFormacao() {
    if (!validarCampos()) return;
    if (formacoes.length >= 10) return;

    const novaFormacao: FormacaoData = {
      id: Math.random().toString(36).substring(2, 9),
      curso: "",
      nomeCursoOutro: "", // Inicializado
      tipoFormacao: "",
      dataInicio: null,
      dataTermino: null,
      cursando: false,
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

  function atualizarFormacao(id: string, campo: keyof FormacaoData, valor: any) {
    setFormacoes((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [campo]: valor } : f))
    );
    setErrosGlobais((prev) => ({
      ...prev,
      [id]: { ...prev[id], [campo]: undefined },
    }));
  }

  function validarCampos(): boolean {
    let valido = true;
    const novosErros: Record<string, Partial<Record<keyof FormacaoData, string>>> = {};

    if (!area) {
      setAreaErro("Selecione sua área de atuação.");
      valido = false;
    }

    formacoes.forEach((f) => {
      const erroCard: Partial<Record<keyof FormacaoData, string>> = {};
      
      if (!f.curso) {
        erroCard.curso = "Selecione o curso.";
        valido = false;
      } else if (f.curso === "Outro" && (!f.nomeCursoOutro || !f.nomeCursoOutro.trim())) {
        erroCard.curso = "Especifique o nome do curso.";
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

      if (!f.cursando) {
        if (!f.dataTermino) {
          erroCard.dataTermino = "Data de término obrigatória.";
          valido = false;
        }
        if (f.dataInicio && f.dataTermino && f.dataInicio > f.dataTermino) {
          erroCard.dataTermino = "A data de término não pode ser anterior ao início.";
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

  function handleProximo() {
    if (!validarCampos()) return;

    const payload = {
      areaAtuacao: area,
      // Desestrutura nomeCursoOutro para não enviar ao banco, substituindo 'curso' se necessário
      formacoes: formacoes.map(({ id, nomeCursoOutro, curso, ...dados }) => ({
        ...dados,
        curso: curso === "Outro" ? (nomeCursoOutro || "") : curso
      })),
    };

    console.log("Payload para o Spring Boot:", payload);
    router.push("/experiencia");
  }

  function handleSemFormacao() {
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
          onSelect={(v) => { setArea(v); setAreaErro(""); }}
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
            onUpdate={(campo, valor) => atualizarFormacao(f.id, campo, valor)}
            onRemover={() => removerFormacao(f.id)}
            podeRemover={true}
          />
        ))}

        {/* REGRA 3: Esconde o botão se atingir o máximo de 10 */}
        {formacoes.length < 10 && (
          <TouchableOpacity onPress={adicionarFormacao} style={styles.btnAdicionar}>
            <Text style={styles.btnAdicionarTexto}>+ Adicionar formação</Text>
          </TouchableOpacity>
        )}

        {temFormacao && <ButtonConfirm text="Próximo →" onPress={handleProximo} />}

        {!temFormacao && (
          <ButtonConfirm
            text="Não tenho formação"
            variant="ghost"
            onPress={handleSemFormacao}
          />
        )}
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