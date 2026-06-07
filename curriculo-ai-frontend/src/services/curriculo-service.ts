import {
  Curriculo,
  FetchCurriculosParams,
  FetchCurriculosResult,
} from "../types/curriculo";

/**
 * Busca os currículos do usuário.
 *
 * TODO: substituir mock por chamada real ao backend.
 * Exemplo:
 *   const response = await fetch(`${API_URL}/users/${params.userId}/curriculos`);
 *   return response.json();
 */
export async function fetchCurriculosDoUsuario(
  params: FetchCurriculosParams = {}
): Promise<FetchCurriculosResult> {
  await simulateNetworkDelay();

  const mockData: Curriculo[] = [
    {
      id: "1",
      titulo: "Desenvolvedor Frontend",
      subtitulo: "Atualizado há 2 dias",
      status: "Completo",
      atualizadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      titulo: "Analista de Dados",
      subtitulo: "Atualizado há 4 dias",
      status: "Completo",
      atualizadoEm: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      titulo: "Product Designer",
      subtitulo: "Em edição",
      status: "Rascunho",
      atualizadoEm: new Date().toISOString(),
    },
  ];

  if (params.userId) {
    // reservado para filtrar por usuário quando o backend estiver pronto
  }

  return {
    data: mockData,
    total: mockData.length,
  };
}

function simulateNetworkDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
