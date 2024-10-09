import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
// import { Skeleton } from "../components/Skeleton";
import { Appbar } from "../components/appbar";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || " " });
  if (loading || !blog) {
    return (
      <div>
        <Appbar />

        <div className="h-screen flex flex-col justify-center ">
          <div className="flex justify-center pb-20">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog}></FullBlog>
    </div>
  );
};
