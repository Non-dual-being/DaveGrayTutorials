import { useAddReactionMutation } from "./postsSlice"

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    const [addReaction] = useAddReactionMutation()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                   const newValue = post.reactions[name]  + 1;
                   const updatePost = {
                    ...post, 
                    reactions: {...post.reactions, [name]: newValue}
                   }

                   addReaction(updatePost);
                 
                }}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionButtons