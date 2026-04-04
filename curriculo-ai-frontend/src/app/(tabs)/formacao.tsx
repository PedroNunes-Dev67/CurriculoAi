import ButtonConfirm from "@/src/components/button-confirm-compent";
import FormacaoComponent from "@/src/components/formacao-component";
import Input from "@/src/components/input-component";
import { GlobalStyles } from "@/src/components/style";
import { router } from "expo-router";
import { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Indicador de progresso (As 4 etapas)
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
            {/* Linha entre as etapas */}
            {etapa > 1 && (
              <View style={{
                width: 24,
                height: 2,
                backgroundColor: etapa <= etapaAtual ? '#fff' : 'rgba(255,255,255,0.3)',
                marginRight: 8,
              }} />
            )}
            {/* Círculo da etapa */}
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
  )
}

function handleProximo(){
  router.push("/dispo")
}

export default function Formacao() {
  const [formacoes, setFormacoes] = useState([{ id: 1 }]);
  const [area, setArea] = useState('');

  function adicionarFormacao() {
    setFormacoes([...formacoes, { id: formacoes.length + 1 }]);
  }

  function removerFormacao(id: number) {
    if (formacoes.length === 1) return; // mínimo 1
    setFormacoes(formacoes.filter(f => f.id !== id));
  }

  return (
    <View style={[GlobalStyles.fundoazullogin, { paddingTop: 20 }]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>

        <Image
                  source={require("../../assets/images/robofdpnopc.png")}
                  style={{
                    width: 200,
                    height: 150,
                    resizeMode: "contain",
                    marginTop: 20,
                  }}
                />
        
                <Text style={GlobalStyles.titulo}>Me conte mais sobre você</Text>
                <Text style={[GlobalStyles.subtitulo]}>
                  Etapa 2 de 4 — Formação
                </Text>
        
                <ProgressIndicator etapaAtual={2} />

        <Text style={[GlobalStyles.subtitulo, {marginTop:0}]}>Área</Text>
        <Input 
          placeholder="Área" 
          placeholderTextColor={"#777"}
          value={area}
          onChangeText={setArea}>
        </Input>

        {formacoes.map((f, index) => (
          <FormacaoComponent
            key={f.id}
            numero={index + 1}
            onRemover={() => removerFormacao(f.id)}
            podeRemover={formacoes.length > 1}
          />
        ))}

        {/* Botão para adicionar nova formação */}
        <TouchableOpacity onPress={adicionarFormacao} style={styles.botaoAdicionar}>
          <Text style={styles.botaoTexto}>+ Adicionar formação</Text>
        </TouchableOpacity>

          {/* Botão Próximo */}
          <ButtonConfirm text="Próximo" onPress={handleProximo} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  botaoAdicionar: {
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderStyle: 'dashed',
  },
  botaoTexto: { color: '#fff', fontSize: 16 }
});