import React from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext.jsx'


const PostPage = () => {
  const { posts, setPosts, navigate, api} = useContext(DataContext);
  const { id } = useParams(); /**deconstrueert uit de url de id (/posts/:id) */
  const post = posts.find(post => post.id.toString() === id)

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
  
  

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <NavLink to={`/edit/${id}`}>
            <button 
              className='editButton'>
            Edit Post
            </button>
            </NavLink>
            <button 
              className='deleteButton'
              onClick={(e) => handleDelete(post.id)}
            >Smetterling</button>
          
          </>
        
        }
        {!post && 
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's dissapointing</p>
            <NavLink to="/">
              <p>Visit our Homepage</p>
            </NavLink>
          
          </>
      
        }
      </article>
    
    </main>
  )
}

export default PostPage