import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../hooks/useAxiosFetch.js';
import api from '../api/posts.js';

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const baseUrl = 'http://localhost:3500/posts';
    const navigate = useNavigate();
    const { data, fetchError, isLoading } = useAxiosFetch(baseUrl)
  
  
    useEffect(() => {setPosts(data)}, [data]);
  
    useEffect(() => {
      const filteredResults = search && search.length 
      ? (posts.filter((post) => (
        ((post.body).toLowerCase().includes(search.toLowerCase())) || ((post.title.toLowerCase().includes(search.toLowerCase())))  
      )).sort((a, b) => new Date(b.datetime) - new Date (a.datetime))) 
      : (posts)
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

    return(
        <DataContext.Provider value={{
            searchResults,
            posts, setPosts,
            fetchError,
            isLoading,
            search, setSearch,
            getFormattedDateTime,
            api,
            navigate

        }}
       
        > {children}
        </DataContext.Provider>
    )
}

export default DataContext