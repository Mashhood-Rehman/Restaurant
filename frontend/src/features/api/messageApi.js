import { apiSlice } from "../apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessages: builder.mutation({
        query : (data) => ({
            url: "/messages/send-message",
            method: "POST",
            body: data,
            credentials: "include",
        }),
        invalidatesTags: ["Messages"],
    }),
    getMessages: builder.query({
      query: (chatId) => ({
        url: `/messages/get-conversation/${chatId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Messages"],
    }),
  }),
});

export const { useSendMessagesMutation, useGetMessagesQuery } = messageApi;