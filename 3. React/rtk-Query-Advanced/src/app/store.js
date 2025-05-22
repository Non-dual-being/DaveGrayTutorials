import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

/**
 * *createAPi geneert een opbject met 
 * .reducer -> de RTK Query reducer (beheert de queries en mutaties)
 * .middleware -> de RTK query middleware (voor side effect en caching)
 * .endpoints toegang tot alle genereerde endpoints
 * .reducerpath de string api of wat je zelf instelt
 * de haken zijn een computed value dus je haalt de waardee uit apiSLice.reducerPath wat in dit geval api is 
 * !zonder halen zou je letterlijk de key apiSlice.reducerpath hebben
 * 
 */

/**
 * “De apiSlice.reducer maakt gebruik van de endpointlogica die ik definieer in mijn RTK Query slice.
Ik schrijf dus de bronlogica waarop de reducer opereert, ook al genereert RTK Query de reducer zelf.”
 * 
 */