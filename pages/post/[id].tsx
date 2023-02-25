import { useEffect, useState } from "react";
import CommentType, { PostType } from "@/types/types";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Post from "@/components/Post";
import { useForm, SubmitHandler } from "react-hook-form";
import Comment from "@/components/Comment";
import { addComment } from "@/utils/postsRequests";
import { refreshData } from "@/utils/refreshData";
import Link from "next/link";

interface FormType {
  content: string;
}

interface Props {
  post: PostType;
  comments: CommentType[];
}

export default function Page({ post, comments }: Props) {
  const [hasContent, setHasContent] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { register, watch, setValue, handleSubmit } = useForm<FormType>();

  const watchContent = watch(["content"]);

  useEffect(() => {
    if (!watchContent) return;
    if (!watchContent[0] || watchContent[0].length > 300) {
      setHasContent(false);
    } else {
      setHasContent(true);
    }
  }, [watchContent]);

  const submit: SubmitHandler<FormType> = async (values) => {
    try {
      await addComment(post.id, values.content);
      setValue("content", "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="p-4 max-w-5xl m-auto">
      <div>
        <Link
          className="text-sm text-slate-500 hover:underline inline-block m-0 "
          href={"/"}
        >
          {"< Timeline"}
        </Link>
      </div>
      <Post showCommentsBtn={false} postItem={post}>
        {/* Comment Form */}
        <div className="bg-white shadow-md p-4 ">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col  gap-1"
          >
            <textarea
              {...register("content", { required: true })}
              className={`border w-full break-all py-1 px-2 outline-none focus:border-slate-600 resize-y ${
                watchContent[0] && watchContent[0].length > 300
                  ? "focus:border-rose-500 "
                  : null
              }`}
              placeholder="Write your comment..."
            ></textarea>

            <div className="flex justify-between">
              <p
                className={`font-semibold text-xs  m-0 ${
                  watchContent[0] && watchContent[0].length > 300
                    ? "text-rose-600"
                    : "text-slate-400"
                }`}
              >{`${watchContent[0] ? watchContent[0].length : "0"}/300`}</p>
              <button
                onClick={() => handleRefresh()}
                type="submit"
                className={`self-end px-4 py-1 bg-slate-700 text-white font-semibold ${
                  !hasContent ? "pointer-events-none opacity-50" : null
                }`}
              >
                Post
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-base font-semibold mt-4 ml-2 ">
            Comments {`(${comments.length})`}
          </h3>

          <div>
            {comments &&
              comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
          </div>
        </div>
      </Post>
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

  const postReq = await fetch(
    `${process.env.NEXT_PUBLIC_GET_ONE_POST_ENDPOINT}/${ctx.params?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataPost = await postReq.json();

  const commentsReq = await fetch(
    `${process.env.NEXT_PUBLIC_GET_COMMENTS_ENDPOINT}/${ctx.params?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  const dataComments = await commentsReq.json();

  return {
    props: {
      post: dataPost.post,
      comments: dataComments.comments,
    },
  };
};
