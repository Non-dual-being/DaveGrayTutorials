const FetchAPI = async (url = null, bodyObj = null) => {
 if (!url || !typeof url=== 'string' || !url.length){
    return {'success' : false, 'error': 'no url provided'}
  }

  if (!bodyObj || typeof bodyObj !== 'object' || !Object.hasOwn(bodyObj, 'method') || !Object.hasOwn(bodyObj, 'headers')){
    return{'success' : false, 'error': 'no valid fetch arguments'}
  }

  try {
    const response = await fetch(url, bodyObj);
    if (!response.ok){
      return { success: false , error: `Error: ${response.status} ${response.statusText}`};
    }

    try {
      const responseJSON = await response.json();
      return {'success' : true, 'response' : responseJSON};
    } catch (e) {
        throw new Error(`JSON Parsing Error: ${e.message}`);
    }

  }catch (e) {
    let returnRes = "";
    {
    e.message 
    ? returnRes = {'success' : false, 'error' : e.message}
    : returnRes = {'success' : false, 'error' : 'ongeldige response'}
    }
    console.log(returnRes);
    console.log(url)
    return returnRes;
  }
}

export default FetchAPI