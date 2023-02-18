import { UserType } from "@/types/types";
import { getToken } from "@/utils/getToken";
import { useState, useEffect } from "react";

interface Props {
  loggedInUser: UserType;
  profileUser: UserType;
}

const FollowBtn = ({ loggedInUser, profileUser }: Props) => {
  const [following, setFollowing] = useState<boolean>();

  useEffect(() => {
    setFollowing(
      loggedInUser.following && loggedInUser.following.includes(profileUser._id)
    );
  }, [loggedInUser]);

  const follow = async () => {
    const token = getToken();
    try {
      const follow = await fetch(
        `${process.env.NEXT_PUBLIC_USER_FOLLOW_ENDPOINT}/${profileUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await follow.json();

      setFollowing(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollow = async () => {
    const token = getToken();
    try {
      const unfollow = await fetch(
        `${process.env.NEXT_PUBLIC_USER_UNFOLLOW_ENDPOINT}/${profileUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await unfollow.json();

      setFollowing(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = () => {
    if (!following) {
      follow();
    } else {
      unfollow();
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`bg-slate-700 text-white text-sm font-semibold px-2 py-1`}
    >
      {following ? "Unfollow" : " Follow"}
    </button>
  );
};

export default FollowBtn;
