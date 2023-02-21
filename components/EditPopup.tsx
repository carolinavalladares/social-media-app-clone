import { PostType } from "@/types/types";
import { useState } from "react";
import PostForm from "./PostForm";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  post: PostType;
  setEditOpen: React.Dispatch<boolean>;
}

const EditPopup = ({ post, setEditOpen }: Props) => {
  const handleClose = () => {
    setEditOpen(false);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center ">
      <div className="w-full max-w-xl bg-white shadow-md h-auto p-5 z-20 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-lg text-slate-400"
        >
          <AiOutlineClose />
        </button>
        <h1 className="text-base font-semibold mb-5">Edit Post</h1>
        <PostForm setEditOpen={setEditOpen} post={post} />
      </div>

      {/* Overlay */}
      <div
        onClick={handleClose}
        className="opacity-60 bg-white absolute inset-0 z-10"
      ></div>
    </div>
  );
};

export default EditPopup;
