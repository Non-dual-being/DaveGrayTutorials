const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
   
    if (optionsObj && optionsObj.body) {
        try {
            // Parse de body om te controleren of het een geldige JSON-string is
            JSON.parse(optionsObj.body);
        } catch (e) {
            return 'Invalid body: JSON parsing failed';
        }
    }

    try{
        const response = await fetch(url, optionsObj);
        if (!response.ok) {
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }
    }catch (e){
        errMsg = e.message
    }finally{
        return errMsg;
    }
}

export default apiRequest;

/**
 * CRUD Create Read Update Delete
 * OptionsObj defines which of options in CRUD it will be
 * The state in the app itself wil be faster then the api response 
 * The response may come in later, you dont want to wait for it and block the rest of the code
 * So this is to keep the items in the api server in sync with our list in the app
 */