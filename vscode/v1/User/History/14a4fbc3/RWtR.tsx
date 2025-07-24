"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Toggler from "./Toggler";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_style } from "./CustomStyles";
import { usePathname } from "next/navigation";
import { getNextBookedMentor } from "../lib/fetchers/mentor";
import { NextBookedType, StudentInfoType } from "../types";
import { getNextBookedStudent } from "../lib/mutations/student";
import SidebarTimeLeft from "./SidebarTimeLeft";
import { isAfter, isBefore } from "date-fns";
import { getMyProfileDetails } from "../lib/fetchers/student";

type Props = {
  role: "student" | "mentor";
  SidebarElements: {
    name: string;
    icon: ReactElement;
    url: string;
  }[];
  SidebarTopNavigationButtons: {
    name: string;
    icon: ReactElement;
    url: string;
  }[];
};

const Sidebar = ({
  role,
  SidebarElements,
  SidebarTopNavigationButtons,
}: Props) => {
  const [selected, setSelected] = React.useState<string>("");
  const thisurl = usePathname();
  const [nextBooked, setNextBooked] = useState<NextBookedType | null>(null);
  const [myprofile, setMyProfile] = useState<StudentInfoType | null>(null);
  useEffect(() => {
    const fn = async () => {
      const p: StudentInfoType = await getMyProfileDetails();
      setMyProfile(p);

      const nowtime = new Date();
      let data: NextBookedType;
      if (role === "mentor") {
        data = await getNextBookedMentor(nowtime.toISOString());
        setNextBooked(data);
      } else {
        data = await getNextBookedStudent(nowtime.toISOString());
        setNextBooked(data);
      }
    };
    fn();
  }, []);

  return (
    <div className="w-[300px] border-r h-screen flex flex-col ">
      <Toggler
        TogglerElements={SidebarTopNavigationButtons}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="my-4 p-2 flex flex-col gap-y-2">
        <div>
          {SidebarElements.map((element) => (
            <Link
              href={element.url}
              key={element.name}
              onClick={() => setSelected(element.name)}
            >
              <div
                className={cn(
                  "flex items-center gap-x-2 py-2 px-6 cursor-pointer text-lg",
                  thisurl === element.url ? theme_style : hover_style,
                  "rounded-xl",
                  smooth_hover
                )}
              >
                {element.icon}
                <span>{element.name}</span>
              </div>
            </Link>
          ))}
          <div className="px-2">
            {nextBooked && isAfter(nextBooked.StartTime, new Date()) && (
              <SidebarTimeLeft BookedSession={nextBooked} status="upcoming" />
            )}
            {nextBooked && !isBefore(new Date(), nextBooked.StartTime) && (
              <SidebarTimeLeft BookedSession={nextBooked} status="goingon" />
            )}
          </div>
        </div>
        <div>{myprofile?.name}</div>
      </div>
    </div>
  );
};

export default Sidebar;
