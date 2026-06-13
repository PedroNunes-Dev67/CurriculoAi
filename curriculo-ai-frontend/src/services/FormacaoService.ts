import { FormacaoData } from "../components/formacao-component";
import { API_URL } from "../config/app";
import { pegarTokenIdent } from "./AuthService";

export async function salvarFormacoes(formacoes: FormacaoData[]) {
  if (formacoes.length === 0) return;

  const tokenUsuario = await pegarTokenIdent();

  const formacoesFormatadas = formacoes.map((f) => ({
    id_curso: Number(f.curso),
    tipoFormacao: f.tipoFormacao,
    dataInicio: f.dataInicio ? f.dataInicio.toISOString().split("T")[0] : null,
    dataConclusao: f.dataConclusao
      ? f.dataConclusao.toISOString().split("T")[0]
      : null,
    emAndamento: f.emAndamento,
  }));

  const response = await fetch(
    `${API_URL}/formacao/add?token=${tokenUsuario}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formacoesFormatadas),
    },
  );

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.message || "Erro ao cadastrar usuário");
  }

  return await response.json();
}
