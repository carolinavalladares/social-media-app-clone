import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function () {
  const { user } = useAuth();
  const {
    profileImage,
    displayName,
    username,
    following,
    followers,
    createdAt,
    posts,
  } = user;

  return (
    <div className="p-4 max-w-5xl m-auto">
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
          {posts.length == 0 ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-xl text-slate-400 ">No posts yet</p>
            </div>
          ) : (
            <div>
              {posts.map((post) => {
                return <p>{post}</p>;
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

  return {
    props: {},
  };
};
