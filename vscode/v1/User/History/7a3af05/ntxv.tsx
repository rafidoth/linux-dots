"use client";
import { Inbox } from "lucide-react";
import React from "react";

type Props = {};

const ToggerElements = [
  {
    name: "inbox",
    icon: <Inbox />,
  },
];

const Toggler = (props: Props) => {
  const [selected, setSelected] = React.useState<string>("inbox");
  return <div className="flex "></div>;
};

export default Toggler;
