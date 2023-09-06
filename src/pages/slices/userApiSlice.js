import { apiSlice } from "./apiSlice";

const USER_LOGIN = '/register'

export const userApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_LOGIN}`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useLoginMutation } = userApiSlice;