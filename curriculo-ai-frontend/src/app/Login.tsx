import { router } from 'expo-router';
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import ButtonConfirm from "../components/button-confirm-compent";
import Divisao from "../components/divisao-component";
import { Input } from "../components/input-component";
import { GlobalStyles } from "../components/style";

export default function Login() {

  const usuario = {email:'pedro@gmail.com', senha:'1234'}

  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');

  function testarInput(){
    if (usuario.email === email && usuario.senha === senha){
      Alert.alert('Bem vindo ao CurriculoAI')
      router.navigate('/cadastro')
    }
    else{
      Alert.alert('Error! Usuário incorreto')
    }
      
  }

  return (
    <View style={GlobalStyles.fundoazullogin}>
      <Image
        source={require("../assets/images/robofdp.png")}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          marginTop: 40,
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

      <Divisao></Divisao>

      <View>
        <Text style={{ color: '#fff', marginHorizontal: 20 }}>Não possui uma conta?</Text>
      </View>
      
      <ButtonConfirm text="Cadastre-se" onPress={() => router.push('/(tabs)/cadastro')}/>
    </View>
  );
}
