
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";



const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})


/**
 * normalized data
 * dat wil zeggen een ids array en in dit geval gesorteerd op datum
 * en dan een entities object met id als sleutel en het volledige object als waarde
 * 
 */
const initialSate = postsAdapter.getInitialState();

/**
 * je initiatal state is puur { ids: [], entities: {}}
 */

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => './posts',
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                return postsAdapter.setAll(initialSate, loadedPosts);
                /**
                 * hier wat je data key gevuld met de data
                 */
            },
            providesTags: (result, error, arg) => [
                {type: 'Post', id: 'LIST'},
                ...result.ids.map(id => ({ type: 'Post', id}))
            ]

            /**
             * result is de geretourneerde waarde van transformResponse
             * Dus je genormaliseerde data met de ids array
             * Je entities object met de posts (dat is in essentie je data uit dbjson met de datum en reactions erbij doro de map)
             * 
             */

        }),
        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                 let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialSate, loadedPosts)
                //dit overschrijft de getpost niet, omdat deze een aparte cachestate mee krijgt vanuit redux
            },
            providesTags: (result, error, arg) => {
                return [
                    ...result.ids.map(id => ({ type: 'Post', id}))
                ]
            }
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST"}
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id}
                //the argument is your initialPost
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/post/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id}
                //the argument is your initialPost
            ]

        }),
        // this is what we calle a optimistic update in the ui the cache will update imidiatly and the the network request will be send, onError it wil undo
        addReaction: builder.mutation({
            query: (fullPost) => ({
                url: `posts/${Number(fullPost.id)}`,
                method: 'PATCH',
                // In a real pp, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more then once
                body: fullPost
            }),
            async onQueryStarted ( fullPost, { dispatch, queryFulfilled }) {
                // zijn twee losse object die binnen in gedeconstrueerd worden
                //updateQueryData requires the eindpoint name an cachhe key arguments
                //so it knows which piece of cache state to update
                //queryFulfilled is a promise
                //im je optimistische update doe je aan de reacties en in je netwerk doe je het volledig object
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[fullPost.id]
                        if (post) post.reactions = fullPost.reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }

            },

        })

    })
})


export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation,

} = extendedApiSlice


/**
 * de use Get is niet random maar opgebouwd als naam de rtk query zelf
 * 
 */


export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

/**
 * dit retourneert een selector op basis van memorisatie
 * in de functie zit automatisch op basis van de state de getposts query aanroepen die het volledige data object teruggeeft
 * De memorisatie zit hm erin dat als dat veranderd, dat ie dan pas rerenderd
 * hioer zit naast je data ook je isError, je isloading etc in 
 */

const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
    
)

/**
 * alleen de data eruit filteren anders heb je ook je fulfilled , error etc info
 */





//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialSate)

/**
 * de eerte state hier is je volledige redux store dus je data maar ook je queries, en je mutatiosn
 */



/** [RTK QUERY] eindpoint getposts in detail 
 * 
 * *LAAG 1 builder.query
 * getPosts: builder.query 
 * Het is een GET VERZOEK dus data ophalen - Automatisch cachebeheer 
 * /post is de url die moet worden opgeroepen
 * hoe data moet worden verwerkt (dus de transform) met de map
 * En welke data deze query levert aan de chacke via providesTags
 * 
 * *LAAG 2 ProvideTags
 * ProvideTags is een functie aan RTK queryt uitlegt: welke stuke data wordt aan levert dit enndpoint aan de chache
 * Dit is belangrijk zodat als je iets veranderd aan de data je de cache kunt invalideren
 * Een geinvalideerde chacke vraagt om een refresh via de get methode
 * 
 * *Laag 3 Wat is type en id
 * type is de categorie van de tage zoals post user of comment
 * id is het specifieke object of groep binnen de categorie zoals LIST of 123
 * Bedoeld om te bepalen welke data in de chache zit en welke queries opniew moeten
 * 
 * *Laag 4 conventies maar geen referentiele kwaliteit
 * de id list is puur een afspraak, er niet niets wat list koppelt aan de gehele lijst, anders dan hoe je die id gaat gebruiken bij het invalideren
 * dus als je een individuele post gaat refreshen of gaat invalideren doe je dat ook hier met een zelgekozen tag
 * Maar als de individuele post gewoon neerzet bij de functie die de gehele lijst opnieuw ophaalt, dan doet dat precies hetzelfde als de id list
 * 
*/