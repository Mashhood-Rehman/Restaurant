import { apiSlice } from "../apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: "/orders/createOrder",
                method: "POST",
                credentials: "include",
                body: orderData
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: "/orders/getOrders",
                method: "GET",
                credentials: "include",
            })
        })
    })
})

export const {useCreateOrderMutation, useGetOrdersQuery} = orderApi