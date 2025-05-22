import { useSelector } from 'react-redux'
import { selectUsersById } from '../users/usersSlice'
import { Link, useParams } from 'react-router-dom'
import { useGetPostsByUserIdQuery } from '../posts/postsSlice'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUsersById(state, String(userId)));

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId);


    let content;

    if (isLoading){
        content = (
            <p>posts for user are loading</p>
        )
    } else if (isError){
        content = (
            <p>The voorzitter got slayed by enderDragon </p>
        )
        console.error(`error in getting post for user: ${error}`)
    } else if ( isSuccess && postsForUser) {
    
    const { ids, entities } = postsForUser;
    const postTitles = ids.map(id => (
        <li key={id}>
            <Link to={`/post/${id}`}>{entities[id].title}</Link>
        </li>
    ))

        content = 
        (       
            <section>
                <h2>{user?.name}</h2>

                <ol>{postTitles}</ol>
            </section>
        )
    }

    return content
}

export default UserPage