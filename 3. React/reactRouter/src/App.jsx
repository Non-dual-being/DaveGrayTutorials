import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import  useAxiosFetch  from './hooks/useAxiosFetch.js';
import  { useStoreActions } from 'easy-peasy';

import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import PostPage from './PostPage.jsx';
import NewPost from './NewPost.jsx';
import EditPost from './EditPost.jsx';
import About from './About.jsx';
import Missing from './Missing.jsx';



function App() {
  const url = 'http://localhost:3500/posts'
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, isLoading, fetchError } = useAxiosFetch(url)
  useEffect(() => {setPosts(data)}, [data, setPosts]);

  return (
    <div className='App'>
        <Header title = "React JS Blog"/>
        <Nav/>
        
        <Routes>
          <Route path="/" element={<Home isLoading = {isLoading} fetchError = {fetchError}/>} />
          <Route path="/post" element={<NewPost/>}/>
          <Route path="/post/:id" element={<PostPage />} />
          <Route path= "/edit/:id" element = {<EditPost/>}/>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
       
        <Footer />
     </div>
  );
}

export default App;

/**
 * dataprovider is een wrappen die state deelt en waarden (dus geen pagina component dus geen jsx)
 * 
 */
