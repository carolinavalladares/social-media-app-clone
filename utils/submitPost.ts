import { getToken } from "./getToken";

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

    console.log(resp);
  } catch (error) {
    return console.error(error);
  }
}
