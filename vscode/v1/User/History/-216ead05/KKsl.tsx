import Sidebar from "@/app/ui/Sidebar";
import React from "react";

import {
  Bell,
  Calendar,
  CalendarClock,
  Globe,
  Group,
  History,
  Inbox,
  TrafficCone,
  UserSearch,
  Workflow,
} from "lucide-react";

const SidebarElements = [
  {
    name: "AI Roadmap",
    icon: <TrafficCone />,
    url: "/s/airoadmap",
  },
  {
    name: "Schedule",
    icon: <Calendar />,
    url: "/s/schedule",
  },
  {
    name: "Find Mentor",
    icon: <UserSearch />,
    url: "/s/findmentor",
  },
  {
    name: "1:1 Sessions",
    icon: <CalendarClock />,
    url: "/s/sessions",
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
export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen">
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
