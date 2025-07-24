"use client";
import { Bell, Inbox } from "lucide-react";
import React from "react";

type Props = {};

const ToggerElements = [
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
      {TogglerElements.map((el) => {
        return <span>{el.icon}</span>;
      })}
    </div>
  );
};

export default Toggler;
