import React from 'react'

const Square = ({ colorValue = 'whitesmoke', hexValue, isDarkText}) => {
  console.log(isDarkText)
  return (
    <section 
        className='square'
        style={{ backgroundColor: colorValue}}
    >
        <p 
          style = {isDarkText ? {color : 'black'} : {color: 'whitesmoke'}}
        >{colorValue ? colorValue : 'whitesmoke'}</p>

        { hexValue ? 
        <p
        style = {isDarkText ? {color : 'black'} : {color: 'whitesmoke'}}
        >{hexValue ?  hexValue: null}</p> : ""} 
        
    </section>
  )
}

export default Square