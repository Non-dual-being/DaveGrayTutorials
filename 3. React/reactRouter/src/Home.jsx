import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import DataContext from './context/DataContext.jsx'

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);
  


  return (
    <main className='Home'>
      { isLoading  
        ? (<p className='statusMsg loading'>Posts are loading</p>)
        : fetchError
        ? (<p className='statusMsg error'>Error: {fetchError}</p>)
        : (
            searchResults && searchResults.length ? (
            <Feed 
            posts={searchResults}
            />  
          ) : (
            <p className='noPostsPara'>
              No posts to display.
            </p>
          )
        )
      }
    </main>
  )
}

export default Home