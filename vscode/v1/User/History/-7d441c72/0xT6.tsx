"use client";
import { getInterestsList } from "@/app/lib/fetchers/student";
import { InterestType } from "@/app/types";
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
    <div className="flex flex-col bg-orange-800/30  text-orange-500 rounded-md w-1/2 m-2">
      <span className="px-4 text-3xl font-semibold">Interests</span>
    </div>
  );
};

export default InterestBox;
