import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: "users/getMe",
                method: "GET",
                credentials: "include"

            })
        })
    })
})

export const {useGetMeQuery} = userApi;