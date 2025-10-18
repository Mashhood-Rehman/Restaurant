import { apiSlice } from "../apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: "/createOrder",
                method: "POST",
                credentials: "include",
                body: orderData
            }),
            invalidatesTags: ['Orders']    
        })
    })
})

export const {useCreateOrderMutation} = orderApi