import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import UserBadge from "@/components/UserBadge";
import PostForm from "@/components/PostForm";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4 max-w-5xl m-auto">
        <div className="flex items-center gap-4 h-44">
          <div className="">
            <UserBadge />
          </div>

          <div className="flex-1">
            <PostForm />
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

  return {
    props: {},
  };
};
