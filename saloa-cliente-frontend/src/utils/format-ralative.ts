export const formatRelativeTime = (input: string | Date) => {
  const date = new Date(input);

  if (isNaN(date.getTime())) return "Data inválida";
  const now = new Date();
  const diffInMilliseconds = date.getTime() - now.getTime();

  type Unit = {
    unit: Intl.RelativeTimeFormatUnit;
    milliseconds: number;
  };

  const units: Unit[] = [
    { unit: "year", milliseconds: 1000 * 60 * 60 * 24 * 365 },
    { unit: "month", milliseconds: 1000 * 60 * 60 * 24 * 30 },
    { unit: "day", milliseconds: 1000 * 60 * 60 * 24 },
    { unit: "hour", milliseconds: 1000 * 60 * 60 },
    { unit: "minute", milliseconds: 1000 * 60 },
    { unit: "second", milliseconds: 1000 },
  ];

  for (const { unit, milliseconds } of units) {
    const difference = diffInMilliseconds / milliseconds;
    if (Math.abs(difference) >= 1) {
      const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
      return rtf.format(Math.round(difference), unit).charAt(0).toUpperCase()
        + rtf.format(Math.round(difference), unit).slice(1);
    }
  }

  return "agora";
};

export function formatHour(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[1].replace(":00.000Z", " Horas");
}
