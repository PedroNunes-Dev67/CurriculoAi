import { API_URL } from "../config/app";
import { pegarTokenIdent } from "./AuthService";

type IdiomaUserDtoRequest = {
  id_idioma: number;
  nivel: string;
};

export async function salvarIdiomas(idiomas: IdiomaUserDtoRequest[]) {
  const tokenUsuario = await pegarTokenIdent();

  const response = await fetch(
    `${API_URL}/idiomas/user/register?token=${tokenUsuario}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idiomas),
    },
  );

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao cadastrar idiomas");
  }

  return await response.json();
}
