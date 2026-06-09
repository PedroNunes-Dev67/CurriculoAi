import React, { createContext, useContext, useMemo, useState } from "react";
import {
  CertificacaoEntry,
  CurriculoCompletoData,
  DadosPessoais,
  DisponibilidadeData,
  ExperienciaEntry,
  FormacaoEntry,
} from "../types/curriculo-completo";

type CurriculoDataContextValue = {
  data: CurriculoCompletoData;
  updateDadosPessoais: (dados: DadosPessoais) => void;
  updateFormacao: (areaAtuacao: string, formacoes: FormacaoEntry[]) => void;
  updateExperiencias: (experiencias: ExperienciaEntry[]) => void;
  updateCertificacoes: (certificacoes: CertificacaoEntry[]) => void;
  updateDisponibilidade: (disponibilidade: DisponibilidadeData) => void;
  resetCurriculoData: () => void;
  hasCurriculoData: () => boolean;
  getNomeCompleto: () => string;
};

const defaultData: CurriculoCompletoData = {
  dadosPessoais: null,
  areaAtuacao: "",
  formacoes: [],
  experiencias: [],
  certificacoes: [],
  disponibilidade: null,
};

const CurriculoDataContext = createContext<CurriculoDataContextValue | null>(null);

export function CurriculoDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CurriculoCompletoData>(defaultData);

  const value = useMemo<CurriculoDataContextValue>(
    () => ({
      data,
      updateDadosPessoais: (dados) =>
        setData((prev) => ({ ...prev, dadosPessoais: dados })),
      updateFormacao: (areaAtuacao, formacoes) =>
        setData((prev) => ({ ...prev, areaAtuacao, formacoes })),
      updateExperiencias: (experiencias) =>
        setData((prev) => ({ ...prev, experiencias })),
      updateCertificacoes: (certificacoes) =>
        setData((prev) => ({ ...prev, certificacoes })),
      updateDisponibilidade: (disponibilidade) =>
        setData((prev) => ({ ...prev, disponibilidade })),
      resetCurriculoData: () => setData(defaultData),
      hasCurriculoData: () =>
        Boolean(
          data.dadosPessoais?.nome ||
            data.areaAtuacao ||
            data.formacoes.length ||
            data.experiencias.length ||
            data.certificacoes.length ||
            data.disponibilidade
        ),
      getNomeCompleto: () => {
        if (!data.dadosPessoais) return "";
        return `${data.dadosPessoais.nome} ${data.dadosPessoais.sobrenome}`.trim();
      },
    }),
    [data]
  );

  return (
    <CurriculoDataContext.Provider value={value}>{children}</CurriculoDataContext.Provider>
  );
}

export function useCurriculoData() {
  const ctx = useContext(CurriculoDataContext);
  if (!ctx) {
    throw new Error("useCurriculoData deve ser usado dentro de CurriculoDataProvider");
  }
  return ctx;
}
