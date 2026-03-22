import { useGetMeQuery } from "../features/api/userApi";

export const useCurrentUser = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  return {
    currentUser: data,
    isLoading,
    isError
  };
};