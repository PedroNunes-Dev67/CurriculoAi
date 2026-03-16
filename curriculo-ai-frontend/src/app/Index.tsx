import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TextInput, View , Button, TouchableOpacity} from "react-native";
import { GlobalStyles } from "../components/style";
import { Input } from "../components/input-component";
import ButtonConfirm from "../components/button-confirm-compent";

export default function Login() {
  return (
    <View style={GlobalStyles.fundoazullogin}>
      <Image
        source={require("../assets/images/robofdp.png")}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          marginTop: -20,
        }}
      ></Image>
      <Text style={GlobalStyles.titulo}>Que bom ter você aqui!</Text>
      <Text style={GlobalStyles.subtitulo}>Entre com sua conta</Text>

      <Input icone={'email'} placeholder="Digite seu email" placeholderTextColor={'#777'} keyboardType={'email-address'} autoCapitalize={'none'}></Input>
      <Input icone={'lock'} placeholder="Digite sua senha" placeholderTextColor={"#777"} keyboardType={"default"} autoCapitalize={"none"} secureTextEntry={true}></Input>

      <ButtonConfirm text="Entrar"></ButtonConfirm>
    </View>
  );
}
