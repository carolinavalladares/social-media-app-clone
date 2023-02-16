import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const UserBadge = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="p-4 shadow-md bg-white w-40">
      <Link href={"/profile"}>
        <div className="flex flex-col items-center justify-center">
          {/* picture container */}
          <div className="h-12 w-12 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center">
            {user.profileImage && (
              <img src={`${user.profileImage}`} alt="profile image" />
            )}
          </div>

          <div className="mt-3 text-center">
            <h4 className="font-semibold m-0 text-sm leading-none mb-1">
              {user.displayName}
            </h4>

            <p className=" m-0 text-sm leading-none text-slate-400 ">
              @{user.username}
            </p>
          </div>
        </div>
      </Link>

      <div className="mt-7 flex items-center justify-center">
        <button
          onClick={handleSignOut}
          className="bg-slate-700 text-white font-semibold px-2 py-1 text-xs flex items-center justify-center"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default UserBadge;
