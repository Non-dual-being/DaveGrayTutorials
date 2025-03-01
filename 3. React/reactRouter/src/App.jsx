import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext.jsx';


import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import PostPage from './PostPage.jsx';
import NewPost from './NewPost.jsx';
import EditPost from './EditPost.jsx';
import About from './About.jsx';
import Missing from './Missing.jsx';

//import { format } from 'date-fns';

function App() {
  return (
    <div className='App'>
      <DataProvider>
        <Header title = "React JS Blog"/>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post" element={<NewPost/>}/>
          <Route path="/post/:id" element={<PostPage />} />
          <Route path= "/edit/:id" element = {<EditPost/>}/>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;

/**
 * dataprovider is een wrappen die state deelt en waarden (dus geen pagina component dus geen jsx)
 * 
 */
