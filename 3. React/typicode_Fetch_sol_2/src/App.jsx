import React, { useState, useEffect } from 'react';

import Header from './Header';
import api from './FetchAPI';
import DisplayJSONList from './DisplayJSONList';

function App() {

  const fetchBodyArg = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const [headerItems, setHeaderItems] = useState([
    {
      id: 1,
      active: true,
      label: "users"
    },
    { 
      id: 2,
      active: false,
      label: "posts"

    },
    {
      id: 3,
      active: false,
      label: "comments"

    }
  ])

  const [apiUrl, setApiUrl] = useState('');
  const [request, setRequest] = useState('users');
  const [fetchError, setFetchError] = useState(null);
  const [jsonList, setJSONList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const handleNavLinks = (id) => {
    if (!id) return;
    setHeaderItems((previtems) => 
      previtems.map((item) => (
        item.id === id 
        ? {...item, active: true} 
        : {...item, active: false}
  
      ))
    
    )
  }

  const handleChangeOfRequest = () => {
    const activeRequest = headerItems.find((link) => link.active)?.label;
    if (activeRequest){
      setRequest(activeRequest);
    }
  }

  const displayJSON = async() => {
    if (!apiUrl) return;

  
    try{
      const myJSONListRes = await api (apiUrl, fetchBodyArg);
      if (!myJSONListRes.success){
        const errorMessage = myJSONListRes.error && typeof myJSONListRes.error === 'string' && myJSONListRes.error.length
        ? myJSONListRes.error
        : 'Fout in het ophalen van de data'
        setFetchError(errorMessage);
        return;
      }
      const myJSONListResJSON = myJSONListRes.response || [];
  
      if(!myJSONListResJSON || !Array.isArray(myJSONListResJSON) || !myJSONListResJSON.length){
        setFetchError("lege dataset opgehaald");
        return;
      }
  
      setFetchError(null);
      setJSONList(myJSONListResJSON);
  
    } catch (e) {
      setFetchError('Fout in het ophalen van de data');
      console.log(e.message);
  
    } finally{
      setIsLoading(false);
    }
  }

  /*
  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', fetchBodyArg);
        const resJSON = await res.json();
        setJSONList(resJSON);
        } catch (e) {
          setFetchError(e.message);
      } finally{
        setIsLoading(false);
      }
   
    }
    FetchData(); 
  
  }, []) */
  


  
  useEffect(() => {
    handleChangeOfRequest();
  }, [headerItems])
  
  
    /**de url veranderen als de request veranderd */
   
  useEffect(() => {
    setApiUrl(`https://jsonplaceholder.typicode.com/${request}`);
  }, [request])
  
  
  useEffect(() => {
    if (!request || request === '') return; // Fetch pas als request een geldige waarde heeft
    const fetchData = async () => {
      await displayJSON();
    }
    fetchData();
  
  }, [apiUrl])
  
  

  return ( 
    <div className="App">
      <Header
        headerItems={headerItems}
        handleNavLinks={handleNavLinks}
      ></Header>
      <main>
        {
          isLoading 
          ? (<p className='isLoading'>items are loading</p>) 
          : fetchError 
          ?  ( <p className = "ErrorPara">{fetchError}</p> ) 
          : (<DisplayJSONList DisplayJSONList = {jsonList} />)
        }
      </main>
    
    </div>
    )
}



export default App

/** 
 * *importw
 * bij imports zorgt ./ ervoor dat vite weet dat het lokaal is
 * En dus geen externe module
 * *handleNavLinks
 * !item.active verwijst naar de orginele
 * todo: je wilt juist een aangepast kopie meegeven ... spread kopiere en met active past de kopie aan
*/
