import { createStore, action, thunk, computed } from 'easy-peasy'
import api from './api/posts';

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    postTitle: '',
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    postBody: '',
    setPostBody: action((state, payload) => {
        state.postBody = payload;
    }),
    editTitle: '',
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    search: '',
    setSearch: action((state, payload) =>{
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => (id) => {return state.posts.find((post) => (post.id).toString() === id)}),
    getNewId: computed((state) => () => {return state.posts.length ? Math.max(...state.posts.map(post => post.id)) + 1 : 1;}),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        const getFormattedDateTime = () => {
            const now = new Date()
            return now.toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true
        
            })
          }
          const DateTime = getFormattedDateTime();
          newPost.datetime = DateTime;
        try {
        const response = await api.post('/posts', newPost);
        actions.setPosts([...posts, response.data]);
        actions.setPostTitle('');
        actions.setPostBody('');
        } catch(e){
        console.log(`err : ${e.message}`);
        }

    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const { posts } = helpers.getState();
        try{
            await api.delete(`/posts/${id}`);
            actions.setPosts(posts.filter((post) => post.id !== id))  
        } catch(e) {
            if (e.response) {
            console.log(`data: ${e.response.data}, status: ${e.response.data}`);
            } else {
            console.log(`err: ${e.message}`);
            }
        }
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const getFormattedDateTime = () => {
            const now = new Date()
            return now.toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true
        
            })
          }
        const { posts } = helpers.getState();
        const { id } = updatedPost;
        const dateTime = getFormattedDateTime();
        updatedPost.datetime = dateTime;
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            actions.setPosts(posts.map((post)=>(
                post.id === updatedPost.id ? {...response.data} : post
            )))
            actions.setEditBody('');
            actions.setEditTitle('');
    
            /** spread operator gebruiken om de referentie naar het api object te verandern, 
             * zo snapt react dat een herender van de component nodig is, 
             * zonder de spread zou react kunnen interpreteren als het zelfde object 
             * ?hoewel de arrat altijd met map een nieuwe obecjts is in de inviduele wijziging als nieuwe referentie toch belangrijk*/
    
            } catch (error) {
            console.log(`err: ${error.message}`);
    
            }
    })
})