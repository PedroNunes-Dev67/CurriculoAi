import React from "react";
import { Image, Text, View } from "react-native";
import { GlobalStyles } from "../../components/style";

export default function Cadastro() {
    return (
      <View style={GlobalStyles.fundoazullogin}>
        <Image
          source={require("../../assets/images/robofdpnopc.png")}
          style={{ width: 300, height: 300, resizeMode: "contain", marginTop: -20 }}>
        </Image>
        <Text style={GlobalStyles.titulo}>Otima sua iniciativa!</Text>
        <Text style={GlobalStyles.subtitulo}>Vamos realizar uma breve análise</Text>
        <Text style={GlobalStyles.subtitulo}>Sobre seu perfil</Text>
      </View>
    );
};
