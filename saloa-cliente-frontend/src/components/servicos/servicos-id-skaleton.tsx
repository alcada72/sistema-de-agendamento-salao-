"use client";
import {
  faBook,
  faChevronLeft,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export const ServiceIdSkaleton = () => {
  const Router = useRouter();
  return (
    <>
      <section
        className=" z-50 top-0  flex bg-neutral-400/20 
                backdrop-blur-[3px] border-b border-b-neutral-200/20 
                items-center justify-between px-2 py-2 w-full"
      >
        <button className="rounded-full p-1 bg" onClick={() => Router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} className="size-6 font-bold" />
        </button>
        <span
          className="text-center font-medium text-xl 
                  overflow-hidden whitespace-nowrap text-ellipsis w-[70%] "
        >
          Detalhes
        </span>
        <nav>
          <span className="rounded-full size-6 bg p-1 mr-2 bg cursor-pointer">
            <FontAwesomeIcon
              icon={faBook}
              className={`size-6  "text-red-800"}`}
            />
          </span>
          <span className="rounded-full size-6 bg p-1">
            <FontAwesomeIcon icon={faShare} className={"size-6"} />
          </span>
        </nav>
      </section>
      <div className="flex flex-col gap-2 p-6 border-b border-gray-700 animate-pulse">
        <div className="flex flex-col items-center gap-3 justify-between">
          <div className="size-12 rounded-full bg-gray-600"></div>
          <div className="h-[85%] border-[1px] border-gray-700 rounded-full"></div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-x-3">
            <div className="h-5 w-32 bg-gray-600 rounded"></div>
            <div className="h-3 w-24 bg-gray-500 rounded"></div>
          </div>
          <div className="py-4">
            <div className="h-5 w-full bg-gray-600 rounded mb-2"></div>
            <div className="h-5 w-3/4 bg-gray-600 rounded"></div>
          </div>
          <div className="w-full">
            <div className="w-full h-52 bg-gray-700 rounded-2xl"></div>
          </div>
          <div className="flex justify-between items-center w-full mt-6 text-gray-500">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1">
                <div className="size-6 bg-gray-500 rounded"></div>
                <div className="h-4 w-6 bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1">
                <div className="size-6 bg-gray-500 rounded"></div>
                <div className="h-4 w-6 bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1">
                <div className="size-6 bg-gray-500 rounded"></div>
                <div className="h-4 w-6 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
