import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "@rneui/themed";
import langs from "langs";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Input } from "../../components/input-component";
import { GlobalStyles } from "../../components/style";

// Indicador de progresso (As 4 etapas)
function ProgressIndicator({ etapaAtual }: { etapaAtual: number }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        gap: 8,
      }}
    >
      {[1, 2, 3, 4, 5].map((etapa) => {
        const isAtual = etapa === etapaAtual;
        return (
          <View
            key={etapa}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {etapa > 1 && (
              <View
                style={{
                  width: 24,
                  height: 2,
                  backgroundColor:
                    etapa <= etapaAtual ? "#fff" : "rgba(255,255,255,0.3)",
                  marginRight: 8,
                }}
              />
            )}
            <View
              style={{
                width: isAtual ? 36 : 28,
                height: isAtual ? 36 : 28,
                borderRadius: 18,
                backgroundColor: isAtual ? "#fff" : "rgba(255,255,255,0.25)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: isAtual ? 0 : 1.5,
                borderColor: "rgba(255,255,255,0.5)",
              }}
            >
              <Text
                style={{
                  color: isAtual ? "#1a6dcc" : "rgba(255,255,255,0.7)",
                  fontWeight: isAtual ? "bold" : "500",
                  fontSize: isAtual ? 16 : 13,
                }}
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

function Cabecalho() {
  return (
    <>
      <Image
        source={require("../../assets/images/robofdpnopc.png")}
        style={{
          width: 200,
          height: 150,
          resizeMode: "contain",
          marginTop: 100,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Gostariamos de saber sobre sua disponibilidade e
        conhecimentos linguísticos!
      </Text>
      <Text style={[GlobalStyles.subtitulo, { fontSize: 16, margin: 0 }]}>
        Etapa 5 de 5 - Disponibilidade e Idiomas
      </Text>
      <ProgressIndicator etapaAtual={5} />
    </>
  );
}

function DataInicio({
  data,
  setData,
  checked,
  setChecked,
}: {
  data: string;
  setData: (v: string) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
}) {
  const handleCheckboxPress = () => {
    const novoEstado = !checked;
    setChecked(novoEstado);
    if (novoEstado) setData("");
  };

  return (
    <>
      <Text
        style={[GlobalStyles.subtitulo, { fontSize: 15, margin: 10, textAlign: "center" }]}
      >
        Digite sua data para disponibilidade de início:
      </Text>
      <Input
        icone="calendar"
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#777"
        keyboardType="numeric"
        autoCapitalize="none"
        value={data}
        onChangeText={setData}
        editable={!checked}
        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
      />
      <CheckBox
        title="Estou disponível para início imediato"
        checked={checked}
        onPress={handleCheckboxPress}
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          alignSelf: "center",
        }}
        textStyle={{ color: "#fff", fontWeight: "500" }}
        checkedColor="#fff"
        uncheckedColor="rgba(255,255,255,0.5)"
      />
    </>
  );
}

function TipoDeVaga({
  vaga,
  setVaga,
}: {
  vaga: string;
  setVaga: (v: string) => void;
}) {
  const opcoes = ["Presencial", "Híbrido", "100% Remoto"];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      {opcoes.map((opcao) => (
        <TouchableOpacity
          key={opcao}
          onPress={() => setVaga(opcao)}
          style={{
            padding: 10,
            backgroundColor: vaga === opcao ? "#fff" : "rgba(255,255,255,0.2)",
            borderRadius: 20,
            flex: 1,
            marginHorizontal: 4,
            alignItems: "center",
          }}
        >
          <Text style={{ color: vaga === opcao ? "#1a6dcc" : "#fff" }}>
            {opcao}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function IdiomasFluentes({
  selec,
  setSelec,
}: {
  selec: string;
  setSelec: (v: string) => void;
}) {
  const allLangs = langs.all();
  const [idiomas, setIdiomas] = useState([{ lingua: selec, nivel: 0 }]);

  const nivelTexto = (estrelas: number) => {
    if (estrelas === 1) return "Seu nível neste idioma é básico";
    if (estrelas === 2) return "Seu nível neste idioma é intermediário";
    if (estrelas === 3) return "Você é fluente neste idioma";
    return "";
  };

  const adicionarIdioma = () => {
    setIdiomas([...idiomas, { lingua: "", nivel: 0 }]);
  };

  const atualizarLingua = (index: number, value: string) => {
    const novos = [...idiomas];
    novos[index].lingua = value;
    setIdiomas(novos);
    if (index === 0) setSelec(value);
  };

  const atualizarNivel = (index: number, estrelas: number) => {
    const novos = [...idiomas];
    novos[index].nivel = estrelas;
    setIdiomas(novos);
  };

  return (
    <View style={GlobalStyles.container_selection}>
      <Text style={GlobalStyles.label}>
        Selecione qual idioma você fala fluentemente
      </Text>

      {idiomas.map((idioma, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <View style={GlobalStyles.pickerw}>
            <Picker
              selectedValue={idioma.lingua}
              onValueChange={(value) => atualizarLingua(index, value)}
              style={GlobalStyles.picker}
            >
              <Picker.Item label="Escolha o idioma:" value="" />
              {allLangs.map((lang) => (
                <Picker.Item
                  key={lang["1"]}
                  label={lang.name}
                  value={lang["1"]}
                />
              ))}
            </Picker>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 8,
              gap: 8,
            }}
          >
            {[1, 2, 3].map((estrela) => (
              <TouchableOpacity
                key={estrela}
                onPress={() => atualizarNivel(index, estrela)}
              >
                <Text
                  style={{
                    fontSize: 28,
                    color:
                      idioma.nivel >= estrela
                        ? "#FFD700"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {idioma.nivel > 0 && (
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 4,
                fontSize: 13,
              }}
            >
              {nivelTexto(idioma.nivel)}
            </Text>
          )}
        </View>
      ))}

      <TouchableOpacity
        onPress={adicionarIdioma}
        style={{
          alignSelf: "center",
          marginTop: 6,
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: "rgba(255,255,255,0.2)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24, lineHeight: 28 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Disponibilidade() {
  const [selec, setSelec] = useState("pt");
  const [vaga, setVaga] = useState("Presencial");
  const [data, setData] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        GlobalStyles.fundoazullogin,
        { paddingTop: 100, paddingBottom: 40 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Cabecalho />
      <DataInicio
        data={data}
        setData={setData}
        checked={checked}
        setChecked={setChecked}
      />
      <TipoDeVaga vaga={vaga} setVaga={setVaga} />
      <IdiomasFluentes selec={selec} setSelec={setSelec} />
    </ScrollView>
  );
}
