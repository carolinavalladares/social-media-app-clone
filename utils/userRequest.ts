import { getToken } from "./getToken";

export async function follow(
  setIsFollowing: React.Dispatch<boolean>,
  userId: string,
  refreshUser: (token: string) => void
) {
  const token = getToken();
  try {
    const follow = await fetch(
      `${process.env.NEXT_PUBLIC_USER_FOLLOW_ENDPOINT}/${userId}`,
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

    setIsFollowing(true);
    console.log(data);

    await refreshUser(token);
  } catch (error) {
    console.log(error);
  }
}

export async function unfollow(
  setIsFollowing: React.Dispatch<boolean>,
  userId: string,
  refreshUser: (token: string) => void
) {
  const token = getToken();
  try {
    const unfollow = await fetch(
      `${process.env.NEXT_PUBLIC_USER_UNFOLLOW_ENDPOINT}/${userId}`,
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

    setIsFollowing(false);
    console.log(data);

    await refreshUser(token);
  } catch (error) {
    console.log(error);
  }
}
