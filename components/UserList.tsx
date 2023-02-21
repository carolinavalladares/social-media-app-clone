import { UserType } from "@/types/types";
import Link from "next/link";
import React from "react";
import useAuth from "@/hooks/useAuth";

interface ListProps {
  users: UserType[];
}
interface UserProps {
  profileUser: UserType;
}

const User = ({ profileUser }: UserProps) => {
  const { displayName, username, profileImage, _id } = profileUser;
  const { user } = useAuth();

  return (
    <Link href={`/user/${_id}`}>
      <div className="border-t flex flex-col relative">
        {user.following && user.following.includes(_id) ? (
          <p className="absolute text-xs bg-slate-400 text-white top-0 right-0 px-1">
            following
          </p>
        ) : null}
        <div className="flex items-center mb-4 gap-2 pt-2">
          {/* picture container */}
          <div className="h-8 w-8 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center">
            {profileImage && (
              <img src={`${profileImage}`} alt="profile image" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold leading-none mb-1">
              {displayName}
            </p>
            <p className="text-sm text-slate-400 leading-none">@{username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const UserList = ({ users }: ListProps) => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md p-4 mt-4 w-48 flex-1">
      <h4 className="text-sm font-semibold mb-4">Users</h4>

      {users && (
        <ul>
          {users
            .filter((userItem) => userItem._id !== user._id)
            .map((userItem) => {
              return <User key={userItem._id} profileUser={userItem} />;
            })}
        </ul>
      )}
    </div>
  );
};

export default UserList;
