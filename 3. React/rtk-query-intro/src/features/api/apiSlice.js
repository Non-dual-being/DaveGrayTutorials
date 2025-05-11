import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            })
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            })
        }),
        deleteTodo: builder.mutation({
            query: ( {id }) => ({
                url: `todos/${todo.id}`,
                method: 'DELETE',
                body: id
            })
        }),

    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice


/**
 * Naamgeving is hier niet random
 * Het use use + naam met camelCase en dan idd Quer of Mutation of wat de aangesproken methode dan ook is
 */


/**
 * ✅ RTK Query slice met createApi
 *
 * Wat gebeurt er in deze code?
 * ------------------------------
 * 1. createApi:
 *    - Dit is een functie van RTK Query die automatisch Redux logica genereert
 *      voor data ophalen, cachen, en statusbeheer.
 *
 * 2. reducerPath: 'api'
 *    - Hiermee geef je een unieke sleutel waarmee deze slice in je Redux store
 *      geregistreerd wordt. Meestal gewoon 'api' tenzij je meerdere API's gebruikt.
 *
 * 3. baseQuery:
 *    - fetchBaseQuery is een soort wrapper om fetch(). 
 *    - baseUrl stelt het standaardadres in waar al je endpoints aan worden geplakt.
 *      In dit geval zal '/todos' dus vertaald worden naar 'http://localhost:3500/todos'.
 *
 * 4. endpoints:
 *    - Hier definieer je alle API-aanroepen.
 *    - Elke endpoint wordt een functie (zoals getTodos) die je later in je component
 *      kunt gebruiken via een custom hook.
 *
 * 5. builder.query():
 *    - Dit is een 'read-only' endpoint (HTTP GET).
 *    - Je gebruikt deze voor het ophalen van data.
 *    - Met query geef je aan wat het pad is na baseUrl.
 *
 * Wat dit oplevert:
 * ------------------
 * RTK Query genereert automatisch een hook zoals:
 *    const { data, error, isLoading } = useGetTodosQuery()
 * 
 * Die kun je direct in je React component gebruiken voor dataloading, errors, etc.
 */
