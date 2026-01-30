"use client";
import {
  faEye,
  faEyeSlash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEvent, useState } from "react";

type Props =  {
  placeholder: string;
  value?: string;
  filled?: boolean;
  icon?: IconDefinition;
  password?: boolean;
  onChange?: (newValue: string) => void;
  onEnter?: () => void;
};

export const Input = ({
  placeholder,
  password = false,
  value = "",
  filled = false,
  icon,
  onChange,
  onEnter,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === "enter") {
      onEnter?.();
    }
  };

  return (
    <div
      className={`borda flex items-center h-14 rounded-2xl border-2 transition-colors ${
        filled ? "bg-gray-700 border-gray-700" : "border-gray-700"
      } `}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} className="ml-4 size-6 text-gray-900" />
      )}
      <input
        type={password && !showPassword ? "password" : "text"}
        className="flex-1 color outline-none bg-transparent h-full px-4  placeholder-gray-400 "
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      {password && (
        <FontAwesomeIcon
          onClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? faEye : faEyeSlash}
          className="cursor-pointer mr-4 size-6 text-gray-500"
        />
      )}
    </div>
  );
};
