"use client";

import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { QuizsetType, User_Type } from "@/app/utils/types";
import { useQuizSetCtx } from "@/app/contexts/Quizset.context";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { TbCardsFilled } from "react-icons/tb";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { IoTime } from "react-icons/io5";
import { fetchQuizSetsOfUserFromDB } from "@/app/utils/db";
import { FaHistory } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUserCtx } from "@/app/contexts/CurrentUserContext";
import EditableTitle from "../Editabletitle";
import { updateQuizsetTitle } from "@/app/utils/dbUpdate";
import Logo from "../Logo";
import { logo_path } from "@/app/config.jigao";
import ThemeChanger from "../ThemeChanger";
const sidebarItems = [
  {
    title: "Dashboard",
    route: "/dashboard/user",
    icon: <TbLayoutDashboardFilled />,
  },
  {
    title: "My Quizzes",
    route: "/dashboard/myquizzes",
    icon: <TbCardsFilled />,
  },
  {
    title: "Bookmarks",
    route: "/dashboard/bookmarks",
    icon: <PiBookmarkSimpleFill />,
  },
  {
    title: "Take a Quiz",
    route: "/dashboard/takeaquiz",
    icon: <IoTime />,
  },
];

interface SidebarProps {
  sidebar: boolean;
  toggleSidebarAction: () => void;
}

export default function Sidebar({ toggleSidebarAction }: SidebarProps) {
  const { isLoaded, user } = useUser();
  const currentPath = usePathname();
  const { Quizsets, setQuizsets } = useQuizSetCtx();
  const { currentUser, setCurrentUser } = useCurrentUserCtx();
  const [sidebarSelection, setSidebarSelection] = useState<number | null>(null);
  const [editableTitle, setEditableTitle] = useState<number | null>(null);
  console.log(currentPath);
  if (isLoaded) {
    console.log(currentUser);
  }

  useEffect(() => {
    if (isLoaded) {
      if (user && user.id) {
        const u: User_Type = {
          user_id: user.id,
        };
        setCurrentUser(u);
        const fn = async function () {
          const fetchedQuizsets: QuizsetType[] =
            await fetchQuizSetsOfUserFromDB(user.id);
          setQuizsets(fetchedQuizsets);
        };
        fn();
      } else {
        throw new Error("Error occured in fetching quizsets from DB ");
      }
    }
  }, [isLoaded, user]);
  return (
    <nav
      className={`w-[240px] flex flex-col justify-between bg-transparent  border-r border-dashed`}
    >
      <div>
        <div className="w-full py-2 flex justify-between">
          <Logo src={logo_path} width={40} height={40} />
          <ThemeChanger />
        </div>
        <div
          className={`w-full flex items-center 
        flex-row justify-between  my-4 `}
        >
          <Link href="/dashboard/quizset/new">
            <div
              className="flex items-center justify-center  hover:bg-accent
        rounded-md gap-x-2 px-2 font-semibold cursor-pointer"
            >
              Create New Quiz <IoIosCreate />
            </div>
          </Link>
          <ViewVerticalIcon
            onClick={toggleSidebarAction}
            className={`cursor-pointer hover:text-white/50 w-6 h-6 mx-4`}
          />
        </div>

        <div className={`my-4`}>
          {sidebarItems.map((item, index) => (
            <Link href={item.route} key={index}>
              <div
                className={`
              flex items-center gap-x-2 p-2 
              rounded-l-md
              hover:bg-zinc-900 hover:text-white
              cursor-pointer
            `}
              >
                <span
                  className={`flex gap-2 items-center justify-center
                  ${
                    currentPath.startsWith(item.route)
                      ? "font-bold bg-jigao  rounded px-2 text-white "
                      : ""
                  } 
                  `}
                >
                  {item.icon}
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col ">
          <div className="w-full  font-semibold flex gap-2 items-center justify-start py-2">
            <FaHistory /> Recent Quizsets
          </div>
          {Quizsets.length > 0 &&
            Quizsets.map((quizset, index) => {
              return (
                <Link href={`/dashboard/quizset/${quizset.id}`} key={index}>
                  <div
                    onClick={() => setSidebarSelection(index)}
                    className={`w-full border-dashed 
                ${index === 0 ? "border-y" : ""} border-b
                ${currentPath.endsWith(quizset.id) ? "bg-accent " : ""}
                ${sidebarSelection === index ? "bg-accent " : ""}
              flex items-center gap-x-2 p-2 
              hover:bg-zinc-900
              hover:text-white
              cursor-pointer 
              justify-between
              `}
                  >
                    <EditableTitle
                      initialTitle={quizset.title!.slice(0, 20)}
                      isEditing={editableTitle === index ? true : false}
                      setIsEditing={() => setEditableTitle(null)}
                      onSave={(title) => updateQuizsetTitle(quizset.id, title)}
                    />
                    <Popover>
                      <PopoverTrigger>
                        <SlOptions className="hover:text-jigao" />
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-2 text-xl">
                        <span
                          onClick={() => setEditableTitle(index)}
                          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
                        >
                          <MdEditSquare /> Rename
                        </span>
                        <span className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                          <FaTrashAlt /> Remove
                        </span>
                      </PopoverContent>
                    </Popover>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className={`w-full flex gap-x-2 my-3 pt-2 border-t border-dashed`}>
        <div>
          {user?.hasImage && (
            <Image
              src={user.imageUrl}
              alt={"user image"}
              width={50}
              height={50}
              className={`rounded-full`}
            />
          )}
        </div>
        <div className={`flex flex-col`}>
          <strong>{user?.fullName}</strong>
          <span>Free Tier</span>
        </div>
      </div>
    </nav>
  );
}
