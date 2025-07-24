import Sidebar from "@/app/ui/Sidebar";
import React from "react";

import {
  Bell,
  Calendar,
  Globe,
  Group,
  History,
  Home,
  Inbox,
  LayoutGrid,
  Workflow,
} from "lucide-react";

const SidebarElements = [
  {
    name: "Home",
    icon: <Home />,
    url: "/m/home",
  },
  {
    name: "My Sessions",
    icon: <LayoutGrid />,
    url: "/m/mysessions",
  },
  {
    name: "Group Sessions",
    icon: <Group />,
    url: "/m/group-sessions",
  },
  {
    name: "Jobs",
    icon: <Workflow />,
    url: "/s/jobs",
  },
];

const SidebarTopNavigationButtons = [
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
export default function MentorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen">
      <Sidebar
        SidebarElements={SidebarElements}
        SidebarTopNavigationButtons={SidebarTopNavigationButtons}
      />
      <div className="flex flex-col w-full">
        {/* <div className="h-[70px] border-b w-full">topbar</div> */}
        <div>{children}</div>
      </div>
    </div>
  );
}
