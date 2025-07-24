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
      <div className="flex flex-col w-full">
        <div className="h-[100px] border-b w-full">topbar</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
