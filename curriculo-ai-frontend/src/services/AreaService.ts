import { API_URL } from "../config/app";
import { pegarTokenIdent } from "./AuthService";

export async function salvarArea(area: number | string) {
  const tokenUsuario = await pegarTokenIdent();
  const idAreaFormata = Number(area);

  const response = await fetch(`${API_URL}/area/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokenIdentificacaoUsuario: tokenUsuario,
      idArea: idAreaFormata,
    }),
  });

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.message || "Erro ao cadastrar área do usuário");
  }

  return await response.json();
}
