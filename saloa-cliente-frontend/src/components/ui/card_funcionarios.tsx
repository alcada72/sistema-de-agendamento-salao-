
export default function CardFuncionario() {
  return (
    <div className="flex justify-center min-w-50 gap-1 items-center">
      <div className="rounded-full overflow-hidden size-10 min-w-10">
        <img
          src="/avatars/profile-1.jpg"
          alt="funcionario"
          loading="lazy"
          draggable="false"
          className="object-cover size-full bg-neutral-400/30"
        />
      </div>
      <div className="flex-1 w-full flex flex-col overflow-hidden">
        <span className="text-sm truncate block font-bold ">
          Alçada Kilundica
        </span>
        <span className="text-sm">Alçada Kilundica</span>
      </div>
    </div>
  );
}
