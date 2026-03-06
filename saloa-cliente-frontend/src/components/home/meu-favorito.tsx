import { getBookmarksServer } from "@/services/server/user.service";
import Link from "next/link";
import { ServiceCardMini } from "../ui/card-service-mini";

export default async function FristFavorite() {
  const favorito = await getBookmarksServer();

  if (!favorito || favorito.length === 0) {
    return null;
  }

  const frist = favorito[0];

  if (!frist) {
    return null;
  }

  return (
    <div className="w-full">
      <section className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Item da sua lista de fovoritos
        </h2>
        <Link href={"/home/favorite"}>
          <p>Ver mais</p>
        </Link>
      </section>

      <div className="flex w-full items-center gap-4 overflow-x-auto px-4 hide-scroobar">
        <ServiceCardMini mark={frist} />
      </div>
    </div>
  );
}
