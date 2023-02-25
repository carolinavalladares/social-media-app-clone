import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import UserBadge from "@/components/UserBadge";
import PostForm from "@/components/PostForm";
import UserList from "@/components/UserList";
import { PostType, UserType } from "@/types/types";
import Post from "@/components/Post";
import Link from "next/link";
import { FaRegCommentDots } from "react-icons/fa";

interface Props {
  users: UserType[];
  timeline: PostType[];
}

export default function Home({ users, timeline }: Props) {
  return (
    <>
      <Head>
        <title>Home | Social App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4 max-w-5xl m-auto flex flex-col min-h-screen">
        <div className="flex items-center gap-4 h-44">
          <div className="">
            <UserBadge />
          </div>

          <div className="flex-1">
            <PostForm />
          </div>
        </div>

        <div className="flex gap-4 flex-1">
          <div className=" flex flex-col">
            <UserList users={users} />
          </div>

          <div className="flex-1">
            {timeline &&
              timeline.map((post, index) => {
                return (
                  <Post
                    key={`${post.id}${index}`}
                    showCommentsBtn={true}
                    postItem={post}
                  ></Post>
                );
              })}
          </div>
        </div>
      </main>
    </>
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

  const usersReq = await fetch(
    process.env.NEXT_PUBLIC_GET_ALL_USERS_ENDPOINT as string,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await usersReq.json();

  // get timeline
  const timelineReq = await fetch(
    process.env.NEXT_PUBLIC_GET_TIMELINE_ENDPOINT as string,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  const timelinePosts = await timelineReq.json();

  return {
    props: { users: data.users, timeline: timelinePosts.posts },
  };
};
