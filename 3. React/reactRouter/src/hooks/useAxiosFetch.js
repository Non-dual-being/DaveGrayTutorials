import { useState, useEffect } from 'react';
import axios  from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    signal: controller.signal
                });
                
                setData(response.data);
                setFetchError(null);
                
      
            } catch (error) {
                if (axios.isCancel(error)){
                    console.log("Request canceld", error.message)
                } else {
                    setFetchError(error.message);
                    setData([]);
                }

            } finally{
                setIsLoading(false);
            }
        }

        fetchData(dataUrl);

        return () => controller.abort();



    }, [dataUrl]);

    return {data, fetchError, isLoading}
}

export default useAxiosFetch;

/**
 * Bij een unmount gaat Abort in de return een signaal doorgeven naar de Fetch
 * Van zodra dat signaal is ontvangen gaat axios cancelen en wordt de fect niet uitgevoerd
 * React heeft zelf een virtuale dom die reageertt op mount en unmount
 */

