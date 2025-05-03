import PostList from "./features/post/PostList"
import AddPostForm from "./features/post/addPostForm"
import SinglePostPage from "./features/post/SinglePostPage"
import EditPostForm from "./features/post/EditPostForm"
import Layout from "./components/Layout"
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />}/>
        <Route path="post">
          <Route index element={<AddPostForm/>}/>
          <Route path=":postId" element={<SinglePostPage/>}/>
          <Route path="edit/:postId" element={<EditPostForm/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
