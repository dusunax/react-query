import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
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
    { method: "PATCH", data: { title: "게시물 제목 수정됨" } }
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
  const updateMutation = useMutation((postId) => updatePost(postId));

  // 조건부 랜더링
  if (isLoading) return <>로딩.......</>;
  if (isError) return <>{error.toString() + "......."}</>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>

      <button onClick={() => deleteMutation.mutate(post.id)}>삭제</button>
      <button onClick={() => updateMutation.mutate(post.id)}>수정</button>

      {deleteMutation.isError && <p>삭제 에러 메시지</p>}
      {deleteMutation.isLoading && <p>삭제 로딩 메시지</p>}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>삭제 성공 메시지</p>
      )}

      {updateMutation.isError && <p>제목 수정 실패!</p>}
      {updateMutation.isLoading && <p>제목 수정 로딩...</p>}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>제목 수정 성공~</p>
      )}

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
