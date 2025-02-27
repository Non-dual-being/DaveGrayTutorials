import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined});

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight   
            });
        }
        handleResize();
        
        window.addEventListener('resize', handleResize);

        const cleanUp = () => {
              window.removeEventListener('resize', handleResize)
        }
        return cleanUp;
        /**
         * return cleanUp ensures that the eventlistener is triggerd on unmount. The return within the useffect tells react the cleanUp is ment to be triggered on the unmount
         * * To prevent memory leaks 
         * */
        
    }, []);
    return windowSize;
}

export default useWindowSize;