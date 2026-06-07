export type CurriculoStatus = "Completo" | "Rascunho";

export type Curriculo = {
  id: string;
  titulo: string;
  subtitulo: string;
  status: CurriculoStatus;
  atualizadoEm: string;
};

export type FetchCurriculosParams = {
  userId?: string;
};

export type FetchCurriculosResult = {
  data: Curriculo[];
  total: number;
};
