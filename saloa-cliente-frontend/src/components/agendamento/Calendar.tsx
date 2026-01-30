interface Props {
  selected: Date | null
  onSelect: (date: Date) => void
}

export function Calendar({ selected, onSelect }: Props) {
  const days = Array.from({ length: 8 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Escolha a data</h2>
      <div className="grid grid-cols-4 gap-2">
        {days.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onSelect(day)}
            className={`p-3 rounded-lg border text-sm font-bold ${
              selected?.toDateString() === day.toDateString()
                ? 'bg-black text-white'
                : ''
            }`}
          >
            {day.getDate()}/{day.getMonth() + 1}
          </button>
        ))}
      </div>
    </div>
  )
}