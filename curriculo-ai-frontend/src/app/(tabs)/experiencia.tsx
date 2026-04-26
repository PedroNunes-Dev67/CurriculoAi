import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../../components/input-component";
import { GlobalStyles } from "../../components/style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tipos

type Experiencia = {
  cargo: string;
  empresa: string;
  inicio: string;
  termino: string;
  atual: boolean;
  area: string;
};

// Cargos

const CARGOS = [
  "Analista de Sistemas",
  "Analista de Dados",
  "Analista de Marketing",
  "Analista Financeiro",
  "Analista de RH",
  "Assistente Administrativo",
  "Assistente de TI",
  "Auxiliar de Escritório",
  "Desenvolvedor Front-end",
  "Desenvolvedor Back-end",
  "Desenvolvedor Full Stack",
  "Desenvolvedor Mobile",
  "Designer Gráfico",
  "Designer UX/UI",
  "Engenheiro de Software",
  "Gerente de Projetos",
  "Gerente Comercial",
  "Gestor de TI",
  "Product Manager",
  "Scrum Master",
  "Suporte Técnico",
  "Técnico em Informática",
  "Vendedor",
  "Outro",
];

const estadoInicial: Experiencia = {
  cargo: "",
  empresa: "",
  inicio: "",
  termino: "",
  atual: false,
  area: "",
};

// Condições de Datas

function aplicarMascaraData(valor: string): string {
  const numeros = valor.replace(/\D/g, "");
  if (numeros.length <= 2) return numeros;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 6)}`;
}

function dataValida(valor: string): boolean {
  if (!/^\d{2}\/\d{4}$/.test(valor)) return false;
  const [mes, ano] = valor.split("/").map(Number);
  if (mes < 1 || mes > 12) return false;
  if (ano < 1900 || ano > 2100) return false;
  return true;
}

// Indicadores de Progresso 1-4

function ProgressIndicator({ etapaAtual }: { etapaAtual: number }) {
  return (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4, 5].map((etapa) => {
        const isAtual = etapa === etapaAtual;
        return (
          <View
            key={etapa}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {etapa > 1 && (
              <View
                style={[
                  styles.progressLine,
                  {
                    backgroundColor:
                      etapa <= etapaAtual ? "#fff" : "rgba(255,255,255,0.3)",
                  },
                ]}
              />
            )}
            <View
              style={[
                styles.progressCircle,
                isAtual
                  ? styles.progressCircleAtual
                  : styles.progressCircleInativa,
              ]}
            >
              <Text
                style={[
                  styles.progressText,
                  { color: isAtual ? "#1a6dcc" : "rgba(255,255,255,0.7)" },
                ]}
              >
                {etapa}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

// Seletor de Cargo (Checkbox)

type CargoSelectorProps = {
  valorSelecionado: string;
  onSelecionar: (cargo: string) => void;
};

function CargoSelector({ valorSelecionado, onSelecionar }: CargoSelectorProps) {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.selectorBotao}
        onPress={() => setModalAberto(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.selectorIcone}>💼</Text>
        <Text
          style={[styles.selectorTexto, !valorSelecionado && { color: "#777" }]}
        >
          {valorSelecionado || "Selecione o cargo"}
        </Text>
        <Text style={styles.selectorSeta}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalAberto}
        transparent
        animationType="slide"
        onRequestClose={() => setModalAberto(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Selecione o Cargo</Text>
              <TouchableOpacity onPress={() => setModalAberto(false)}>
                <Text style={styles.modalFechar}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ maxHeight: 380 }}
              showsVerticalScrollIndicator={false}
            >
              {CARGOS.map((cargo) => {
                const selecionado = cargo === valorSelecionado;
                return (
                  <TouchableOpacity
                    key={cargo}
                    style={[
                      styles.modalOpcao,
                      selecionado && styles.modalOpcaoSelecionada,
                    ]}
                    onPress={() => {
                      onSelecionar(cargo);
                      setModalAberto(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalOpcaoTexto,
                        selecionado && styles.modalOpcaoTextoSelecionado,
                      ]}
                    >
                      {cargo}
                    </Text>
                    {selecionado && <Text style={styles.modalCheck}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Componente: Checkbox

type CheckboxProps = {
  marcado: boolean;
  onToggle: () => void;
  label: string;
};

function Checkbox({ marcado, onToggle, label }: CheckboxProps) {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View
        style={[styles.checkboxCaixa, marcado && styles.checkboxCaixaMarcada]}
      >
        {marcado && <Text style={styles.checkboxMarca}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// Card de Experiência Salva

function CardSalvo({ exp, numero }: { exp: Experiencia; numero: number }) {
  return (
    <View style={styles.cardSalvo}>
      <View style={styles.cardSalvoHeader}>
        <Text style={styles.cardSalvoNumero}>✅ Experiência {numero}</Text>
      </View>
      <Text style={styles.cardSalvoCargo}>{exp.cargo}</Text>
      <Text style={styles.cardSalvoEmpresa}>
        {exp.empresa} · {exp.area}
      </Text>
      <Text style={styles.cardSalvoPeriodo}>
        {exp.inicio} → {exp.atual ? "Atualmente" : exp.termino}
      </Text>
    </View>
  );
}

// Tela Principal: Tela de Experiência

export default function Etapa3() {
  const insets = useSafeAreaInsets();
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [card, setCard] = useState<Experiencia>(estadoInicial);
  const [erros, setErros] = useState<
    Partial<Record<keyof Experiencia, string>>
  >({});

  function atualizar<K extends keyof Experiencia>(
    campo: K,
    valor: Experiencia[K],
  ) {
    setCard((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  function handleData(campo: "inicio" | "termino", valor: string) {
    const mascarado = aplicarMascaraData(valor);
    atualizar(campo, mascarado);
  }

  function validarCard(): boolean {
    const novosErros: Partial<Record<keyof Experiencia, string>> = {};

    if (!card.cargo) novosErros.cargo = "Selecione um cargo.";
    if (!card.empresa.trim()) novosErros.empresa = "Informe a empresa.";
    if (!card.area.trim()) novosErros.area = "Informe a área de atuação.";

    if (!card.inicio) {
      novosErros.inicio = "Informe a data de início.";
    } else if (!dataValida(card.inicio)) {
      novosErros.inicio = "Use o formato MM/AAAA.";
    }

    if (!card.atual) {
      if (!card.termino) {
        novosErros.termino = "Informe a data de término.";
      } else if (!dataValida(card.termino)) {
        novosErros.termino = "Use o formato MM/AAAA.";
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleAdicionarExperiencia() {
    if (!validarCard()) return;
    setExperiencias((prev) => [...prev, card]);
    setCard(estadoInicial);
    setErros({});
  }

  function handleConcluido() {
    const cardSujo =
      card.cargo || card.empresa || card.inicio || card.termino || card.area;

    if (cardSujo && experiencias.length === 0) {
      if (!validarCard()) return;
      router.navigate("/certificacoes");
      return;
    }

    if (experiencias.length === 0 && !cardSujo) {
      Alert.alert(
        "Sem experiências",
        'Adicione pelo menos uma experiência ou clique em "Não tenho experiência".',
      );
      return;
    }

    router.navigate("/certificacoes");
  }

  function handleSemExperiencia() {
    router.navigate("/certificacoes");
  }

  const numeroAtual = experiencias.length + 1;
  const temExperiencias = experiencias.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: "#000c26" }}>
      <StatusBar style="light" backgroundColor="#000c26" />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + 40,
            paddingBottom: insets.bottom + 0,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
      >
        <Text style={GlobalStyles.titulo}>Experiências</Text>

        <ProgressIndicator etapaAtual={3} />

        {experiencias.map((exp, i) => (
          <CardSalvo key={i} exp={exp} numero={i + 1} />
        ))}

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Experiência {numeroAtual}</Text>

          <Text style={styles.labelCampo}>Cargo *</Text>
          <CargoSelector
            valorSelecionado={card.cargo}
            onSelecionar={(c) => atualizar("cargo", c)}
          />
          {erros.cargo && <Text style={styles.erro}>{erros.cargo}</Text>}

          <Text style={styles.labelCampo}>Empresa *</Text>
          <Input
            placeholder="Nome da empresa"
            placeholderTextColor="#777"
            keyboardType="default"
            autoCapitalize="words"
            value={card.empresa}
            onChangeText={(v: string) => atualizar("empresa", v)}
          />
          {erros.empresa && <Text style={styles.erro}>{erros.empresa}</Text>}

          <Text style={styles.labelCampo}>Área de atuação *</Text>
          <Input
            placeholder="Ex: Tecnologia, Saúde, Finanças..."
            placeholderTextColor="#777"
            keyboardType="default"
            autoCapitalize="words"
            value={card.area}
            onChangeText={(v: string) => atualizar("area", v)}
          />
          {erros.area && <Text style={styles.erro}>{erros.area}</Text>}

          <View style={styles.linha}>
            <View style={styles.metade}>
              <Text style={styles.labelCampo}>Início *</Text>
              <Input
                icone="calendar-today"
                placeholder="MM/AAAA"
                placeholderTextColor="#777"
                keyboardType="numeric"
                autoCapitalize="none"
                maxLength={7}
                value={card.inicio}
                onChangeText={(v: string) => handleData("inicio", v)}
              />
              {erros.inicio && <Text style={styles.erro}>{erros.inicio}</Text>}
            </View>

            <View 
  style={[styles.metade, card.atual && styles.inputDesabilitado]}
  pointerEvents={card.atual ? "none" : "auto"}
>
  <Text style={styles.labelCampo}>
    Término {card.atual ? "" : "*"}
  </Text>
  <Input
    icone="calendar-today"
    placeholder="MM/AAAA"
    placeholderTextColor="#777"
    keyboardType="numeric"
    autoCapitalize="none"
    maxLength={7}
    value={card.atual ? "" : card.termino}
    onChangeText={(v: string) => handleData("termino", v)}
  />
  {erros.termino && !card.atual && (
    <Text style={styles.erro}>{erros.termino}</Text>
  )}
</View>
          </View>

          <Checkbox
            marcado={card.atual}
            onToggle={() => {
              atualizar("atual", !card.atual);
              if (!card.atual) {
                atualizar("termino", "");
                setErros((prev) => ({ ...prev, termino: undefined }));
              }
            }}
            label="Trabalho aqui atualmente"
          />
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={handleAdicionarExperiencia}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoAdicionarTexto}>
            + Adicionar Experiência
          </Text>
        </TouchableOpacity>

        {!temExperiencias && (
          <TouchableOpacity
            style={styles.botaoSemExp}
            onPress={handleSemExperiencia}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoSemExpTexto}>Não tenho experiência</Text>
          </TouchableOpacity>
        )}

        {temExperiencias && (
          <TouchableOpacity
            style={styles.botaoConcluido}
            onPress={handleConcluido}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoConcluidoTexto}>Concluído →</Text>
          </TouchableOpacity>
        )}

        <View style={styles.espacoFinal} />
      </ScrollView>
    </View>
  );
}

// Estilos

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    width: "100%",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    gap: 8,
  },
  progressLine: {
    width: 24,
    height: 2,
    marginRight: 8,
  },
  progressCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircleAtual: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
  },
  progressCircleInativa: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.5)",
  },
  progressText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  cardTitulo: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  labelCampo: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginBottom: 4,
    marginTop: 10,
    fontWeight: "600",
  },
  linha: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  metade: {
    width: "100%",
  },
  inputDesabilitado: {
    opacity: 0.4,
  },
  erro: {
    color: "#ffcdd2",
    fontSize: 12,
    marginTop: 3,
    marginLeft: 4,
  },
  selectorBotao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginVertical: 4,
    width: "100%",
  },
  selectorIcone: {
    fontSize: 16,
    marginRight: 10,
  },
  selectorTexto: {
    flex: 1,
    color: "#333",
    fontSize: 15,
  },
  selectorSeta: {
    color: "#888",
    fontSize: 11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  modalFechar: {
    fontSize: 18,
    color: "#888",
    padding: 4,
  },
  modalOpcao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  modalOpcaoSelecionada: {
    backgroundColor: "#e8f0fe",
  },
  modalOpcaoTexto: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  modalOpcaoTextoSelecionado: {
    color: "#1a6dcc",
    fontWeight: "600",
  },
  modalCheck: {
    color: "#1a6dcc",
    fontWeight: "bold",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 4,
    gap: 10,
  },
  checkboxCaixa: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxCaixaMarcada: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  checkboxMarca: {
    color: "#1a6dcc",
    fontWeight: "bold",
    fontSize: 14,
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  cardSalvo: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4caf50",
  },
  cardSalvoHeader: {
    marginBottom: 6,
  },
  cardSalvoNumero: {
    color: "#a5d6a7",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardSalvoCargo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSalvoEmpresa: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    marginTop: 2,
  },
  cardSalvoPeriodo: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginTop: 4,
  },
  botaoAdicionar: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.5)",
    borderStyle: "dashed",
  },
  botaoAdicionarTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  botaoConcluido: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  botaoConcluidoTexto: {
    color: "#1a6dcc",
    fontWeight: "bold",
    fontSize: 16,
  },
  botaoSemExp: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 4,
  },
  botaoSemExpTexto: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  espacoFinal: {
    height: 80,
  },
});
