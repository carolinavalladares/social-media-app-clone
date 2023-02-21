import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { submitPost, updatePost } from "@/utils/postsRequests";
import { refreshData } from "@/utils/refreshData";
import { PostType } from "@/types/types";

interface FormType {
  content: string;
}

interface Props {
  post?: PostType;
  setEditOpen?: React.Dispatch<boolean>;
}

const PostForm = ({ post, setEditOpen }: Props) => {
  const [hasContent, setHasContent] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormType>();

  const watchContent = watch(["content"]);

  useEffect(() => {
    if (!watchContent) return;
    if (!watchContent[0] || watchContent[0].length > 300) {
      setHasContent(false);
    } else {
      setHasContent(true);
    }
  }, [watchContent]);

  useEffect(() => {
    if (post) {
      setValue("content", post.content);
    }
  }, []);

  const submit: SubmitHandler<FormType> = (data: FormType) => {
    if (!post) {
      submitPost(data);
      setValue("content", "");
      refreshData();
    } else {
      updatePost(data, post._id);
      setEditOpen && setEditOpen(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className={`p-4 bg-white  h-44 flex flex-col ${!post && "shadow-md"}`}
      >
        <div className=" flex flex-1 mb-2 h-1/2">
          <textarea
            {...register("content", { required: true })}
            className="w-full resize-none border p-2 outline-none font-normal placeholder:text-slate-300"
            rows={10}
            placeholder={"What's happening?"}
          ></textarea>
        </div>

        <div className="flex justify-between">
          <p
            className={`font-semibold text-xs  m-0 ${
              watchContent[0] && watchContent[0].length > 300
                ? "text-rose-600"
                : "text-slate-400"
            }`}
          >{`${watchContent[0] ? watchContent[0].length : "0"}/300`}</p>

          <button
            type="submit"
            className={`self-end px-4 py-1 bg-slate-700 text-white font-semibold ${
              !hasContent ? "pointer-events-none opacity-50" : null
            }`}
          >
            {post ? "Edit" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
