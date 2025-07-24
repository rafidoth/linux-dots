"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Toggler from "./Toggler";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_style } from "./CustomStyles";
import { usePathname, useRouter } from "next/navigation";
import { getNextBookedMentor } from "../lib/fetchers/mentor";
import { NextBookedType, StudentInfoType } from "../types";
import { getNextBookedStudent } from "../lib/fetchers/student";
import SidebarTimeLeft from "./SidebarTimeLeft";
import { isAfter, isBefore } from "date-fns";
import { getMyProfileDetails } from "../lib/fetchers/student";
import Image from "next/image";

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
  const router = useRouter();
  const [nextBooked, setNextBooked] = useState<NextBookedType | null>(null);
  const [myprofileStudent, setMyProfileStudent] =
    useState<StudentInfoType | null>(null);

  useEffect(() => {
    const fn = async () => {
      if (role === "student") {
        const p: StudentInfoType = await getMyProfileDetails();
        setMyProfileStudent(p);
      }
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
    <div className="w-[300px] border-r h-screen flex flex-col justify-between">
      <div className="flex flex-col">
        <Toggler
          TogglerElements={SidebarTopNavigationButtons}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="my-4 p-2 flex flex-col gap-y-2">
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
          <div>
            {nextBooked && isAfter(nextBooked.StartTime, new Date()) && (
              <SidebarTimeLeft BookedSession={nextBooked} status="upcoming" />
            )}
            {nextBooked && !isBefore(new Date(), nextBooked.StartTime) && (
              <SidebarTimeLeft BookedSession={nextBooked} status="goingon" />
            )}
          </div>
        </div>
      </div>
      <div
        className="h-[100px] p-3 flex items-center justify-center gap-x-2 hover:bg-orange-800/10 rounded-xl select-none"
        onClick={() => router.push("/s/myprofile")}
      >
        <Image
          src={`https://robohash.org/${myprofileStudent?.username}.png?size=200x200`}
          alt="my profile"
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
        />
        <span className="flex flex-col">
          <span className="text-xl font-semibold">
            {myprofileStudent?.name}
          </span>
          <div>
            <span className="bg-orange-900 px-2 rounded-sm font-semibold">
              {role}
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
