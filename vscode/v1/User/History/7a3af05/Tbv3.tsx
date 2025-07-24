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
  return <div className="flex "></div>;
};

export default Toggler;
