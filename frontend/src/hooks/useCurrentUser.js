import { useSelector } from "react-redux";
import { userApi, useGetMeQuery } from "../features/api/userApi";

/**
 * Returns the current logged-in user or null.
 * This hook will trigger `useGetMeQuery` (so callers don't need to fetch manually)
 * and also reads the RTK Query cache as a fallback.
 */
export const useCurrentUser = () => {
  // Trigger the query (will use cache if available)
  const { data:userData } = useGetMeQuery();
console.log("data is",userData)
  // Prefer the live query result
  if (userData?.userData) return userData.userData;

  // Fallback to reading the cached value from the store
  const selectGetMe = userApi.endpoints.getMe.select();
  const cached = useSelector((state) => selectGetMe(state));
  return cached?.data?.userData ?? null;
};