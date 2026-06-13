import { API_URL } from "../config/app";
import { UsuarioCadastro } from "../types/UsuarioCadastro";

export async function cadastrarUsuario(usuarioCadastro: UsuarioCadastro) {
  const response = await fetch(`${API_URL}/usuario/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioCadastro),
  });

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.message || "Erro ao cadastrar usuário");
  }

  return await response.json();
}
