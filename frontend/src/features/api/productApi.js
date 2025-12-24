import { apiSlice } from "../apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/products/productcreate",
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products']
        }),
        getProducts: builder.query({
            query: () => ({
                url: "/products/getAllProducts",
                method: "GET"
            }),
            validatesTags: ['Products']
        })
    })

})
export const {useCreateProductMutation, useGetProductsQuery } = productApi;