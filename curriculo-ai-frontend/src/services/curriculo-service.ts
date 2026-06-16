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
  params: FetchCurriculosParams = {},
): Promise<FetchCurriculosResult> {
  await simulateNetworkDelay();

  const mockData: Curriculo[] = [];

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
