import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface FetchDataProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}

const useFetchData = <T>(props: FetchDataProps<T>): UseQueryResult<T> => {
  const { queryKey, queryFn } = props;

  return useQuery({
    queryKey,
    queryFn,
  });
};

export default useFetchData;
