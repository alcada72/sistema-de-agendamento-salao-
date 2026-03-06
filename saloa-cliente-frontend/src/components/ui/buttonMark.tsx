"use client";

import { checkBookmark, toggleBookmark } from "@/services/bookMark.service";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
type Props = {
  id: string;
};

export const ButtonMark = ({ id }: Props) => {
  const [adore, setAdore] = useState(false);

  const checkIfBookmarked = async () => {
    try {
      const res = await checkBookmark(id);
      setAdore(res);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Bookmark check completed");
    }
  };

  const togglekmark = async () => {
    try {
      await toggleBookmark(id);
      await checkIfBookmarked();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfBookmarked();
  }, [id]);

  return (
    <div
      className="rounded-full size-6 bg cursor-pointer flex items-center justify-center "
      onClick={() => togglekmark()}
    >
      <FontAwesomeIcon
        icon={faStar}
        className={`text-sm  text-center ${adore && "text-yellow-500 "} transition-all duration-100`}
      />
    </div>
  );
};
