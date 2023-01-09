import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  const loadingEl = <div className="loading">로딩 중입니다</div>;
  if (isLoading) return loadingEl;
  if (isError) return <div>에러 : {error}</div>;

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {isFetching && loadingEl}
        {data.pages.map((pageData) =>
          pageData.results.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColorname={person.hairColorname}
              eyeColor={person.eyeColor}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
