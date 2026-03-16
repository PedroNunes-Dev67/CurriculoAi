import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {useState} from "react";
import { Image, Text, TextInput, View , Button, TouchableOpacity} from "react-native";
import { GlobalStyles } from "../components/style";
import { Input } from "../components/input-component";
import ButtonConfirm from "../components/button-confirm-compent";

export default function Login() {

  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');

  function testarInput(){
      console.log("Email:"+email)
      console.log("Senha:"+senha)
  }

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

      <Input 
        icone={'email'} 
        placeholder="Digite seu email" 
        placeholderTextColor={'#777'} 
        keyboardType={'email-address'} 
        autoCapitalize={'none'} 
        value={email} 
        onChangeText={setEmail}>
      </Input>
      <Input 
        icone={'lock'} 
        placeholder="Digite sua senha" 
        placeholderTextColor={"#777"} 
        keyboardType={"default"} 
        autoCapitalize={"none"} 
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}>
      </Input>
      <ButtonConfirm text="Entrar" onPress={testarInput}></ButtonConfirm>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
  <View style={{ flex: 1, height: 1, backgroundColor: '#ffffff40', marginLeft: 40 }} />
  <Text style={{ color: '#fff', marginHorizontal: 20 }}>ou</Text>
  <View style={{ flex: 1, height: 1, backgroundColor: '#ffffff40', marginRight: 40  }} />
</View>
<View>
  <Text style={{ color: '#fff', marginHorizontal: 20 }}>Não possui uma conta?</Text>
</View>
<TouchableOpacity style={GlobalStyles.botaoCadastro}>
  <Text style={GlobalStyles.textoBotao}>Cadastre-se</Text>
</TouchableOpacity>
    </View>
  );
}
