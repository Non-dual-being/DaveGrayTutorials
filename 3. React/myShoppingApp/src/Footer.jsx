import React from 'react'

const Footer = ( {length}) => {
   const today = new Date();
   const items = length === 1 ? "Only 1 item in your list" : length === 0 ? "You have a empty list" : "Items in your list: ";
  return (
    <footer>
      <p>Copyright &copy; {today.getFullYear()}</p>
      {length !== null && ( // conditionele rendering
        <p className='counter'> {items}  
          <span className="itemslistcount">
          {length === 1 ? length = "" : length === 0 ? length = "" : length}
          </span>
        </p>
        )}
    </footer>
  )
}

export default Footer