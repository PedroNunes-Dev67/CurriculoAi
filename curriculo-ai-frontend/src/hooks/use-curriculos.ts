import { useCallback, useEffect, useState } from "react";
import { fetchCurriculosDoUsuario } from "../services/curriculo-service";
import { Curriculo } from "../types/curriculo";

type UseCurriculosOptions = {
  userId?: string;
  autoFetch?: boolean;
};

export function useCurriculos({ userId, autoFetch = true }: UseCurriculosOptions = {}) {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const carregarCurriculos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchCurriculosDoUsuario({ userId });
      setCurriculos(result.data);
    } catch {
      setError("Não foi possível carregar seus currículos.");
      setCurriculos([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);

    try {
      const result = await fetchCurriculosDoUsuario({ userId });
      setCurriculos(result.data);
    } catch {
      setError("Não foi possível atualizar seus currículos.");
    } finally {
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    if (autoFetch) {
      carregarCurriculos();
    }
  }, [autoFetch, carregarCurriculos]);

  return {
    curriculos,
    loading,
    error,
    refreshing,
    carregarCurriculos,
    refresh,
  };
}
