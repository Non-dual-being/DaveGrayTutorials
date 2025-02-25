import React from 'react'

export const SearchItem = ({searchInput, setSearchInput }) => {
  return (
    <form action="" className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='seach'>Search</label> 
        <input 
            id='search'
            type='text'
            role = 'searchbox'
            placeholder='Search Items'
            value = {searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        ></input>
    </form>
  )
}

export default SearchItem

/** label and id are for focus */
