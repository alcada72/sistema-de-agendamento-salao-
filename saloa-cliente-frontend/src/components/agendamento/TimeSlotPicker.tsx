interface Props {
  date: Date;
  onSelect: (time: string) => void;
}

export function TimeSlotPicker({ onSelect }: Props) {
  const slots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

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
