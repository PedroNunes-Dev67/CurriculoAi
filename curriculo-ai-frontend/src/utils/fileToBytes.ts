import * as FileSystem from "expo-file-system/legacy"; // ← /legacy

export async function uriToByteArray(uri: string): Promise<number[]> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  const binary = atob(base64);
  const bytes = new Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
