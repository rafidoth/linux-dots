import React from "react";

type Props = {};

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-[250px] h-screen  border border-r">sidebar</div>
      {children}
    </div>
  );
}
