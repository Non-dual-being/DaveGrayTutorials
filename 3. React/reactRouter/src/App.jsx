import { Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import PostPage from './PostPage.jsx';
import NewPost from './NewPost.jsx';
import About from './About.jsx';
import Missing from './Missing.jsx';
import api from './api/posts.js';
//import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postBody, setPostBody] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
      const fetchPosts = async () => {
        try {
          //crud get = read
          const response =  await api.get('/posts')
          /**
           * *refers to the base url en then /posts is your json object
           * *axios whichs is the method use here automatically creates json
           * *(!if response.ok) not needed, axios catches erros automaticcally
           */

          if (response && response.data) setPosts(response.data);



        } catch (e) {
          if (e.response) {
            console.log(`data: ${e.response.data}, status: ${e.response.data}`);
            console.log(`headers: ${e.resopnse.headers}`);
          } else {
            console.log(`err: ${e.message}`);
          }
        }
  
      }
      fetchPosts();


  }, [])

  useEffect(() => {
    const filteredResults = posts.filter((post) => (
      ((post.body).toLowerCase().includes(search.toLowerCase())) || ((post.title.toLowerCase().includes(search.toLowerCase())))  
    )).sort((a, b) => new Date(b.datetime) - new Date (a.datetime))
    /**sortering op datum sort kijk is b groter dan a (eerdere datum groter getal) dan b eerst */

    setSearchResults(filteredResults);

  }, [posts, search])

  

  const getFormattedDateTime = () => {
    const now = new Date()
    return now.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true

    })
  }

  const handleSubmit  = async (e) => {
    e.preventDefault()
    if ((!postBody || postBody.trim() === '') || (!postTitle || postTitle.trim() === '')) return;

      const newID = posts.length ? Math.max(...posts.map(post => post.id)) + 1 : 1;
      const newDateTime = getFormattedDateTime();

      /**alternatief */
      //let datetime = format(new Date(), 'MMMM dd, yyyy pp')

      const myNewPost = {
        id: String(newID).trim(),
        title: postTitle,
        datetime: newDateTime,
        body: postBody
      }

      try {
        const response = await api.post('/posts', myNewPost);
        setPosts((prevposts) => [...prevposts, response.data]);
        setPostTitle('');
        setPostBody('');
        navigate('/');

      } catch(e){
        console.log(`err : ${e.message}`);
      }
  }



  const handleDelete = async (id) => {
    if (id === null) return;
    if (typeof id !== 'string') id = String(id).trim();
      try{
      await api.delete(`/posts/${id}`);
      setPosts((prevPosts) => 
        prevPosts.filter(post => post.id !== id)
      )
      navigate('/');

    } catch(e) {
      if (e.response) {
        console.log(`data: ${e.response.data}, status: ${e.response.data}`);
      } else {
        console.log(`err: ${e.message}`);
      }
    }

    }


  

  return (
    <div className='App'>
      <Header title = "React JS Blog"/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home posts={search.length ? searchResults : posts}/>} />
        <Route 
          path="/post" 
          element={<NewPost 
            handleSubmit = {handleSubmit}
            postTitle = {postTitle}
            setPostTitle = {setPostTitle}
            postBody = {postBody}
            setPostBody = {setPostBody}
            />} 
        />
        <Route path="/post/:id" element={<PostPage posts={posts} handeDelete={handleDelete}/>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
