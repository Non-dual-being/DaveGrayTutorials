import { Link, useParams } from "react-router-dom"
import { selectUserById } from "./userSlice"
import { selectPostByUser } from "../post/PostsSlice"
import { useSelector } from "react-redux"



const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, userId));
   /*  const allPosts = useSelector((state) => selectAllPosts(state)); */
/*     const postForUser = useMemo(() => { return allPosts.filter(post => String(post.userId) === String(userId))}, [allPosts, userId]); */
    const postForUser = useSelector(state => selectPostByUser(state, userId));
    
    const postTitles = postForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    let content;

    if (postForUser?.length){
        content = (
            <section>
                <h2>List of post from user {user?.name ? user.name : "unknown user"}</h2>
                <ul>{postTitles}</ul>
            </section>
        )
    } else {
        content = (
            <p>No post found for user {user?.name ? user.name : "unknown user"}</p>
        )
    }

    return content
}

export default UserPage