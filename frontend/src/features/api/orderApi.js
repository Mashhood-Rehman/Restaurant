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
            }),
              providesTags: ['Orders'] 
        }),
       updateOrderStatus: builder.mutation({
    query: ({ orderId, status }) => ({
        url: `/orders/updateStatus/${orderId}`,
        method: "PATCH",
        credentials: "include",
        body: { status }
    }),
    invalidatesTags: (result, error, { orderId }) => [
        { type: 'Orders', id: orderId },
        { type: 'Orders', id: 'LIST' }
    ]
})
    })
})

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useUpdateOrderStatusMutation
} = orderApi