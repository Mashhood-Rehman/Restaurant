import { apiSlice } from "../apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "getAllProducts",
                method: "GET"
            }),
            validatesTags: ['Products']
        })
    })

})
export const { useGetProductsQuery } = productApi;