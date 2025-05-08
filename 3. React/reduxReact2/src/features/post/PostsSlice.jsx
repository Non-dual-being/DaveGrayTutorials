import { 
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'
import { sub } from 'date-fns'; //sub trekt een tijd af
import axios from 'axios'


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postsAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading' | 'failed'
    error: null,
    count: 0
});

/**
 * previous 
 * const initialState = {
 *  posts: [],
    status: 'idle', // 'idle' | 'loading' | 'failed'
    error: null,
    count: 0
});
 */

/**
 * you get automatically a normalised object for the initialstate with the adapter
 * You recieve a array with the ids and then you have that entities object that that contains the posts 
 * 
 */

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data
    
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data
})
/**
 * redux toolkit zorgt  zelf voor pending en rejected acties
 * response.data wordt als payload aan de fulfilled reducer toegeveogd
 * posts/fetchPosts noemen we een typen naam die hoort bij de asynchrone functie
 * redux toolkit zet de data in een action object met structuur { type: 'posts/fetchPosts/fulfilled', payload: responsed.data}
 */

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost


    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data;
    } catch (err){
         console.log(err);
        /**
         * dit is om de fake api id's tot 100 posts gaat
         * post 101 kun je dus niet update
         * Daarom stuur je hier gewoon je lokale post terug in de finally hier om onafhanelijk te blijven van de api
         * 
         */
    } finally {
        return initialPost;
        /**
         * !in een daadwerkelijke app zou je dit niet doen
         */
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response?.status} : ${response?.statusText}`;
    } catch (err) {
        return err.message;

    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState, //shorthand syntax voor initialState: initialState
    reducers: {
     /*    postAdded: {
            reducer(state, action){
                state.posts.push(action.payload)
            },
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        }, */
        reactionAdded(state, action){
            const { postId, reaction } = action.payload
            /**
             * redux toolkit genereert een action payload met de volgende structuur
             * { type: 'posts/reactionAdded', payload: {postId: '123', reaction: 'thumbsUp'}}
             */
            const existingPost = state.entities[postId];

            /**
             * todo: previous it was existingonst = state.post.find(post => post.id = postid)
             */

            if (existingPost) {
                existingPost.reactions[reaction]++
                /**dit is weer een mutatie, echter immer van toolkit lost dit op */
            }
        },
        increaseCount(state, action){
            state.count = state.count + 1;
        }
    },
        extraReducers(builder){
            builder
                .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading'
                    //status naar loading
                })
                .addCase(fetchPosts.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    let min = 1;
                    const loadedPosts = action.payload.map(post => ({
                        ...post,
                        date: sub(new Date(), {minutes: min++}).toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }));

                    postsAdapter.upsertMany(state, loadedPosts);

                    // previous state.posts = state.posts.concat(loadedPosts);

                    /**
                     * Geen push maar concat
                     * Maakt een nieuwe array aan met de toevoegde elementen
                     * Nieuwe array wordt geretourneerd met de nieuwer elementen
                     * ALs er al eleementen in de oude array zaten, worden die meengenomen
                     */
                })
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message
                })
                .addCase(addNewPost.fulfilled, (state, action) => {
                    if (state.posts.length > 0) {
                        const maxId = Math.max(...state.posts.map(post => post.id));
                        action.payload.id = maxId + 1;
                    } else {
                        action.payload.id = 1;
                    }
                    action.payload.date = new Date().toISOString();
                    action.payload.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    // prev state.posts.push(action.payload)
                    postsAdapter.addOne(state, action.payload);

                })
                .addCase(updatePost.fulfilled, (state, action) => {
                    if (!action.payload?.id){
                        
                        return;
                        /**
                         * in je payload zit dan de error message die van axios komt
                         * Met deze fake api zou je een foutmelding kunnen binnen krijgen via een http response van 500 bijvoorbeeld
                         * 
                         */
                    }

                    //const { id } = action.payload;
                    action.payload.date = new Date().toISOString();
                    //const posts = state.posts.filter(post => String(post.id) !== String(id));
                    //state.posts = [...posts, action.payload];
                    postsAdapter.upsertOne(state, action.payload);
                })
                .addCase(deletePost.fulfilled, (state, action) => {
                    if (!action.payload?.id){
                        return
                    }

                    const { id } = action.payload;
                    //const posts = state.posts.filter(post => String(post.id) !== String(id));
                    //state.posts = posts;
                    postsAdapter.removeOne(state, id);
                })

        }
    
})


/*
todo:export const selectAllPosts = (state) => state.posts.posts 
* De eerste 'posts' verwijst naar de slice-key in de Redux store,
*de tweede 'posts' verwijst naar de property binnen de slice state (initialState.posts)
*/

/* 
todo:export const selectPostById = (state, postId) => state.posts.posts.find(post => String(post.id) === String(postId)); 
*/


//getSelectors creates these selectors and we rename them with aliases using destructuring

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

/**
 * 
 * de selectall enzover zijn standaard gegenereerd door de adpater
 * De aliases zzijn bedoeld om in lijn te zijn met de vorige benamingen voor de intrede van de adapter
 */






export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

export const selectPostByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => String(post.userId) === String(userId))
)

export default postsSlice.reducer
export const { increaseCount, reactionAdded } = postsSlice.actions


/**
 * 
 * toolkit maak gebruikt van immer die mutatie vertaalt naar een nieuwe state maken
 * je kan hier ook traditioneel blijven met return [...state, action.payload]
 * in ons voorbeeld pakt je alle posts en pak je simpel weg een anonime fubctue die niet uit de state haalt
 * maar gewoon een userID als exterene paramter
 * Er wordt gekeken zijn de posts of de user id veranderd, nee dan zelfde resyultaat gebruiken
 * 
 * */



/**
 * opniew shorthandend ... ivp postAdded: function(state, action) enzoverder
 */

/**
 * create slice van redux tookit creeert bij het aanmaken van de slice een postSlice.reducer en eenn postSlice.actiomns
 * In de reducer zit 1 algemene functie die de state bevat en alle acties, op de achtegrond met redux toolkit een switch case om de verschillende acties aan te spreken
 * Bij voorbeeld posts/postadded
 * Op basis van elke reducer functie genereert redux in de .actions eeen action create functie aan
 * Redux regelt dus het aanmaken van het payload object als het toevoegen van dit object aan de state
 */

/**
 * ?-----------[reducers] ----------------------
 * Hier zit alle interne synchrone functies en logica aangemaakt in de slice zef
 * Actions creators die via door redux zelf aangemaakt switch case statemens kunnen worden aangeroepmn
 * 
 * ?-------------[extraReducers]-----------------------
 * externe logica zoals createasyncthunk functie
 * Type niet bepaald door swithc case dus vandaar addCase (type, reducer)
 * De payload in de extra reducer komt van de retun in je createAsyncthunk
 * 
 */


/**
 * ?in je slice pak je state.posts de posts array omdat je binnen je slice werkt
 * todo: buiten je slice bij de export heb je state.posts.posts nodig omdat je hier vanuit de store werkt
 */


/** -------------{[createSelector uitleg]}
 * todo: doel is memoization: als de iputwaarden niet veranderen wordt er niet opnieuw berekend
 * algememe structuur createSelector [inputSelectors], outPutFunction
 * De input selector is 1 of meer functie die date uit je state halen
 * Outoutfunction gebruikt de resultaten van de je input of een berekening of filtering uit te voeren
 * Belangrjik om te beseffen is dat de input selectoor de data ophalen en onthouden maar niet veranderen 
 * Dus je haalt uit je state de data op en gaat het lezen, maar je veranderd niets, om je dataflow in tact te houden
 * 
 */