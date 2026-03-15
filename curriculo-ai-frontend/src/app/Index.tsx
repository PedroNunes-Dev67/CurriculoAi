import React from "react";
import { Text, View, Image, ScrollView, TextInput } from "react-native";
import { GlobalStyles } from "../components/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {
  return (
    <View style={GlobalStyles.fundoazullogin}>
      <Image
        source={require("../assets/images/robofdp.png")}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          marginTop: -470,
        }}
      ></Image>
      <Text style={GlobalStyles.titulo}>Que bom ter você aqui!</Text>
      <Text style={GlobalStyles.subtitulo}>Entre com sua conta</Text>
      <View style={GlobalStyles.inputTS}>
        <View
          style={{
            backgroundColor: "#3498db", borderRadius: 50, padding: 8, marginRight: 10,}}
        >
          <MaterialCommunityIcons name="email" size={20} color="white" />
        </View>
        <TextInput
          style={GlobalStyles.inputTextDentro}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#777"
          keyboardType="email-address"
          autoCapitalize="none"
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputTS}>
        <View
          style={{
            backgroundColor: "#3498db", borderRadius: 50, padding: 8, marginRight: 10,}}
        >
          <MaterialCommunityIcons name="lock" size={20} color="white" />
        </View>
        <TextInput
          style={GlobalStyles.inputTextDentro}
          placeholder="Digite sua senha"
          placeholderTextColor="#777"
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
        ></TextInput>
      </View>
    </View>
  );
}
