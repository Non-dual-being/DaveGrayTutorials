import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy';

const PostPage = () => {
  const deletePost = useStoreActions((actions) => actions.deletePost)
  const navigate = useNavigate();
  const { id } = useParams();
  const  getPostById = useStoreState((state) => state. getPostById);
  const post = getPostById(id);


  const handleDelete = (id) => {
      if (id === null) return;
      try{
          deletePost(id);
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