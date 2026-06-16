export type DadosPessoais = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
};

export type FormacaoEntry = {
  curso: string;
  tipoFormacao: string;
  dataInicio: string | null;
  dataConclusao: string | null;
  emAndamento: boolean;
};

export type ExperienciaEntry = {
  cargo: string;
  empresa: string;
  inicio: string | null;
  termino: string | null;
  atual: boolean;
  area: string;
};

export type ExperienciaDtoRequest = {
  id_area: number;
  id_empresa: number;
  dataInicio: string | null;
  cargo: string;
  dataFim: string | null;
  trabalhoAtual: boolean;
};

export type CertificacaoEntry = {
  nome: string;
  instituicao: string;
  dataConclusao: string | null;
};

export type CertificacaoDtoRequest = {
  nomeCertificacao: string;
  id_instituicao: number;
  dataConclusao: string | null;
  certificado: number[] | null;
};

export type IdiomaEntry = {
  nome: string;
  nivel: number;
};

export type DisponibilidadeData = {
  inicioImediato: boolean;
  dataDisponibilidade: string | null;
  modalidade: string;
  idiomas: IdiomaEntry[];
};

export type CurriculoCompletoData = {
  dadosPessoais: DadosPessoais | null;
  areaAtuacao: string;
  formacoes: FormacaoEntry[];
  experiencias: ExperienciaEntry[];
  certificacoes: CertificacaoEntry[];
  disponibilidade: DisponibilidadeData | null;
};
