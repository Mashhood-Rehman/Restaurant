import { useSelector } from "react-redux";
import { userApi, useLazyGetMeQuery } from "../features/api/userApi";

export const useCurrentUser = () => {
  // Use lazy query to prevent automatic request on component mount
  const [trigger] = useLazyGetMeQuery();

  // Use selector to check cached data without triggering a request
  const selectGetMe = userApi.endpoints.getMe.select();
  const cached = useSelector((state) => selectGetMe(state));
  
  if (cached?.data?.userData) {
    console.log("✅ useCurrentUser: Returning cached user data:", cached.data.userData);
    return cached.data.userData;
  }

  console.log("❌ useCurrentUser: No user data available, returning null");
  return null;
};