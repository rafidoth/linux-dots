"use client";
import { getInterestsList } from "@/app/lib/fetchers/student";
import { InterestType } from "@/app/types";
import React, { useEffect, useState } from "react";
import AddInterestBtn from "../AddInterestBtn";

type Props = {};

const InterestBox = (props: Props) => {
  const [interestList, setInterestList] = useState<InterestType[]>([]);
  const maxInterests = 10;
  const handleAdding = () => {};
  useEffect(() => {
    const fn = async () => {
      const data: InterestType[] = await getInterestsList();
      setInterestList(data);
    };
    fn();
  }, []);
  return (
    <span className="flex flex-col bg-orange-800/30  text-orange-500 rounded-md m-2 py-3 w-fit">
      <div className="flex items-center justify-between px-4">
        <span className="text-3xl font-semibold py-2">Interests</span>
        <span className="flex items-center text-xl gap-x-2">
          {interestList.length}/{maxInterests}
          <AddInterestBtn
            SelectCount={maxInterests}
            updateInterestList={(newIntersts: InterestType[]) => {
              setInterestList([...interestList, ...newIntersts]);
            }}
            value={interestList}
          />
        </span>
      </div>
      {interestList.map((item) => {
        return (
          <span
            key={item.interest_id}
            className="border-t border-orange-500/40 px-4 py-2 text-xl"
          >
            {item.interest_name}
          </span>
        );
      })}
    </span>
  );
};

export default InterestBox;
