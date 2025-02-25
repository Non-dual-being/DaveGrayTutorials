import { NavLink } from 'react-router-dom'

const Post = ({ postItem }) => {
  return (
    <article className='post'>
        <NavLink to={`/post/${postItem.id}`}>
        <h2>{postItem.title}</h2>
        <p className='postDate'>{postItem.datetime}</p>
        <p className='postBody'>
            {
                (postItem.body).length <= 25 
                    ? postItem.body
                    : `${(postItem.body).slice(0, 25)} ...`
            }
        </p>
        </NavLink>
    </article>
  )
}

export default Post