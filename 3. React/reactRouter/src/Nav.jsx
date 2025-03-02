import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'


const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults);


  useEffect(() => {
    const filteredResults = search && search.length 
    ? (posts.filter((post) => (
      ((post.body).toLowerCase().includes(search.toLowerCase())) || ((post.title.toLowerCase().includes(search.toLowerCase())))  
    )).sort((a, b) => new Date(b.datetime) - new Date (a.datetime))) 
    : (posts)
    /**sortering op datum sort kijk is b groter dan a (eerdere datum groter getal) dan b eerst */

    setSearchResults(filteredResults);

  }, [posts, search, setSearchResults])
  




  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search'>Search Posts</label>
        <input 
          id="search"
          type="text" 
          placeholder='Search Posts'
          value = {search}
          onChange={(e) => setSearch(e.target.value)}
          />
      </form>
        <ul>
          <li>
            < NavLink to="/">Home</NavLink>
          </li>
          <li>
            < NavLink to="/post">Post</NavLink>
          </li>
          <li>
            < NavLink to="/about">About</NavLink>
          </li>
        </ul>
      
    </nav>
  )
}

export default Nav