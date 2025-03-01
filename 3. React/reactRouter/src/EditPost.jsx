import { useState, useEffect } from "react"
import { useParams, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext.jsx'


const EditPost = () => {
    const [editBody, setEditBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const { posts, setPosts, navigate, getFormattedDateTime, api} = useContext(DataContext);
    const { id } = useParams(); /**deconstrueert uit de url de id (/posts/:id) */
    const post = posts.find(post => post.id.toString() === id)
    //post is in de dependcie is gwn een constate, hoef niet state te zijn

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

   useEffect(() => {
    if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
    }
   }, [post]) 

    return(
        <main className="NewPost">
            { (post) 
            ? 
            (
            <>
            <h2>Edit post</h2>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="editTitle">Edit Title: </label>
                <input 
                    required
                    type="text"
                    id="editTitle"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} 
                />
            
                <label htmlFor="editBody">Edit Body</label>
                <textarea 
                    required
                    id="editBody"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)} 
                />
                <button 
                type="submit"
                onClick={() => handleEdit(post.id)}
                className="editPostButton"
                >Edit Post
                </button>
            </form>
            </>
            ) 
            : 
            (
            <>
            <h2>Post not found</h2>
            <p className="noPostsPara">No post found</p>
            <NavLink to="/"><p>Visit our HomePage</p></NavLink>
            </>
            )
            } 
        </main>
    )
}

export default EditPost
