const PostForm = () => {
  return (
    <div className="">
      <div className="p-4 bg-white shadow-md h-44 flex flex-col ">
        <textarea
          className="flex-1 resize-none border p-2 outline-none mb-2 placeholder:text-slate-300"
          name="post"
          rows={10}
          placeholder={"What's happening?"}
        ></textarea>

        <button className="self-end px-4 py-1 bg-slate-700 text-white font-semibold">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;
