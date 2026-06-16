import { API_URL } from "../config/app";
import { pegarTokenIdent } from "./AuthService";

type DisponibilidadeDtoRequest = {
  disponibilidadeInicio: string;
  modeloTrabalho: string;
};

export async function salvarDisponibilidade(
  disponibilidade: DisponibilidadeDtoRequest,
) {
  const tokenUsuario = await pegarTokenIdent();

  const response = await fetch(
    `${API_URL}/disponibilidade/register?token=${tokenUsuario}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(disponibilidade),
    },
  );

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao cadastrar disponibilidade");
  }

  return await response.json();
}
