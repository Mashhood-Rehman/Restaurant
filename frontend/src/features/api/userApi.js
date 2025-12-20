import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUsers: builder.mutation({
      query: (userData) => ({
        url: "/users/createUser",
        method: "POST",
        body: userData,
      })
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/getMe",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User", "Auth"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/users/getAllUsers",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllCustomers: builder.query({
      query: () => ({
        url: "/users/getAllCustomers",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUserByID: builder.mutation({
      query: ({data, id}) => ({
        url: `/users/updateuserbyid/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery, useGetAllUsersQuery, useGetAllCustomersQuery, useCreateUsersMutation, useUpdateUserByIDMutation
 } = userApi;
