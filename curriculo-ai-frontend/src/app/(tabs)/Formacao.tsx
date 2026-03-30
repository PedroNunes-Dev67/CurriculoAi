import { GlobalStyles } from "@/src/components/style";
import { View, Image, Text } from "react-native";

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

export default function Formacao(){
    return(
        <View style={[GlobalStyles.fundoazullogin, {paddingTop:100}]}>
            <Image source={require("../../assets/images/robofdpnopc.png")}
                    style={{
                      width: 200,
                      height: 150,
                      resizeMode: "contain",
                      marginTop: 20,
                    }}></Image>
                  <Text style={GlobalStyles.titulo}>Me conte mais sobre você</Text>
                  <Text style={[GlobalStyles.subtitulo, {fontSize: 16, margin:0}]}>Etapa 2 de 4 — Formação</Text>
            
                  {/* Indicador de progresso */}
                  <ProgressIndicator etapaAtual={2} />
        </View>
    )
}