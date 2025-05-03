import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)
    const author = users.find(user => String(user.id) === String(userId))
    return (
        <span> {author ? author.name : 'Unkown Author'}</span>
    )
}

export default PostAuthor