import { SubheaderSkeleton } from "@/components/home/sub-header";
import { getUserMeServiceServerAdmin } from "@/services/admin/server/user.service";
import Link from "next/link";

export const NavUserInfoAdmin = async () => {
  const user = await getUserMeServiceServerAdmin();

  if (!user) {
    return <SubheaderSkeleton />;
  }

  return (
    <div className="flex items-center">
      <div className="size-10 mr-2 rounded-full overflow-hidden">
        <Link href="/admin/profile">
          <img
            src={user.image}
            alt={user.nome}
            className="size-full object-cover"
            crossOrigin="anonymous"
          />
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <Link className="block truncate" href="/profile">
          {user.nome}
        </Link>
        <div className="truncate text-sm text-gray-400">{user.email}</div>
      </div>
    </div>
  );
};
