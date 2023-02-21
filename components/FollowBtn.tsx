import { useEffect, useState } from "react";
import { UserType } from "@/types/types";
import { getToken } from "@/utils/getToken";
import useAuth from "@/hooks/useAuth";
import { unfollow, follow } from "@/utils/userRequest";

interface Props {
  loggedInUser: UserType;
  profileUser: UserType;
}

const FollowBtn = ({
  loggedInUser,

  profileUser,
}: Props) => {
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const { refreshUser } = useAuth();
  useEffect(() => {
    setIsFollowing(
      loggedInUser.following && loggedInUser.following.includes(profileUser.id)
    );
  }, [loggedInUser]);

  const handleFollow = async () => {
    if (!isFollowing) {
      follow(setIsFollowing, profileUser.id, refreshUser);
    } else {
      unfollow(setIsFollowing, profileUser.id, refreshUser);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`bg-slate-700 text-white text-sm font-semibold px-2 py-1`}
    >
      {isFollowing ? "Unfollow" : " Follow"}
    </button>
  );
};

export default FollowBtn;
