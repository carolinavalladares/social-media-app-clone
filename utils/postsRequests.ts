import { getToken } from "./getToken";
import { refreshData } from "./refreshData";

export async function submitPost(data: { content: string }) {
  const token = getToken();

  if (!token) {
    return;
  }

  try {
    const submit = await fetch(
      process.env.NEXT_PUBLIC_SUBMIT_POST_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const resp = await submit.json();
    refreshData();
  } catch (error) {
    return console.error(error);
  }
}

export async function updatePost(data: { content: string }, postId: string) {
  const token = getToken();

  if (!token) {
    return;
  }

  try {
    const updateReq = await fetch(
      `${process.env.NEXT_PUBLIC_EDIT_POST_ENDPOINT}/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const update = await updateReq.json();

    console.log(update);
    refreshData();
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId: string) {
  const token = getToken();
  const deleteReq = await fetch(
    `${process.env.NEXT_PUBLIC_DELETE_POST_ENDPOINT}/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  const deleted = await deleteReq.json();

  refreshData();
}

export async function likePost(postId: string) {
  const token = getToken();
  try {
    const likeReq = await fetch(
      `${process.env.NEXT_PUBLIC_LIKE_POST_ENDPOINT}/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const like = await likeReq.json();
    refreshData();
    console.log(like);
  } catch (error) {
    console.log(error);
  }
}

export async function dislikePost(postId: string) {
  const token = getToken();
  try {
    const dislikeReq = await fetch(
      `${process.env.NEXT_PUBLIC_DISLIKE_POST_ENDPOINT}/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const dislike = await dislikeReq.json();
    refreshData();
    console.log(dislike);
  } catch (error) {
    console.log(error);
  }
}
