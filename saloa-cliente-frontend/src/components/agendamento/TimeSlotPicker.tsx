interface Props {
  date: Date;
  onSelect: (time: string) => void;
}

export function TimeSlotPicker({ onSelect }: Props) {
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Escolha o horário</h2>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className="p-3 border rounded-lg font-bold hover:bg-black hover:text-white"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
