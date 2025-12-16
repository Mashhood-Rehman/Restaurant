import { useGetMeQuery } from "../features/api/userApi";

export const useCurrentUser = () => {
  const { data, isLoading, isError } = useGetMeQuery();


  if (isError) {
    console.log("❌ useCurrentUser: Error fetching user data", isError);
    return null;
  }

  if (data) {
    console.log("✅ useCurrentUser: User data:", data);
    return data;
  }

};