import ButtonConfirm from "@/src/components/button-confirm-compent";
import { Input } from "@/src/components/input-component";
import { GlobalStyles } from "@/src/components/style";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
      {[1, 2, 3, 4].map((etapa) => {
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
            }}>
              <Text style={{
                color: isAtual ? '#1a6dcc' : 'rgba(255,255,255,0.7)',
                fontWeight: 'bold',
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

      // 👇 abre a nova e fecha as outras
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
      novas[index] = {
        ...novas[index],
        [campo]: valor
      };
      return novas;
    });
  }

  function handleFinalizar() {
    console.log(certificacoes);
  }

  return (
    <View style={[GlobalStyles.fundoazullogin, { paddingTop: 80 }]}>
      
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

        <Text style={GlobalStyles.titulo}>Suas Certificações</Text>
        <Text style={[GlobalStyles.subtitulo, { fontSize: 16 }]}>
          Etapa 4 de 4 — Destaque seus cursos
        </Text>

        <ProgressIndicator etapaAtual={4} />

        {certificacoes.map((cert, index) => {
  const aberta = abertaIndex === index;

  return (
    <View
      key={index}
      style={{
        width: "90%",
        marginBottom: 12,
        borderRadius: 10,
        backgroundColor: "#0a1f3d",
        padding: 10,
      }}
    >
      {/* Header */}
      <TouchableOpacity
        onPress={() => setAbertaIndex(aberta ? null : index)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderRadius: 8,
          backgroundColor: aberta ? "#123766" : "#0f2a4d",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            {cert.nome?.trim()
              ? cert.nome
              : `Certificação ${index + 1}`}
          </Text>

          {/* Preview quando fechado */}
          {!aberta && (cert.instituicao || cert.ano) && (
            <Text style={{ color: "#aaa", fontSize: 12, marginTop: 2 }}>
              {cert.instituicao} {cert.ano ? `• ${cert.ano}` : ""}
            </Text>
          )}
        </View>

        {/* Setinha */}
        <Text style={{ color: "#fff", fontSize: 16 }}>
          {aberta ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {/* Conteúdo */}
      {aberta && (
        <View style={{ marginTop: 10 }}>
          <Input
            placeholder="Nome da certificação"
            placeholderTextColor={'#777'}
            value={cert.nome}
            onChangeText={(text) => atualizarCampo(index, "nome", text)}
          />

          <Input
            placeholder="Instituição"
            placeholderTextColor={'#777'}
            value={cert.instituicao}
            onChangeText={(text) => atualizarCampo(index, "instituicao", text)}
          />

          <Input
            placeholder="Ano de conclusão"
            placeholderTextColor={'#777'}
            keyboardType={'numeric'}
            value={cert.ano}
            onChangeText={(text) => atualizarCampo(index, "ano", text)}
          />
        </View>
      )}
    </View>
  );
})}

        <TouchableOpacity onPress={adicionarCertificacao}>
          <Text style={{
            color: "#fff",
            marginVertical: 10,
            fontWeight: "bold"
          }}>
            + Adicionar outra certificação
          </Text>
        </TouchableOpacity>

        <ButtonConfirm text="Finalizar" onPress={handleFinalizar} />
      </KeyboardAwareScrollView>
    </View>
  );
}