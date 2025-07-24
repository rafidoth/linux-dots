"use client";
import { cn } from "@/lib/utils";
import React, { ReactElement } from "react";
import { smooth_hover } from "@/app/ui/CustomStyles";
import Link from "next/link";

type Props = {
  TogglerElements: {
    name: string;
    icon: ReactElement;
    url: string;
  }[];
};

const Toggler = ({ TogglerElements }: Props) => {
  const [selected, setSelected] = React.useState<string>("inbox");
  return (
    <div className="flex justify-evenly h-[70px] items-center px-2">
      {TogglerElements.map((el) => {
        return (
          <span
            key={el.name}
            onClick={() => setSelected(el.name)}
            className={cn(
              "cursor-pointer w-full flex justify-center rounded-xl",
              "py-2",
              selected !== el.name
                ? "hover:bg-orange-500/30 hover:text-orange-500"
                : "bg-orange-500/30 text-orange-500",
              smooth_hover
            )}
          >
            <Link href={el.url}>{el.icon}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Toggler;
