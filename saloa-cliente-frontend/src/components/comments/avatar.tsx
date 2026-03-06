import { AvatarProps } from "@/types/comments";

export function Avatar({ src, size }: AvatarProps) {
  return (
    <div
      className={`
        ${size === 1 && " size-36 md:size-40  text-lg"}
        ${size === 2 && " size-20 text-md"}
        ${size === 3 && "size-10 text-xs"}
        size-10 rounded-full bg-gray-400
        flex items-center justify-center text-white flex-shrink-0 border-blue-700 border-2`}
    >
      <img
        src={src}
        alt="Imagem do avatar"
        crossOrigin="anonymous"
        className="size-full object-cover rounded-full"
      />
    </div>
  );
}
