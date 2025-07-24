"use client";
import { cn } from "@/lib/utils";
import { Bell, Inbox } from "lucide-react";
import React from "react";

type Props = {};

const TogglerElements = [
  {
    name: "inbox",
    icon: <Inbox />,
  },
  {
    name: "notifications",
    icon: <Bell />,
  },
];

const Toggler = (props: Props) => {
  const [selected, setSelected] = React.useState<string>("inbox");
  return (
    <div className="flex ">
      {TogglerElements.map((el, i) => {
        return (
          <span
            key={el.name}
            className={cn(
              "cursor-pointer",
              i === TogglerElements.length - 1 ? "border-r" : ""
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
