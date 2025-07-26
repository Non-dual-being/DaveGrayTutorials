import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({

    })
})



/**
 * apiSlice met fetchBaseQuery
 * ----------------------------
 * Deze slice gebruikt fetchBaseQuery als baseQuery, wat het volgende mogelijk maakt:
 * 
 * ✅ Base URL injectie:
 *    Alle endpoints gebruiken automatisch de base URL 'http://localhost:3500',
 *    dus je hoeft enkel het pad (zoals '/users') te specificeren in je query/mutation.
 * 
 * ✅ Automatisch JSON-verwerking:
 *    Responses worden automatisch geparsed naar JSON (net als fetch().json()).
 * 
 * ✅ Error handling:
 *    Foutcodes zoals 404 of 500 worden netjes doorgegeven aan je component via RTK Query.
 * 
 * ✅ Headers aanpassen:
 *    Via 'prepareHeaders' kun je headers instellen, zoals Authorization tokens,
 *    die dynamisch uit je Redux store komen (bijv. getState().auth.token).
 * 
 * ✅ Minder boilerplate:
 *    Je hoeft geen fetch(), try-catch of JSON.parse te schrijven in elk endpoint.
 * 
 * ✅ Te combineren met providesTags / invalidatesTags voor caching!
 * 
 * fetchBaseQuery is ideaal als je:
 * - Snel een REST API wil integreren
 * - Geen externe dependencies (zoals axios) wil
 * - Een simpele maar uitbreidbare basis nodig hebt
 */
