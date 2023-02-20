import { useState, useEffect } from "react";
import Post from "@/components/Post";
import { PostType, UserType } from "@/types/types";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { convertToLocalTime } from "@/utils/convertToLocalTime";
import useAuth from "@/hooks/useAuth";
import FollowBtn from "@/components/FollowBtn";

interface Props {
  profileUser: UserType;
  profileUserPosts: PostType[];
}

export default function Page({ profileUser, profileUserPosts }: Props) {
  const {
    displayName,
    username,
    followers,
    following,
    profileImage,
    createdAt,
    _id,
  } = profileUser;

  const { user } = useAuth();

  return (
    <div className="p-4 max-w-5xl m-auto">
      <Link
        className="text-sm text-slate-500 hover:underline inline-block mb-2"
        href={"/"}
      >
        {"< Timeline"}
      </Link>

      {/* Header */}
      <div className="bg-white shadow-md p-4 ">
        {profileUser && (
          <>
            {/* top container */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* picture container */}
                <div className="h-12 w-12 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center">
                  {profileImage && (
                    <img src={`${profileImage}`} alt="profile image" />
                  )}
                </div>
                {/* username */}
                <div>
                  <h4 className="font-semibold m-0 text-base leading-none mb-1">
                    {displayName}
                  </h4>
                  <p className=" m-0 text-sm leading-none text-slate-400">
                    @{username}
                  </p>
                </div>
              </div>

              {/* Follow Btn */}
              <FollowBtn profileUser={profileUser} loggedInUser={user} />
            </div>

            <div className="mt-2">
              {createdAt && (
                <p className="text-slate-400 text-xs">
                  member since {convertToLocalTime(createdAt).monthYear}
                </p>
              )}
            </div>

            <div className="flex items-center text-slate-400 text-sm gap-2 pt-2 border-t mt-3">
              {followers && (
                <p>
                  {followers.length}{" "}
                  {followers.length == 1 ? "follower" : "followers"}
                </p>
              )}

              {following && <p>{following.length} following</p>}
            </div>
          </>
        )}
      </div>
      {/* User's posts */}
      {profileUserPosts && (
        <div>
          <h3 className="text-base font-semibold mt-4 ml-2">
            Posts from {displayName}
          </h3>
          {profileUserPosts.length == 0 ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-xl text-slate-400 ">No posts yet</p>
            </div>
          ) : (
            <div>
              {profileUserPosts.map((post) => {
                return <Post key={post._id} post={post} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "authTest.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const dataReq = await fetch(
    `${process.env.NEXT_PUBLIC_USERS_BASE_ENDPOINT}/${ctx.params?.id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  const profileUserData = await dataReq.json();

  const profileUserPostsReq = await fetch(
    `${process.env.NEXT_PUBLIC_POSTS_LIST_ENDPOINT}/${ctx.params?.id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  const profileUserPosts = await profileUserPostsReq.json();

  return {
    props: {
      profileUser: profileUserData.user,
      profileUserPosts: profileUserPosts.posts,
    },
  };
};
