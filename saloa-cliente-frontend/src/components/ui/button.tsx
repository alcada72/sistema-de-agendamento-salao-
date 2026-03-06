type Props = {
  label: String;
  vbg?: boolean;

  onClick?: () => void;
  size: 1 | 2 | 3;
  disabled?: boolean;
  uppercase?: boolean;
};

export const Button = ({
  label,
  size,
  disabled,
  onClick,
  uppercase,
  vbg,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${!vbg ? "vbg" : "bg"}  flex justify-center items-center  cursor-pointer font-semibold  rounded-2xl hover:opacity-90 ${uppercase && "uppercase"} 
        ${size === 1 && "h-13 text-lg"}
        ${size === 2 && "h-10 w-32 text-md"}
        ${size === 3 && "h-8 text-xs"}
        
        ${disabled && "pointer-events-none opacity-50 bg-transparent border-gray-500/50 text-gray-500/50"}`}
    >
      {disabled ? <div className="size-5 animate-spin  bg-transparent rounded-full
      border-blue-500  border-4 border-l-transparent " >

      </div> : label}
    </div>
  );
};
