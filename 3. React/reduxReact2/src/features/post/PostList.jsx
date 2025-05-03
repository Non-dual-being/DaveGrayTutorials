import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./PostsSlice";
import PostsExcerpt from "./PostsExcerpt";




const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])


    let content;

  


    if (postStatus === 'loading'){
        content = <p>"Loading..."</p>
    } else if (postStatus === "succeeded"){
         // je haalt dit op uit de store waar de reducer is doorgeven, de reducer bevat ook automatische de initialstate
        const orderedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date)) //slice maakt een shallow copy zodat je je orginenele niet mutteert

        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>) /**key is niet een component paramater, maar is bedoeld intern voor react om elke post goed te behandelen */
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