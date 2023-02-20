import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { submitPost } from "@/utils/submitPost";

interface FormType {
  content: string;
}

const PostForm = () => {
  const [hasContent, setHasContent] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormType>();

  const watchContent = watch(["content"]);

  useEffect(() => {
    if (!watchContent[0] || watchContent[0].length > 300) {
      setHasContent(false);
    } else {
      setHasContent(true);
    }
  }, [watchContent]);

  const submit: SubmitHandler<FormType> = (data: FormType) => {
    submitPost(data);

    setValue("content", "");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className="p-4 bg-white shadow-md h-44 flex flex-col "
      >
        <div className=" flex flex-1 mb-2 h-1/2">
          <textarea
            {...register("content", { required: true })}
            className="w-full resize-none border p-2 outline-none  placeholder:text-slate-300"
            rows={10}
            placeholder={"What's happening?"}
          ></textarea>
        </div>

        <div className="flex justify-between">
          <p
            className={`font-semibold text-xs text-slate-400 m-0 ${
              watchContent[0].length > 300 ? "text-rose-600" : null
            }`}
          >{`${watchContent[0].length}/300`}</p>
          <button
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
  );
};

export default PostForm;
