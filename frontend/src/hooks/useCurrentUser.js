import { useSelector } from "react-redux";
import { userApi, useGetMeQuery } from "../features/api/userApi";

export const useCurrentUser = () => {
  // Always call the query hook — this ensures RTK Query subscribes to the cached data
  const { data: userData, isLoading, error } = useGetMeQuery();

  // Debug logging
  if (userData) {
    console.log("✅ useCurrentUser: user data from RTK Query:", userData);
  } else if (error) {
    console.error("❌ useCurrentUser: Error fetching user:", error);
  } else if (isLoading) {
    console.log("⏳ useCurrentUser: Loading...");
  }

  // Return the user data if available
  if (userData?.userData) return userData.userData;

  // Fallback to cached selector (if available)
  const selectGetMe = userApi.endpoints.getMe.select();
  const cached = useSelector((state) => selectGetMe(state));
  if (cached?.data?.userData) {
    console.log("✅ useCurrentUser: Returning from cache:", cached.data.userData);
    return cached.data.userData;
  }

  console.log("❌ useCurrentUser: No user data available, returning null");
  return null;
};