import { router } from 'expo-router';
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ButtonConfirm from "../../components/button-confirm-compent";
import { Input } from "../../components/input-component";
import { GlobalStyles } from "../../components/style";

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
  );
}

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function handleProximo() {
  if (!nome.trim()) {
    Alert.alert("Erro", "Digite seu nome!");
    return;
  }

  if (!sobrenome.trim()) {
    Alert.alert("Erro", "Digite seu sobrenome!");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    Alert.alert("Erro", "Email inválido!");
    return;
  }

  if (!senha.trim()) {
    Alert.alert("Erro", "Digite uma senha!");
    return;
  }

  if (senha.length < 6) {
    Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres!");
    return;
  }

  if (senha !== confirmarSenha) {
    Alert.alert("Erro", "As senhas não são iguais!");
    return;
  }

  router.push('/Formacao');
}

  function handleVoltarLogin() {
    router.navigate('/Login');
  }

  return (
    <ScrollView style={{backgroundColor:'#000c26'}} contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
      <Image source={require("../../assets/images/robofdpnopc.png")}
        style={{
          width: 200,
          height: 150,
          resizeMode: "contain",
          marginTop:50
        }}></Image>
      <Text style={GlobalStyles.titulo}>Ótima iniciativa!</Text>
      <Text style={[GlobalStyles.subtitulo, {textAlign: 'center', width:380, fontSize:16}]}>Vamos realizar uma breve análise sobre seu perfil</Text>
      <Text style={[GlobalStyles.subtitulo, {fontSize: 16, margin:0}]}>Etapa 1 de 4 — Dados pessoais</Text>

      {/* Indicador de progresso */}
      <ProgressIndicator etapaAtual={1} />

      {/* Formulário */}
      <Input
        placeholder="Nome"
        placeholderTextColor={'#777'}
        keyboardType={'default'}
        autoCapitalize={'words'}
        value={nome}
        onChangeText={setNome}
      />
      <Input
        placeholder="Sobrenome"
        placeholderTextColor={'#777'}
        keyboardType={'default'}
        autoCapitalize={'words'}
        value={sobrenome}
        onChangeText={setSobrenome}
      />
      <Input
        icone={'email'}
        placeholder="Digite seu email"
        placeholderTextColor={'#777'}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        icone={'lock'}
        placeholder="Digite sua senha"
        placeholderTextColor={'#777'}
        keyboardType={'default'}
        autoCapitalize={'none'}
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <Input
        icone={'lock'} 
        placeholder="Confirme sua senha"
        placeholderTextColor={'#777'}
        keyboardType={'default'}
        autoCapitalize={'none'}
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {/* Botão Próximo */}
      <ButtonConfirm text="Próximo" onPress={handleProximo} />
    </ScrollView>
  );
}
