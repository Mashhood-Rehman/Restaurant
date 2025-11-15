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
        url: "users/getMe",
        method: "GET",
        credentials: "include",
      }),
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
  }),
});

export const { useGetMeQuery, useGetAllUsersQuery, useGetAllCustomersQuery, useCreateUsersMutation
 } = userApi;
