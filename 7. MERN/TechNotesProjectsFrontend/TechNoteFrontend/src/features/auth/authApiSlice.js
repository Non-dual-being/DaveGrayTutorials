import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials} //username && password
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled}) {
                try {
                    // const { data } = /** this would be cookie cleared */
                    await queryFulfilled

                    //token to null in local state
                    dispatch(logOut())

                    //clear out cache
                    dispatch(apiSlice.util.resetApiState())
                    } catch (err) {
                    console.log(err);

                    //using dispatch in onquery started enables it to use it without using dispatch in the forms
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            })
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice