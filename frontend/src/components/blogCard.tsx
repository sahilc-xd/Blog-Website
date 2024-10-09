import { Link } from "react-router-dom";
interface blogCardprops {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: blogCardprops) => {
  return (
    <Link to={`/blogs/${id}`}>
      <div className="border-b border-slate-200 p-4 pb-4 cursor-pointer">
        <div className="flex">
          <Avataar name={authorName} size={"small"}></Avataar>

          <div className="font-light pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col  pl-2">
            <Circle></Circle>
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-sm font-thin">{content.slice(0, 100) + "..."}</div>
        <div className=" text-slate-500 text-sm font-thin pt-3 ">{`${Math.ceil(
          content.length / 100
        )} minute(s) read `}</div>
      </div>
    </Link>
  );
};

export function Avataar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={` relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-8 h-8"
      }`}>
      <span
        className={`${
          size === "small" ? "text-xs" : "text-3xl pb-2"
        }  text-gray-600 dark:text-gray-300`}>
        {name[0]}
      </span>
    </div>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
