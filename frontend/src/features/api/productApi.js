import { apiSlice } from "../apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createProduct: builder.mutation({
  query: (data) => ({
    url: "/products/productcreate",
    method: 'POST',
    body: data, // FormData object
    // DO NOT set headers here — let the browser handle it
  }),
  invalidatesTags: ['Products']
}),
        getProducts: builder.query({
            query: () => ({
                url: "/products/getAllProducts",
                method: "GET"
            }),
            validatesTags: ['Products']
        }),
      updateProduct: builder.mutation({
  query: ({ data, id }) => ({
    url: `/products/updateProduct/${id}`,
    method: "PUT",
    body: data, // FormData object
    // DO NOT set headers here
  }),
  invalidatesTags: ['Products']
}),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/deleteProducts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Products']
        }),
    })

})
export const {useCreateProductMutation, useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation } = productApi;