import { Blog } from "../hooks/useblogs";
import { Appbar } from "./AppBar";
import { AvatarComponent } from "./BlogCard";
export const FullBlogCard = ({ blog }: { blog: Blog }) => (
  <div>
    <Appbar />
    <div className="flex justify-center">
      <div className="grid grid-cols-12 pt-[60px] px-28 max-w-screen-2xl">
        <div className="col-span-8">
          <div className="text-3xl font-extrabold">{blog.title}</div>
          <div className="text-slate-300 pt-2">posted on 3rd December</div>
          <div className="">{blog.content}</div>
        </div>
        <div className="col-span-4">
          <div className="text-slate-500 text-xl">Author</div>
          <div className="flex">
            <div className="pr-4 flex flex-col justify-center">
              <AvatarComponent name={blog.author.email.split("@")[0]} />
            </div>

            <div>
              <div className="text-sm font-bold">
                {blog.author.email.split("@")[0]}
              </div>
              <div className="pt-2 text-slate-500">
                Random ability of the Author who are trying to the catch tye the
                author Attention....
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
