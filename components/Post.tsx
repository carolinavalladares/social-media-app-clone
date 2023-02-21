import { PostType } from "@/types/types";
import { convertToLocalTime } from "@/utils/convertToLocalTime";

interface Props {
  post: PostType;
  children?: JSX.Element | JSX.Element[];
}

const Post = ({ post, children }: Props) => {
  const { content, author, createdAt, updatedAt } = post;

  return (
    <div className="bg-white shadow-md p-4 mt-4">
      {/* Top container */}
      <div className="flex items-center gap-2">
        {/* picture container */}
        <div className="h-10 w-10 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center">
          {author.profileImage && (
            <img src={`${author.profileImage}`} alt="profile image" />
          )}
        </div>
        {/* username */}
        <div className="flex items-center gap-1 ">
          <h4 className="font-semibold m-0 text-sm leading-none ">
            {author.displayName}
          </h4>
          <p className=" m-0 text-sm leading-none text-slate-400">
            @{author.username}
          </p>
        </div>
      </div>
      {/* content */}
      <div className="mt-2 ml-2">{content}</div>

      {/* date container */}
      <div className="mt-2 ml-2 flex items-center">
        {/* timestamp */}
        <p className="m-0 text-xs leading-none text-slate-400">
          {convertToLocalTime(createdAt).dateTime}
        </p>

        {updatedAt && (
          <>
            <span className="inline-block h-1 w-1 bg-slate-400 rounded mx-2"></span>
            <p className="m-0 text-xs leading-none text-slate-400">
              Edited: {convertToLocalTime(updatedAt).dateTime}
            </p>
          </>
        )}
      </div>

      {children && <div className="border-t pt-2 mt-2 pl-2">{children}</div>}
    </div>
  );
};

export default Post;
