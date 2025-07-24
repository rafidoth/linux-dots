import React from "react";

type Props = {};

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-x-4 w-screen">
      <div className="w-[300px] h-screen border-r">sidebar</div>
      <div className="flex flex-col">
        <div className=" ">topbar</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
