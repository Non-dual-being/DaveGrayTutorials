import React from 'react'
import Post from './Post'


const Feed = ( { posts }) => {
  return (
    <>
        {
        posts.map((post) => 
            <Post key={post.id} postItem = {post} />
            
        )}
    </>
        )
}

export default Feed