import React from 'react'
import { useContext, useState } from 'react'
import DataContext from './context/DataContext.jsx'


const NewPost = () => {
  const [postBody, setPostBody] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const { posts, setPosts, getFormattedDateTime, api, navigate } = useContext(DataContext);

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