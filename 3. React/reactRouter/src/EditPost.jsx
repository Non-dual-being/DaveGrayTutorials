import {  useEffect } from "react"
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy';


const EditPost = () => {

    const editTitle = useStoreState((state) => state.editTitle);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const editBody = useStoreState((state) => state.editBody);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const getPostById = useStoreState((state) => state.getPostById);
    const editPost = useStoreActions((actions) => actions.editPost)
    const { id } = useParams(); /**deconstrueert uit de url de id (/posts/:id) */
    const post = getPostById(id);
    const navigate = useNavigate();

    
    //post is in de dependcie is gwn een constate, hoef niet state te zijn

    const handleEdit =  (id) => {
        if (!id) return;
        if (typeof id !== 'string') id = String(id).trim();

        try {
        const myPostEdit = {
            id: id,
            title: editTitle,
            body: editBody
        }

        editPost(myPostEdit);
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
        setEditTitle (post.title);
        setEditBody(post.body);
    }
   }, [post, setEditTitle, setEditBody]) 

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
