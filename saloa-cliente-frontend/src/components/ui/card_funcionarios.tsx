import { User } from "@/types/user";

interface Props {
  user: User;

}
export default function CardFuncionario({ user }: Props)  {
  const cover = user?.image;
  return (
    <div className="flex justify-center min-w-50 gap-1 items-center">
      <div className="rounded-full overflow-hidden size-10 min-w-10">
        <img
          src={cover}
          alt={user?.nome}
          loading="lazy"
          draggable="false"
          className="object-cover size-full bg-neutral-400/30"
        />
      </div>
      <div className="flex-1 w-full flex flex-col overflow-hidden">
        <span className="text-sm truncate block font-bold max-w-10s/11">
          {user?.nome}
        </span>
        <span className="text-sm truncate block max-w-11/12"> {user?.email} </span>
      </div>
    </div>
  );
}
