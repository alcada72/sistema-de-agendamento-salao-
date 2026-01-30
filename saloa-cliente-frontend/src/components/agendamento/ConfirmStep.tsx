interface Props {
  date: Date
  time: string
  onConfirm: () => void
}

export function ConfirmStep({ date, time, onConfirm }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Confirmar agendamento</h2>
      <p className="mb-2">📅 {date.toLocaleDateString()}</p>
      <p className="mb-4">⏰ {time}</p>

      <button
        onClick={onConfirm}
        className="w-full vbg text-white py-3 rounded-lg"
      >
        Confirmar
      </button>
    </div>
  )
}