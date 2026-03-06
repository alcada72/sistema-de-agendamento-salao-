export const formatCountMax = (value: number, max: number) => {
  return value > max ? `${max}+` : value
}
