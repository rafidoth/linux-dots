import React from "react";

type Props = {};

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-x-4">
      <div className="w-[250px] h-screen  border-r">sidebar</div>
      {children}
    </div>
  );
}
