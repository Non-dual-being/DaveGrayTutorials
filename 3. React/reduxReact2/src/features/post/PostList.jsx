import {  useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError, fetchPosts } from "./PostsSlice";
import PostsExcerpt from "./PostsExcerpt";




const PostList = () => {
    const orderedPostsIds = useSelector(selectPostIds)
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    let content;

    if (postStatus === 'loading'){
        content = <p>"Loading..."</p>
    } else if (postStatus === "succeeded"){
         // je haalt dit op uit de store waar de reducer is doorgeven, de reducer bevat ook automatische de initialstate


         /**
          *  in de slice wordt al de sort gedaan met de adpapter
          *  const orderedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date)) 
          *  slice maakt een shallow copy zodat je je orginenele niet mutteert
          */


        content = orderedPostsIds.map(postId => <PostsExcerpt key={postId} postId={postId}/>)
        
        /**key is niet een component paramater, maar is bedoeld intern voor react om elke post goed te behandelen */
    } else if (postStatus === "failed"){
        content = <p>{postError}</p>
    }



    return (
        <section>
            {content} 
        </section>
    )
}

export default PostList