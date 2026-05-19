import ButtonConfirm from "@/src/components/button-confirm-compent";
import { Input } from "@/src/components/input-component";
import { GlobalStyles } from "@/src/components/style";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from 'expo-router';

// Indicador de progresso
function ProgressIndicator({ etapaAtual }: { etapaAtual: number }) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      gap: 8,
    }}>
      {[1, 2, 3, 4, 5].map((etapa) => {
        const isAtual = etapa === etapaAtual;
        return (
          <View key={etapa} style={{ flexDirection: 'row', alignItems: 'center' }}>
            {etapa > 1 && (
              <View style={{
                width: 24,
                height: 2,
                backgroundColor: etapa <= etapaAtual ? '#fff' : 'rgba(255,255,255,0.3)',
                marginRight: 8,
              }} />
            )}
            <View style={{
              width: isAtual ? 36 : 28,
              height: isAtual ? 36 : 28,
              borderRadius: 18,
              backgroundColor: isAtual ? '#fff' : 'rgba(255,255,255,0.25)',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: isAtual ? 0 : 1.5,
              borderColor: 'rgba(255,255,255,0.5)',
            }}>
              <Text style={{
                color: isAtual ? '#1a6dcc' : 'rgba(255,255,255,0.7)',
                fontWeight: isAtual ? 'bold' : '500',
                fontSize: isAtual ? 16 : 13,
              }}>
                {etapa}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

type Certificacao = {
  nome: string;
  instituicao: string;
  ano: string;
};

export default function Certificacoes() {

  const router = useRouter();

  const [certificacoes, setCertificacoes] = useState<Certificacao[]>([
    { nome: "", instituicao: "", ano: "" }
  ]);

  const [abertaIndex, setAbertaIndex] = useState<number | null>(0);

  function adicionarCertificacao() {
    setCertificacoes(prev => {
      const novas = [
        ...prev,
        { nome: "", instituicao: "", ano: "" }
      ];
      setAbertaIndex(novas.length - 1);
      return novas;
    });
  }

  function atualizarCampo(
    index: number,
    campo: keyof Certificacao,
    valor: string
  ) {
    setCertificacoes(prev => {
      const novas = [...prev];
      novas[index] = { ...novas[index], [campo]: valor };
      return novas;
    });
  }

  function handleFinalizar() {
    router.push('/disponibilidade');
  }

  return (
    <View style={[GlobalStyles.fundoazullogin, { paddingTop: 20 }]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/images/robofdpnopc.png")}
          style={{
            width: 200,
            height: 150,
            resizeMode: "contain",
            marginTop: 20,
          }}
        />

        <Text style={GlobalStyles.titulo}>Me conte mais sobre você!</Text>
        <Text style={GlobalStyles.subtitulo}>
          Etapa 4 de 5 — Certificações
        </Text>

        <ProgressIndicator etapaAtual={4} />

        {certificacoes.map((cert, index) => {
          const aberta = abertaIndex === index;
          return (
            <View key={index} style={styles.card}>
              {/* Header */}
              <TouchableOpacity
                onPress={() => setAbertaIndex(aberta ? null : index)}
                style={styles.cardHeader}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitulo}>
                    {cert.nome?.trim() ? cert.nome : `Certificação ${index + 1}`}
                  </Text>
                  {!aberta && (cert.instituicao || cert.ano) && (
                    <Text style={styles.cardPreview}>
                      {cert.instituicao} {cert.ano ? `• ${cert.ano}` : ""}
                    </Text>
                  )}
                </View>
                <Text style={styles.seta}>{aberta ? "▲" : "▼"}</Text>
              </TouchableOpacity>

              {/* Conteúdo */}
              {aberta && (
                <View style={{ marginTop: 10, alignItems: 'center' }}>  {/* 👈 adiciona alignItems center */}
                  <Input
                    placeholder="Nome da certificação"
                    placeholderTextColor="#777"
                    value={cert.nome}
                    onChangeText={(text) => atualizarCampo(index, "nome", text)}
                  />
                  <Input
                    placeholder="Instituição"
                    placeholderTextColor="#777"
                    value={cert.instituicao}
                    onChangeText={(text) => atualizarCampo(index, "instituicao", text)}
                  />
                  <Input
                    placeholder="Ano de conclusão"
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={cert.ano}
                    onChangeText={(text) => atualizarCampo(index, "ano", text)}
                  />
                </View>
              )}
            </View>
          );
        })}

        {/* Botão adicionar — estilo igual ao de formação */}
        <TouchableOpacity onPress={adicionarCertificacao} style={styles.botaoAdicionar}>
          <Text style={styles.botaoTexto}>+ Adicionar certificação</Text>
        </TouchableOpacity>

        <ButtonConfirm text="Próximo" onPress={handleFinalizar} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%", 
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#0a1f3d",
    padding: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#0f2a4d",
  },
  cardTitulo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  cardPreview: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  seta: {
    color: "#fff",
    fontSize: 16,
  },
  botaoAdicionar: {
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderStyle: 'dashed',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
});