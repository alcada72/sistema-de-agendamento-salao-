type Props = {
  closeAction?: () => void;
  message: string;
  mostraractions?: boolean;
};

export const AwaitingModal = ({
  closeAction,
  message,
  mostraractions,
}: Props) => {
  return (
    <div className=" w-full h-full overflow-hidden bg-black/80 backdrop-blur-[2px] fixed inset-0 pointer-envents-none flex justify-center items-center">
      <div className="w-50 h-50 md:size-72 bg-gray-900 relative rounded-lg flex flex-col gap-4 overflow-hidden  justify-center items-center">
        {mostraractions ? (
          <button
            className="bg-none hover:text-red-800 absolute top-4 right-4  font-bold text-lg cursor-pointer"
            type="button"
            onClick={closeAction}
          >
            X
          </button>
        ) : (
          <div className="border-white w-20 h-20 bg-transparent rounded-full  animate-spin  border-5 border-r-gray-700"></div>
        )}
        <div className="text-gray-500 text-xl text-center max-w-49 md:max-w-64 block truncate">
          {message}
        </div>
      </div>
    </div>
  );
};
