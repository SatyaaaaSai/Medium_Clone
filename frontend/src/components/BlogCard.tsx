import { Link } from "react-router-dom";

interface BlogCardTypes {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
  id: string;
}
export const BlogCard = ({
  id,
  authorName,
  publishedDate,
  title,
  content,
}: BlogCardTypes) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
        <div className="flex justify-start items-center">
          <div className="flex justify-center">
            <AvatarComponent name={authorName} />
          </div>

          <div className="font-extralight pl-2 text-sm flex justify-center">
            {authorName}
          </div>
          <div className="pl-2 flex justify-center flex-col  ">
            <Cricle />
          </div>
          <div className="pl-2 text-sm flex justify-center">
            {publishedDate}
          </div>
        </div>
        <div className="px-1 text-xl font-semibold pt-2">{title}</div>
        <div className="px-1 text-base font-thin">
          {content.length > 100
            ? content.slice(0, 100) + "..."
            : content.slice(0, 50) + "..."}
        </div>
        <div className="text-sm font-thin pt-2">{`${Math.ceil(
          content.length / 100
        )} minute read`}</div>
      </div>
    </Link>
  );
};

export function AvatarComponent({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-xs text-gray-600 dark:text-gray-300 flex items-center">
        {name[0]}
      </span>
    </div>
  );
}

export function Cricle() {
  return <div className="h-1 w-1 rounded-full bg-gray-400"></div>;
}
