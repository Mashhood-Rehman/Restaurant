  import { apiSlice } from "../apiSlice";

  export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      signup: builder.mutation({
        query: (data) => ({
          url: "/auth/signup",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Auth"],
      }),

      login: builder.mutation({
        query: (data) => ({
          url: "/auth/login",
          method: "POST",
          body: data,
          credentials: "include"
        }),
        invalidatesTags: ["Auth", "User"],
      }),
        logout: builder.mutation({
        query: () => ({
          url: '/auth/logout',
          method: 'POST',
        }),
        invalidatesTags: ['User'],
      }),
    }),
  });

  export const { useSignupMutation, useLoginMutation, useLogoutMutation } = authApi;
