export function formatDateBR(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
}

export function formatPeriodo(
  inicio: string | Date | null,
  termino: string | Date | null,
  atual = false
): string {
  const inicioFmt = formatDateBR(inicio);
  if (atual) return `${inicioFmt} — Atual`;
  const terminoFmt = formatDateBR(termino);
  return `${inicioFmt} — ${terminoFmt}`;
}

export function dateToIso(value: Date | null): string | null {
  if (!value) return null;
  return value.toISOString();
}
