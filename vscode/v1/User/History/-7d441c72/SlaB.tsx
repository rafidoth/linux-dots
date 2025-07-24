"use client";
import { getInterestsList } from "@/app/lib/fetchers/student";
import { InterestType } from "@/app/types";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {};

const InterestBox = (props: Props) => {
  const [interestList, setInterestList] = useState<InterestType[]>([]);
  useEffect(() => {
    const fn = async () => {
      const data: InterestType[] = await getInterestsList();
      setInterestList(data);
    };
    fn();
  }, []);
  return (
    <span className="flex flex-col bg-orange-800/30  text-orange-500 rounded-md m-2 py-3 w-fit">
      <span className="flex items-center">
        <span className="px-4 text-3xl font-semibold">Interests</span>
        <span>
          <PlusIcon />
        </span>
      </span>
      {interestList.map((item) => {
        return (
          <span
            key={item.interest_id}
            className="border-t border-orange-500/40 px-4 text-xl"
          >
            {item.interest_name}
          </span>
        );
      })}
    </span>
  );
};

export default InterestBox;
