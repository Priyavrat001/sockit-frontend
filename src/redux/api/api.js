import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config';


const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/`
    }),
    tagTypes: ["Chat", "User", "Message"],

    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "chat/my",
                credentials: "include"
            }),
            providesTags: ["Chat"],
        }),

        searchUsers: builder.query({
            query: (name) => ({
                url: `user/search?name=${name}`,
                credentials: "include"
            }),
            providesTags: ["User"],
        }),

        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/sendrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        getNotificaions: builder.query({
            query: () => ({
                url: "user/notification",
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),

        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/acceptrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["Chat"],
        }),

        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {

                let url = `chat/${chatId}`;

                if (populate) url += "?populate=true"


                return {
                    url: "user/notification",
                    credentials: "include",
                }
            },
            providesTags: ["Chat"],
        }),

        getMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),

        sendAttachment: builder.mutation({
            query: (data) => ({
                url: "chat/message",
                method: "POST",
                credentials: "include",
                body: data
            }),
        }),

        myGroups: builder.query({
            query: () => ({
                url: "chat/my/groups",
                credentials: "include"
            }),
            providesTags: ["Chat"],
        }),

        availableFriends: builder.query({
            query: (chatId) => {

                let url = `user/friends`;

                if (chatId) url += `?chatId=${chatId}`


                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags: ["Chat"],
        }),

        newGroup: builder.mutation({
            query: ({ name, members }) => ({
                url: "chat/new",
                method: "POST",
                credentials: "include",
                body: { name, members }
            }),

            invalidatesTags: ["Chats"]
        }),

        renameGroup: builder.mutation({
            query: ({ chatId, name }) => ({
                url: `chat/${chatId}`,
                method: "PUT",
                credentials: "include",
                body: { name },
            }),
            invalidatesTags: ["Chat"],
        }),

        removeGroupMember: builder.mutation({
            query: ({ chatId, userId }) => ({
                url: `chat/removemember`,
                method: "PUT",
                credentials: "include",
                body: { chatId, userId },
            }),
            invalidatesTags: ["Chat"],
        }),

        addGroupMembers: builder.mutation({
            query: ({ members, chatId }) => ({
                url: `chat/addmembers`,
                method: "PUT",
                credentials: "include",
                body: { members, chatId },
            }),
            invalidatesTags: ["Chat"],
        }),

        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `chat/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"],
        }),

        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/leave/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"],
        }),
    })
});

export default api;

export const {
    useMyChatsQuery,
    useLazySearchUsersQuery,
    useSendFriendRequestMutation,
    useGetNotificaionsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
} = api;