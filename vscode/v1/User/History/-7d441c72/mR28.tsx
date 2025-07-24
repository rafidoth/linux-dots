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
  return <div>InterestBox</div>;
};

export default InterestBox;
