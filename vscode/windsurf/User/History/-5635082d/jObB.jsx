import { Button } from "@/components/ui/button";
import { useSession } from "../context/SessionContext";
function UserProfileDialog({ open }) {
  const session = useSession();
  const userDetails = session?.user?.user_metadata;
  return (
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
  );
}

export default UserProfileDialog;
