import { useSelector } from "react-redux"
import { selectPostById } from "./PostsSlice"

import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButton"

import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const SinglePostPage = () => {

    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, postId));
    
    
    const postNotFound = (
        <section>
            <h2>Post not Found</h2>
        </section>
    );

    const PostPageContent = (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )


  return (
    post ? PostPageContent : postNotFound
  )
}

export default SinglePostPage