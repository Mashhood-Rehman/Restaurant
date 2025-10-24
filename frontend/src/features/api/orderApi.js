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
        }),
        updateOrderStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/orders/updateStatus/${orderId}`,
                method: "PATCH",
                credentials: "include",
                body: { status }
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useUpdateOrderStatusMutation
} = orderApi