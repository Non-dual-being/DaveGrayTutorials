import { use, useState } from 'react'
import { useEffect } from 'react';
import Form from './Form.jsx';
import List from './List.jsx'


function App() {
  const API_URL = 'https://jsonplaceholder.typicode.com/';
  const [reqType, setReqType] = useState('users');
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fectchItems = async() => {
      try {
        const reponse = await fetch(`${API_URL}${reqType}`);
        const myitem = await reponse.json();
        setItem(myitem);

      } catch (err) {
        console.log(err);
      }
    }

    fectchItems()
    /**
     * no immidiate evoke nodig met await voor fetchitems omdat er geen return is
     * Het gaat om de state bijhouden
     */

  }, [reqType])

  return (
    <div className='AppDiv'>
    <Form 
      reqType = {reqType}
      setReqType = {setReqType}
    />
    <List 
      item = {item}
    />

  </div>
  )
}

export default App
