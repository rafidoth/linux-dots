import { ArrowLeftFromLine } from "lucide-react";
import { FolderPlus } from "lucide-react";
import { ChartBar } from "lucide-react";
import { Settings } from "lucide-react";
import { ArrowRightFromLine } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { useSession } from "../context/SessionContext";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Create New Quiz Set", icon: <FolderPlus /> },
    { path: "/gen", label: "Statistics", icon: <ChartBar /> },
    { path: "/settings", label: "Settings", icon: <Settings /> },
  ];

  const session = useSession();
  const userDetails = session.user.user_metadata;
  console.log(userDetails);

  return (
    <div
      className={`h-full transition-all duration-500 ${
        open ? "w-[300px]" : "w-[60px]"
      }`}
    >
      <div className="flex flex-col h-full ">
        <button onClick={() => setOpen(!open)} className="p-4">
          <span className="hover:text-blue-800">
            {open ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
          </span>
        </button>
        <nav className="flex-1">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) =>
                open ? (
                  <div className="flex items-center py-2 px-4 text-sidebar-foreground hover:bg-accent transition-colors gap-x-2">
                    <span>{item.icon}</span>
                    <span
                      className={`whitespace-nowrap overflow-hidden text-ellipsis
                        ${
                          isActive
                            ? "bg-black text-white px-2 rounded-sm font-bold"
                            : ""
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ) : (
                  <div
                    className={` flex items-center p-2 rounded-sm mx-2  justify-center transition-colors duration-300 ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-accent"
                    }`}
                  >
                    <span className="">{item.icon}</span>
                  </div>
                )
              }
            </NavLink>
          ))}
        </nav>
        <div className="h-[60px] bg-red-400">{session.user?.email}</div>
        <img src={userDetails?.picture} className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
}

export default Sidebar;
