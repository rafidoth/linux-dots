import { ArrowLeftFromLine } from "lucide-react";
import { FolderPlus } from "lucide-react";
import { ChartBar } from "lucide-react";
import { Settings } from "lucide-react";
import { ArrowRightFromLine } from "lucide-react";
import { File } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useSession } from "../context/SessionContext";
import { fetchUserQuizsets } from "../api";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [userQuizsets, setUserQuizsets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navItems = [
    { path: "/", label: "Create New Quiz Set", icon: <FolderPlus /> },
    { path: "/gen", label: "Statistics", icon: <ChartBar /> },
    { path: "/settings", label: "Settings", icon: <Settings /> },
  ];

  const session = useSession();
  const userDetails = session.user.user_metadata;
  const userId = session.user.id;

  // Fetch user's quizsets when component mounts or userId changes
  useEffect(() => {
    async function loadUserQuizsets() {
      if (!userId) return;

      setIsLoading(true);
      try {
        const quizsets = await fetchUserQuizsets(userId, 5);
        setUserQuizsets(quizsets);
      } catch (error) {
        console.error("Error fetching quizsets:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserQuizsets();
  }, [userId]);

  return (
    <div
      className={`h-full transition-all duration-500 ${
        open ? "w-[300px]" : "w-[60px]"
      }`}
    >
      <div className="flex flex-col h-full">
        <button onClick={() => setOpen(!open)} className="p-4">
          <span className="hover:text-blue-800">
            {open ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
          </span>
        </button>
        <nav className="flex-1 flex flex-col">
          {/* Main navigation */}
          <div>
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
                      className={` flex items-center p-2 rounded-sm mx-2 justify-center transition-colors duration-300 ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-accent"
                      }`}
                    >
                      <span>{item.icon}</span>
                    </div>
                  )
                }
              </NavLink>
            ))}
          </div>

          {/* Recent quizsets section */}
          {open && (
            <div className="mt-6 px-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Recent Quizsets
              </h3>
              {isLoading ? (
                <div className="py-2 text-sm text-gray-400">Loading...</div>
              ) : userQuizsets.length > 0 ? (
                <div className="space-y-1">
                  {userQuizsets.map((quizset) => (
                    <NavLink key={quizset.id} to={`/q/${quizset.id}`}>
                      {({ isActive }) => (
                        <div
                          className={`flex items-center py-1.5 px-2 rounded-sm text-sm
                            ${
                              isActive
                                ? "bg-black text-white"
                                : "hover:bg-accent"
                            }
                          `}
                        >
                          <span className="mr-2">
                            <File size={14} />
                          </span>
                          <span className="truncate">{quizset.title}</span>
                        </div>
                      )}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <div className="py-2 text-sm text-gray-400">
                  No quizsets found
                </div>
              )}
            </div>
          )}
        </nav>
        {/* this profile should be a button which will take to the user profile floating dialog
        which will have basic account details and sign out button */}
        <div className="w-full flex justify-center py-2">
          {!open ? (
            <div className="h-[60px] flex items-center justify-center">
              {userDetails?.avatar_url && (
                <img
                  src={userDetails.avatar_url}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-black"
                />
              )}
            </div>
          ) : (
            <Button variant={"outline"} className={"flex h-[60px] border-none"}>
              <div className="flex items-center justify-center">
                {userDetails?.avatar_url && (
                  <img
                    src={userDetails.avatar_url}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-black"
                  />
                )}
              </div>
              <div>{userDetails?.name}</div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
