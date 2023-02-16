import { PostType } from "@/types/types";

interface Props {
  post: PostType;
}

const Post = ({ post }: Props) => {
  const { content, author } = post;

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
        <div>
          <h4 className="font-semibold m-0 text-sm leading-none mb-1">
            {author.displayName}
          </h4>
          <p className=" m-0 text-sm leading-none text-slate-400">
            @{author.username}
          </p>
        </div>
      </div>
      {/* content */}
      <div className="mt-2 ml-2">{content}</div>
    </div>
  );
};

export default Post;
