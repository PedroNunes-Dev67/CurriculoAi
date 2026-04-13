import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../components/style";

export default function Etapa4() {
  return (
    <View style={[GlobalStyles.fundoazullogin, styles.container]}>
      <Text style={GlobalStyles.titulo}>Disponibilidade e Idiomas</Text>
      <Text style={GlobalStyles.subtitulo}>Etapa 4 de 4</Text>

      <View style={styles.card}>
        <Text style={styles.texto}>
          Teste de Navegação
        </Text>
        <Text style={styles.texto}>
          Cuidado!
        </Text>
        <Text style={styles.texto}>
          O gago é charmoso e perigoso
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.push("/experiencia")}
      >
        <Text style={styles.botaoTexto}>← Voltar para Etapa 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  texto: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  botaoVoltar: {
    marginTop: 40,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
