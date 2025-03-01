import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize.js';
import useAxiosFetch from '../hooks/useAxiosFetch.js';
import api from '../api/posts.js';

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postBody, setPostBody] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const { width } = useWindowSize(); //destructuring is name based and doesnt mean making a object of it just gets the value out of the key
    const baseUrl = 'http://localhost:3500/posts';
    const navigate = useNavigate();
    const { data, fetchError, isLoading } = useAxiosFetch(baseUrl)
  
  
    useEffect(() => {setPosts(data)}, [data]);
  
    useEffect(() => {
      const filteredResults = search && search.length 
      ? (posts.filter((post) => (
        ((post.body).toLowerCase().includes(search.toLowerCase())) || ((post.title.toLowerCase().includes(search.toLowerCase())))  
      )).sort((a, b) => new Date(b.datetime) - new Date (a.datetime))) 
      : (posts)
      /**sortering op datum sort kijk is b groter dan a (eerdere datum groter getal) dan b eerst */
  
      setSearchResults(filteredResults);
  
    }, [posts, search])
    
  
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

    const handleSubmit  = async (e) => {
    e.preventDefault();
    if ((!postBody || postBody.trim() === '') || (!postTitle || postTitle.trim() === '')) return;

        const newID = posts.length ? Math.max(...posts.map(post => post.id)) + 1 : 1;
        const newDateTime = getFormattedDateTime();

        /**alternatief */
        //let datetime = format(new Date(), 'MMMM dd, yyyy pp')

        const myNewPost = {
        id: String(newID).trim(),
        title: postTitle,
        datetime: newDateTime,
        body: postBody
        }

        try {
        const response = await api.post('/posts', myNewPost);
        setPosts((prevposts) => [...prevposts, response.data]);
        setPostTitle('');
        setPostBody('');
        navigate('/');

        } catch(e){
        console.log(`err : ${e.message}`);
        }
    }

    const handleDelete = async (id) => {
    if (id === null) return;
    if (typeof id !== 'string') id = String(id).trim();
        try{
        await api.delete(`/posts/${id}`);
        setPosts((prevPosts) => 
        prevPosts.filter(post => post.id !== id)
        )
        navigate('/');

    } catch(e) {
        if (e.response) {
        console.log(`data: ${e.response.data}, status: ${e.response.data}`);
        } else {
        console.log(`err: ${e.message}`);
        }
    }

    }

    const handleEdit = async (id) => {
        if (!id) return;
        if (typeof id !== 'string') id = String(id).trim();

        const newDateTime = getFormattedDateTime();
        const updatedPost = { id, title: editTitle, newDateTime, body: editBody}

        try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map((post)=>(
            post.id === updatedPost.id ? {...response.data} : post
        )))
        setEditBody('');
        setEditTitle('');
        navigate('/');

        /** spread operator gebruiken om de referentie naar het api object te verandern, 
         * zo snapt react dat een herender van de component nodig is, 
         * zonder de spread zou react kunnen interpreteren als het zelfde object 
         * ?hoewel de arrat altijd met map een nieuwe obecjts is in de inviduele wijziging als nieuwe referentie toch belangrijk*/

        } catch (error) {
        console.log(`err: ${error.message}`);

        }




    }

    return(
        <DataContext.Provider value={{
            width,
            searchResults,
            posts,
            fetchError,
            isLoading,
            handleSubmit,
            handleEdit,
            handleDelete,
            search, setSearch,
            postTitle, setPostTitle,
            postBody, setPostBody,
            editBody, setEditBody, 
            editTitle, setEditTitle

        }}
       
        > {children}
        </DataContext.Provider>
    )
}

export default DataContext