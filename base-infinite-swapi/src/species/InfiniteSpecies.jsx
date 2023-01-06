import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery(
      "sw-species",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      { getNextPageParam: (lastPage) => lastPage.next || undefined }
    );

  if (isLoading) return <div>로딩 중입니다.</div>;
  if (isError) return <div>에러 : {error.toString()}</div>;

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data.pages.map((pageData) => {
        return pageData.result.map((species) => {
          return (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.averageLifespan}
            />
          );
        });
      })}
    </InfiniteScroll>
  );
}
