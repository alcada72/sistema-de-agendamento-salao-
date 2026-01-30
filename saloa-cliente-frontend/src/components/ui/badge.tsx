interface BadgeProps {
  text: string;
  color?: "green" | "yellow" | "red";
}

export function Badge({ text, color = "green" }: BadgeProps) {
  const colors = {
    green: "border-green-400  text-green-400",
    yellow: "border-yellow-400 text-yellow-400",
    red: "border-red-700 text-red-700",
  };

  return (
    <span
      className={`px-2 border-2 bg-transparent py-1 
      rounded-full text-center text-sm font-semibold ${colors[color]}`}
    >
      {text}
    </span>
  );
}
