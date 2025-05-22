import {  createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => './users',
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                {type: 'User', id: 'LIST'},
                ...result.ids.map(id => ({type: 'User', id}))
            ]

        })
    })
})





export const {
    useGetUsersQuery
} = extendedApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)


export const {
    selectAll: selectAllUsers,
    selectById: selectUsersById
} = usersAdapter.getSelectors(state => selectUsersData (state) ?? initialState)

/**
 * deze selectors zijn toehankelijk via entityAdapter en hoef je niet zelf te maken
 * 
 */