import React from 'react'
import Feed from './Feed'
import { useStoreState } from 'easy-peasy'

const Home = ({ isLoading, fetchError }) => {
  const searchResults = useStoreState((state) => state.searchResults);
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