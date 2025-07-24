"use client";
import { getInterestsList } from "@/app/lib/fetchers/student";
import { InterestType } from "@/app/types";
import React, { useEffect } from "react";

type Props = {};

const InterestBox = (props: Props) => {
  useEffect(() => {
    const fn = () => {
      const data: InterestType[] = getInterestsList();
    };
    fn();
  }, []);
  return <div>InterestBox</div>;
};

export default InterestBox;
