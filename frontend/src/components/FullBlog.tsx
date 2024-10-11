import { Blog } from "../hooks";
import { Appbar } from "./appbar";
import { Avatar } from "./blogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
          <div className="col-span-12 md:col-span-8">
            <div className="text-5xl font-extrabold mb-6">{blog.title}</div>
            <div className="text-slate-500">Post on 2nd December 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-12 md:col-span-4 pt-8 md:pt-0 md:pl-8">
            <div className="text-slate-600 text-lg mb-2">Author</div>
            <div className="flex items-center">
              <div className="pr-4">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
