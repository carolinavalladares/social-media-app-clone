import CommentType from "@/types/types";
import { useEffect, useState } from "react";
import { convertToLocalTime } from "@/utils/convertToLocalTime";

interface Props {
  comment: CommentType;
}

const Comment = ({ comment }: Props) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="p-4 bg-white shadow-md mt-4">
      {/* Top container */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center">
          {comment.author.profileImage && (
            <img src={`${comment.author.profileImage}`} alt="profile image" />
          )}
        </div>
        {/* username */}
        <div className="flex items-center gap-1 ">
          <h4 className="font-semibold m-0 text-sm leading-none ">
            {comment.author.displayName}
          </h4>
          <p className=" m-0 text-sm leading-none text-slate-400">
            @{comment.author.username}
          </p>
        </div>
      </div>
      <div className="mt-2 ml-2">
        <p>{comment.content}</p>
      </div>

      <div className="mt-2 ml-2 flex items-center">
        {/* timestamp */}
        <p className="m-0 text-xs leading-none text-slate-400">
          {!hydrated
            ? comment.createdAt
            : convertToLocalTime(comment.createdAt).dateTime}
        </p>
      </div>
    </div>
  );
};

export default Comment;
