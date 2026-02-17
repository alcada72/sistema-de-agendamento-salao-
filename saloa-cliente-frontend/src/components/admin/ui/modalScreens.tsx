type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalScreens({ children, onClose }: Props) {
  return (
    <div
      className={`
      fixed inset-0   bg-black/40 
          backdrop-blur-[2px] flex flex-col items-center justify-center z-40 size-full overflow-x-auto
      `}
    >
      <div className="max-w-10/12 w-full my-3">
        <div
          onClick={onClose}
          className="size-8 rounded-full bg-gray-600 flex items-center justify-center"
        >
          X
        </div>
      </div>
      <div className="max-w-10/12 vbg p-5 size-10/12 rounded"> {children} </div>
    </div>
  );
}
