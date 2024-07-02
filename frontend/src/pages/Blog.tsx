import { Appbar } from "../components/AppBar";
import { FullBlogCard } from "../components/FullBlogCard";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks/useblogs";
import { useParams } from "react-router-dom";
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: String(id),
  });
  if (loading) {
    return (
      <div>
        <div>
          <Appbar />
        </div>

        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullBlogCard blog={blog} />
    </div>
  );
};
