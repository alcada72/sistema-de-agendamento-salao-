export const Today = () => {
  const hoje = new Date()

  const opcoes: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }

  const formato: string = new Intl.DateTimeFormat('pt-AO', opcoes).format(hoje)
  const formatado: string = formato.charAt(0).toUpperCase() + formato.slice(1)
  return formatado.replace("-feira","")
}