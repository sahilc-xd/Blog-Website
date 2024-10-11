import { Skeleton } from "../components/Skeleton";
import { Appbar } from "../components/appbar";
import { BlogCard } from "../components/blogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Appbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Blogs</h1>
        {loading ? (
          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"2nd Feb 2024"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};