import Sidebar from "@/app/ui/Sidebar";
import React from "react";

import {
  Bell,
  Calendar,
  Globe,
  Group,
  History,
  Inbox,
  Workflow,
} from "lucide-react";

const SidebarElements = [
  {
    name: "My Schedule",
    icon: <Calendar />,
    url: "/s/schedule",
  },
  {
    name: "Explore",
    icon: <Globe />,
    url: "/s/explore",
  },
  {
    name: "Group Sessions",
    icon: <Group />,
    url: "/s/group-sessions",
  },
  {
    name: "History",
    icon: <History />,
    url: "/s/history",
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
        <div className="h-[70px] border-b w-full">topbar</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
