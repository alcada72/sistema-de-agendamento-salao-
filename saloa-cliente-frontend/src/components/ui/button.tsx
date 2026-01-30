type Props = {
  label: String;
  onClick?: () => void;
  size: 1 | 2 | 3;
  disabled?: boolean;
  uppercase?: boolean;
};

export const Button = ({ label, size, disabled, onClick,uppercase }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`vbg flex justify-center items-center  cursor-pointer font-bold  rounded-2xl hover:opacity-90 ${uppercase && 'uppercase'} 
        ${size === 1 && "h-13 text-lg"}
        ${size === 2 && "h-10 w-32 text-md"}
        ${size === 3 && "h-8 text-xs"}
        
        ${disabled && "pointer-envents-none opacity-50"}`}
    >
      {label}
    </div>
  );
};
