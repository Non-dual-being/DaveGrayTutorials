import { useEffect } from "react"
import { useParams, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext.jsx'


const EditPost = () => {
    const { posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle } = useContext(DataContext);
    const { id } = useParams(); /**deconstrueert uit de url de id (/posts/:id) */
    const post = posts.find(post => post.id.toString() === id)
    //post is in de dependcie is gwn een constate, hoef niet state te zijn

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
