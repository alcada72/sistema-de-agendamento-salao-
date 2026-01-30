export function formatDuration(duration: number): string {
  if (duration < 60) {
    return `${duration} min`;
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (minutes === 0) {
    return hours === 1 ? "1 hora" : `${hours} horas`;
  }

  return `${hours}h ${minutes}min`;
}
