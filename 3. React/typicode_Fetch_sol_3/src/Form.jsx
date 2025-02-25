import React from 'react'
import Button from './Button.jsx';



const Form = ({ reqType, setReqType}) => {
  return (
    <form className='myForm'
        onSubmit={(e) => e.preventDefault()}   
        >
        <Button 
            buttonText = "users"
            reqType = {reqType}
            setReqType = {setReqType}
        />
        <Button 
            buttonText = "posts"
            reqType = {reqType}
            setReqType = {setReqType}
        />
        <Button 
            buttonText = "comments"
            ReqType = {reqType}
            setReqType = {setReqType}
        />

    </form>
  )
}

export default Form