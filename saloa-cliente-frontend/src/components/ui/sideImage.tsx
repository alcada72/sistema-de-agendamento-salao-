"use client";
import Image from "next/image";

type Props = {
  image?: string;
  size?: number;
};
export default function ImageRigth({ image, size }: Props) {
  return (
    <div className="hidden lg:flex max-w-[40%] h-full  items-center justify-center">
      {image ? (
        <Image
          src={image}
          width={size ? size : 500}
          height={size ? size : 500}
          quality={100}
          alt={"logo"}
          style={{ width: 800, height:800 }}
          
        />
      ) : (
        <h1 className="text-white text-4xl font-bold max-w-md text-center">
          Bem-vindo à nossa plataforma 🚀
        </h1>
      )}
    </div>
  );
}
