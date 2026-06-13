import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarTokenJWT(token: string) {
  await AsyncStorage.setItem("TOKEN", token);
}

export async function pegarTokenJWT() {
  return await AsyncStorage.getItem("TOKEN");
}

export async function removerTokenJWT() {
  await AsyncStorage.removeItem("TOKEN");
}

export async function salvarTokenIdent(token: string) {
  await AsyncStorage.setItem("TokenIdent", token);
}

export async function pegarTokenIdent() {
  return await AsyncStorage.getItem("TokenIdent");
}

export async function removerTokenIdent() {
  await AsyncStorage.removeItem("TokenIdent");
}
