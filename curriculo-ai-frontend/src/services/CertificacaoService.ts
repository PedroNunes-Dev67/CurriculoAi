import { API_URL } from "../config/app";
import { CertificacaoDtoRequest } from "../types/curriculo-completo";
import { pegarTokenIdent } from "./AuthService";

export async function salvarCertificacoes(
  certificacoes: CertificacaoDtoRequest[],
) {
  if (certificacoes.length === 0) return;

  const tokenUsuario = await pegarTokenIdent();

  const response = await fetch(
    `${API_URL}/certificacao/register?token=${tokenUsuario}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(certificacoes),
    },
  );

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.message || "Erro ao cadastrar experiência");
  }

  return await response.json();
}
