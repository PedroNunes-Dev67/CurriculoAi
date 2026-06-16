import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { API_URL } from "../config/app";
import { pegarTokenJWT } from "./AuthService";

export async function gerarCurriculo() {
  const token = await pegarTokenJWT();

  // 1. Faz o POST e recebe o PDF como base64
  const response = await fetch(`${API_URL}/api/gerar/pdf`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao gerar currículo: status ${response.status}`);
  }

  // 2. Converte para base64
  const blob = await response.blob();
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(",")[1]); // remove o prefixo "data:application/pdf;base64,"
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  // 3. Salva no sistema de arquivos
  const fileUri = FileSystem.documentDirectory + "curriculo.pdf";
  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // 4. Compartilha
  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw new Error("Compartilhamento não disponível neste dispositivo");
  }

  await Sharing.shareAsync(fileUri, {
    mimeType: "application/pdf",
    dialogTitle: "Salvar ou compartilhar currículo",
    UTI: "com.adobe.pdf",
  });
}
