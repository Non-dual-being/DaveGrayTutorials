import React from 'react'

const Button = ({ buttonText, reqType, setReqType }) => {
  return (
    <button 
        className = {buttonText === reqType ? "myButton selected" : "myButton"}
        type = "button"
        onClick = {() => setReqType(buttonText)} 
    >
    {buttonText}
    </button>
  )
}

export default Button