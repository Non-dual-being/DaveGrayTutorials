
import { useState } from 'react';
import { useEffect } from 'react';
import JSONList  from './JSONList.jsx'
import  Header  from './Header.jsx'
import FetchAPI from './FetchAPI.js';



function App() {
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

  ]);

  const [apiUrl, setApiUrl] = useState('');
  const [request, setRequest] = useState('users');
  const [fetchError, setFetchError] = useState(null);
  const [jsonList, setJSONList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBodyArg = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }

    
  const handlenavlinks = (id) => {
    setHeaderItems((previtems) => 
      previtems.map((item) => 
        item.id === id ?
        {...item, active: true } : { ...item, active:false}
    ));
};

const handleChangeOfRequest = () => {
  const activeHeaderLinkLabel = headerItems.find(link => link.active)?.label;
  if (activeHeaderLinkLabel){
    setRequest(activeHeaderLinkLabel)
  }

  /**
   * find heeft 1 item terug ipv een array van items 
   * ? is een chaining operator die zorgt ervoor dat er pas naar een label wordt gezocht als er een active link is gevonden
   * */
};

const displayJSON = async() => {
  if (!apiUrl) return;

  try{
    const myJSONListRes = await FetchAPI (apiUrl, fetchBodyArg);
    if (!myJSONListRes.success){
      const errorMessage = myJSONListRes.error && typeof myJSONListRes.error === 'string' && myJSONListRes.error.length
      ? myJSONListRes.error
      : 'Fout in het ophalen van de data'
      setFetchError(errorMessage);
      return;
    }
    const myJSONListResJSON = myJSONListRes.response || []


    if(!myJSONListResJSON || !Array.isArray(myJSONListResJSON) || !myJSONListResJSON.length){
      setFetchError("lege dataset opgehaald");
      return;
    } else {
      setFetchError(null);
    }


    setJSONList(myJSONListResJSON);

  } catch (e) {
    setFetchError('Fout in het ophalen van de data');
    console.log(e.message);

  } finally {
    setIsLoading(false);
  }
}




/**||----------[afhankelijkheden om de JSON opt te bouwen chainen met UseEffect]--------------||*/

/**de request veranderen als de activilink veranderd */


useEffect(() => {
  handleChangeOfRequest();

}, [headerItems])


  /**de url veranderen als de request veranderd */
 
useEffect(() => {
  setApiUrl(`https://jsonplaceholder.typicode.com/${request}`);

}, [request])


useEffect(() => {
  const fetchData = async () => {
    await displayJSON();
  }
  fetchData();

}, [apiUrl])

  return (
    <div className="App">
      <Header
        headerItems = {headerItems}
        handlenavlinks={handlenavlinks}
      />
      <main>
        { fetchError  ?  ( <p className = "ErrorPara">{fetchError}</p> ) : isLoading ? (<p className='isLoading'>content is loading</p>) :
        (
          <JSONList JSONObjList = {jsonList} />
        )}
      </main>
      
    </div>
  );
}

export default App;

    /*
|| (Logische OF) versus ?? (Nullish Coalescing Operator)

|| (Logische OF):
- Vervangt de linkerwaarde als deze een falsy waarde is.
- Falsy waarden in JavaScript: false, 0, "", null, undefined, NaN.
- Wordt vaak gebruikt als fallback voor lege of ontbrekende waarden.

?? (Nullish Coalescing Operator):
- Vervangt alleen als de linkerwaarde null of undefined is.
- Laat andere falsy waarden (zoals 0 en "") ongemoeid.
- Handig wanneer een waarde als 0 of "" wél geldig is en behouden moet blijven.

Voorbeeld:
const vacdlue1 = 0 || "fallback";  // "fallback" (0 is falsy)
const value2 = 0 ?? "fallback";  // 0 (0 is niet null of undefined)
*/
