"use client";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  noFixed?: boolean;
  hiddenBack?: boolean;
};

export const GeneralHeader = ({ children, noFixed, hiddenBack: showBack }: Props) => {
  const router = useRouter();

  return (
    <header
      className={`flex gap-4 items-center pt-3 pb-3 p-6 px-3 lg:px-6 
     ${
       !noFixed ? "sticky" : "relative"
     }  md:relative z-30 top-0 bg-neutral-300/20 w-full 
      backdrop-blur-[4px] border-b border-b-neutral-200/30 `}
    >
      {!showBack && (
        <button
          onClick={() => router.back()}
          className="flex justify-center
        cursor-pointer items-center border-2 iconborda size-10 rounded-full"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="size-6 iconcolor" />
        </button>
      )}
      <div className="flex-1">{children}</div>
    </header>
  );
};
