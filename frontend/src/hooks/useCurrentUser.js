import { useGetMeQuery } from "../features/api/userApi";

export const useCurrentUser = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    console.log("⏳ useCurrentUser: Loading user data...");
    return null;
  }

  if (isError) {
    console.log("❌ useCurrentUser: Error fetching user data");
    return null;
  }

  if (data?.userData) {
    console.log("✅ useCurrentUser: User data:", data.userData);
    return data.userData;
  }

  console.log("❌ useCurrentUser: No user data available");
  return null;
};