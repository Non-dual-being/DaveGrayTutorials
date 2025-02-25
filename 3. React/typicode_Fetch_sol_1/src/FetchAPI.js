import React from 'react'

const FetchAPI = async (url = null, bodyObj = null) => {
  if (!url || !typeof url=== 'string' || !url.length){
    return {'success' : false, 'error': 'no url provided'}
  }
  console.log(url);
  if (!bodyObj || typeof bodyObj !== 'object' || !Object.hasOwn(bodyObj, 'method')){
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
    } catch {
      return {'success' : false, 'error' : 'ongeldige response'};
    }

  }catch (e) {
    return {'success' : false, 'error' : 'ongeldige response'}
  }
}

export default FetchAPI