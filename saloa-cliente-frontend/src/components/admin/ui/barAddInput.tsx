"use client";
import { Button } from "@/components/ui/button";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  value?: string;
  title?: string;
  placeholder?: string;
  onAdd?: () => void;
  icon?: IconDefinition;
  onChange?: (newValue: string) => void;
};
export default function BarAddInput({
  title,
  onAdd,
  icon,
  onChange,
  placeholder,
  value,
}: Props) {
  return (
    <div className="p-2 flex items-center justify-between w-full">
      <div
        className={`borda flex items-center h-10 w-1/3 rounded-2xl border-1 transition-colors ${"bg-gray-700 border-gray-700"} `}
      >
        {icon && (
          <FontAwesomeIcon icon={icon} className="ml-4 size-6 text-gray-900" />
        )}
        <input
          type={"search"}
          className="flex-1 text-white outline-none bg-transparent h-full px-4  placeholder-gray-400 "
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>

      <span className="text-2xl font-semibold flex-1 text-center">
        {title}
      </span>

      <div className="h-10 w-40">
        <Button label={"+ Criar serviço"} size={3} onClick={onAdd} />
      </div>
    </div>
  );
}
