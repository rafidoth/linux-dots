"use client";
import { cn } from "@/lib/utils";
import { Bell, Inbox } from "lucide-react";
import React from "react";
import { smooth_hover } from "@/app/ui/CustomStyles";



const PropsSchema = z.object({
  TogglerElements: z.array(
    z.object({
      name: z.string(),
      icon: z.element(),
      url: z.string(),
    })
  ),
});

type Props = {
    TogglerElements: 
};

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
const Toggler = (props: Props) => {
  const [selected, setSelected] = React.useState<string>("inbox");
  return (
    <div className="flex justify-evenly h-[70px] items-center px-2">
      {TogglerElements.map((el) => {
        return (
          <span
            key={el.name}
            className={cn(
              "cursor-pointer w-full flex justify-center rounded-xl",
              "py-2",
              "hover:bg-orange-500/30 hover:text-orange-500",
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
