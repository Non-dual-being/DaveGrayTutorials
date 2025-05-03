import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'; //sub trekt een tijd af
import axios from 'axios'


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'failed'
    error: null
}

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
        console.log("updatepost err", initialPost)
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState, //shorthand syntax voor initialState: initialState
    reducers: {
        postAdded: {
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
        },
        reactionAdded(state, action){
            const { postId, reaction } = action.payload
            /**
             * redux toolkit genereert een action payload met de volgende structuur
             * { type: 'posts/reactionAdded', payload: {postId: '123', reaction: 'thumbsUp'}}
             */
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
                /**dit is weer een mutatie, echter immer van toolkit lost dit op */
            }
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

                    state.posts = loadedPosts;

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
                    state.posts.push(action.payload)
                })
                .addCase(updatePost.fulfilled, (state, action) => {
                    if (!action.payload?.id){
                        console.log("dit")

                        return;
                        /**
                         * in je payload zit dan de error message die van axios komt
                         * Met deze fake api zou je een foutmelding kunnen binnen krijgen via een http response van 500 bijvoorbeeld
                         * 
                         */
                    }

                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => String(post.id) !== String(id));
                state.posts = [...posts, action.payload];
                });

        }
    
})


export const selectAllPosts = (state) => state.posts.posts; // De eerste 'posts' verwijst naar de slice-key in de Redux store,
// de tweede 'posts' verwijst naar de property binnen de slice state (initialState.posts)
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find(post => String(post.id) === String(postId));
export default postsSlice.reducer
export const { postAdded, reactionAdded } = postsSlice.actions


/**
 * 
 * toolkit maak gebruikt van immer die mutatie vertaalt naar een nieuwe state maken
 * je kan hier ook traditioneel blijven met return [...state, action.payload]
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