import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  console.log(postId);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "patch post title" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, isError, error } = useQuery(
    ["comment", post.id],
    () => fetchComments(post.id),
    { staleTime: 10000 }
  );

  // 변이 Mutation
  const deleteMutation = useMutation((postId) => deletePost(postId));

  if (isLoading) return <>로딩.......</>;
  if (isError) return <>{error.toString() + "......."}</>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>

      <button>Update title</button>
      {deleteMutation.isError && <span>삭제 에러 메시지</span>}
      {deleteMutation.isLoading && <span>삭제 로딩 메시지</span>}
      {deleteMutation.isSuccess && <span>삭제 성공 메시지</span>}

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
