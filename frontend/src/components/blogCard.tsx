import { Link } from "react-router-dom";

interface BlogCardProps {
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
}: BlogCardProps) => {
  return (
    <Link to={`/blogs/${id}`}>
      <div className="border border-slate-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer bg-white">
        <div className="flex items-center mb-4">
          <Avatar name={authorName} size="small" />
          <div className="ml-3 flex items-center">
            <span className="font-medium text-sm text-gray-700">{authorName}</span>
            <Circle />
            <span className="text-sm text-gray-500">{publishedDate}</span>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-300">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{content}</p>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{`${Math.ceil(content.length / 100)} minute read`}</span>
        </div>
      </div>
    </Link>
  );
};

export const Avatar = ({ name, size = "small" }: { name: string; size: "small" | "big" }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-grey-600 hover:bg-white rounded-full ${
        size === "small" ? "w-10 h-10" : "w-12 h-12"
      } border-2 border-gray-200 hover:border-green-700 transition-colors duration-200`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-lg"
        } font-medium text-grey group-hover:text-green-700 transition-colors duration-200`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};
export const Circle = () => {
  return <div className="h-1 w-1 rounded-full bg-gray-400 mx-2"></div>;
};