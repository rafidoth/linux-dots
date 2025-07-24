"use client";
import { cn } from "@/lib/utils";
import { Bell, Inbox } from "lucide-react";
import React, { ReactElement } from "react";
import { smooth_hover } from "@/app/ui/CustomStyles";
import { z } from "zod";

const TogglerElements = [
  {
    name: "inbox",
    icon: <Inbox />,
    url: "/s/inbox",
  },
  {
    name: "notifications",
    icon: <Bell />,
    url: "/s/notifications",
  },
];
type Props = {
  TogglerElements: {
    name: string;
    icon: ReactElement;
    url: string;
  }[];
};

const Toggler = (props: Props) => {
  const [selected, setSelected] = React.useState<string>("inbox");
  return (
    <div className="flex justify-evenly h-[70px] items-center px-2">
      {props.TogglerElements.map((el) => {
        return (
          <span
            key={el.name}
            className={cn(
              "cursor-pointer w-full flex justify-center rounded-xl",
              "py-2",
              selected !== el.name
                ? "hover:bg-orange-500/30 hover:text-orange-500"
                : "bg-orange-500/30 text-orange-500",
              smooth_hover
            )}
          >
            {el.icon}
          </span>
        );
      })}
    </div>
  );
};

export default Toggler;
