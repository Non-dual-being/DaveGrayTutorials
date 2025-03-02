import { useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy';


const NewPost = () => {
  const setPostBody = useStoreActions((actions) => actions.setPostBody)
  const postBody = useStoreState((state) => state.postBody)
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle)
  const postTitle = useStoreState((state) => state.postTitle)
  const navigate = useNavigate();
  const savePost = useStoreActions((actions) => actions.savePost)
  const getNewId = useStoreState((state) => state.getNewId);
  const newID = getNewId();

  const handleSubmit  = (e) => {
  e.preventDefault();
  if ((!postBody || postBody.trim() === '') || (!postTitle || postTitle.trim() === '')) return;

      const myNewPost = {
      id: String(newID).trim(),
      title: postTitle,
      body: postBody
      }

      try {
      savePost(myNewPost);
      navigate('/');

      } catch(e){
      console.log(`err : ${e.message}`);
      }
  }

  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input 
          id='postTitle'
          type='text'
          required
          value = {postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Body:</label>
        <textarea
          id='postBody'
          required
          value = {postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost

/**
 * ? althoug nog explicitly passed trough the event in onSubmit wel still be passed throug handleSumbit
 */