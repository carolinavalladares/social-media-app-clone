import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import { PostType } from "@/types/types";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Post from "@/components/Post";
import Link from "next/link";

interface Props {
  posts: PostType[];
}

export default function ({ posts }: Props) {
  const { user } = useAuth();
  const {
    profileImage,
    displayName,
    username,
    following,
    followers,
    createdAt,
  } = user;

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
        {user && (
          <>
            {/* top container */}

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

            <div className="mt-2">
              {createdAt && (
                <p className="text-slate-400 text-xs">
                  member since {createdAt.split("-")[0]}
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
      {posts && (
        <div>
          <h3 className="text-base font-semibold mt-4 ml-2">My Posts</h3>
          {posts.length == 0 ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-xl text-slate-400 ">No posts yet</p>
            </div>
          ) : (
            <div>
              {posts.map((post) => {
                return (
                  <Post key={post._id} post={post}>
                    {/* Add post management options here */}
                  </Post>
                );
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

  //   get user's posts
  const requestPosts = await fetch(
    process.env.NEXT_PUBLIC_GET_USER_POSTS_ENDPOINT as string,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  const resp = await requestPosts.json();

  const posts = resp.posts;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      posts,
    },
  };
};
