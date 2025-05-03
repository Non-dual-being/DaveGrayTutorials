import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./PostsSlice";
import { selectAllUsers } from "../users/userSlice";


const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUsersId] = useState('');
    const [addRequestsStatus, setAddRequestStatus] = useState('idle');


    const users = useSelector(selectAllUsers)


    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChangend = (e) => setUsersId(e.target.value);

    const dispatch = useDispatch();

    const canSave = [title, content, userId].every(Boolean) && addRequestsStatus === 'idle';

    const onSavePostClicked = () => {
       if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({ title, body: content, userId})).unwrap();
                setTitle('');
                setContent('');
                setUsersId('');
                /**
                 * normaal is de promise altijd resvolved by asyncthunk en er wordt altijd een action object aangemaakt
                 * Onderscheidt tussen error of succes komt in het object te staab
                 * Zonder unwrap handmatig checken
                 * Met unwrap wordt een rejected status gepaard met een promise die eeen error gooit een die naar rejected gaat zelf ook
                 * Promisen eemt altijd 1 van de volgende states in (pending, fulfilled, rejected)
                 * 
                 */

            } catch (err) {
                console.error('Roninaal dindt unwrap correctly', err)

            } finally {
                setAddRequestStatus('idle')
            }
       }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}
        >
        {user.name}
        </option>
    ))

   


  return (
    <section>
        <h2>Add a new Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input 
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}          
            />
            <label htmlFor="postAuthor">Author: </label>
            <select id="postAuthor" value={userId} onChange={onAuthorChangend}>
                <option value=""></option>
                {usersOptions}
            </select>
            <label htmlFor="postContent">Post Content:</label>
            <textarea 
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
           />
            <button 
                type="submit" 
                onClick={onSavePostClicked}
                disabled = {!canSave}
                >
                Save Post</button>        
        </form>
    </section>
  )
}

export default AddPostForm