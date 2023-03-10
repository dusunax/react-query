import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 3;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

export function Posts() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const isMin = currentPage <= 0;
  const isMax = currentPage >= maxPostPage - 1;

  useEffect(() => {
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery(["posts", nextPage], () => fetchPosts(nextPage));
  }, [currentPage, queryClient]);

  const { data, isError, isLoading, isFetching } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 10000,
      keepPreviousData: true,
    }
  );
  if (isFetching) return <div>패칭패칭</div>;
  if (isLoading) return <div>로딩로딩</div>;
  if (isError) return <div>에러에러</div>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={isLoading | isMin ? "disabled" : ""}
          onClick={() => (isMin ? "" : setCurrentPage(currentPage - 1))}
        >
          Previous page
        </button>

        <span>Page {currentPage + 1}</span>

        <button
          disabled={isLoading | isMax ? "disabled" : ""}
          onClick={() => (isMax ? "" : setCurrentPage(currentPage + 1))}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
