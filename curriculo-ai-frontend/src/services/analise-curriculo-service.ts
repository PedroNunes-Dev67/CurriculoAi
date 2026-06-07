import { AnaliseCurriculoResult } from "../types/curriculo-completo";

/**
 * Simula análise de currículo via IA.
 * TODO: substituir por chamada real ao backend com o PDF enviado.
 */
export async function analisarCurriculoPdf(
  _fileUri: string,
  _fileName: string
): Promise<AnaliseCurriculoResult> {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return {
    scoreGeral: 78,
    scoreAts: 72,
    scoreClareza: 84,
    scorePalavrasChave: 68,
    pontosFortes: [
      "Estrutura clara com seções bem definidas",
      "Experiências relevantes para a área de tecnologia",
      "Formação alinhada ao cargo desejado",
    ],
    melhorias: [
      "Adicionar mais palavras-chave da vaga alvo",
      "Quantificar resultados nas experiências (ex: % de melhoria)",
      "Incluir link do LinkedIn ou portfólio",
    ],
    resumo:
      "Seu currículo tem boa base e legibilidade. Com ajustes em palavras-chave e métricas de impacto, a taxa de aprovação em sistemas ATS pode subir significativamente.",
  };
}
