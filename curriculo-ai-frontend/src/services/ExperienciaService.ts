import { API_URL } from "../config/app";
import { ExperienciaDtoRequest } from "../types/curriculo-completo";
import { pegarTokenIdent } from "./AuthService";

export async function salvarExperiencias(
  experiencias: ExperienciaDtoRequest[],
) {
  if (experiencias.length === 0) return;

  const tokenUsuario = await pegarTokenIdent();

  const response = await fetch(
    `${API_URL}/experiencia/register?token=${tokenUsuario}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experiencias),
    },
  );

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.message || "Erro ao cadastrar experiência");
  }

  return await response.json();
}
