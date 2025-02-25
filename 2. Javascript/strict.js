document.addEventListener('DOMContentLoaded', function() {
    function isStrictMode(){
        "use strict";
        try {
            undeclaredVar = "test"
            return {isStrict: false, undeclaredVar}; /**geen declaratie nodig */
            
        } catch(e) {
            return {isStrict: true, error: e};
        }
    }

    const result = isStrictMode();
    if (result.isStrict) {
        if ('error' in result) {
            console.log(result.error);
        } else {
            console.log('Er is een fout opgetreden, maar geen foutinformatie beschikbaar.');
        }
    } else {
        console.log(result.undeclaredVar);
    }

    "use strict";


    const makeError = () => {
        try {
        throw new customError("This is a custom error");
        } catch(e){
            console.error(e.stack); /**console log or console.table */
            console.error(e.message);

        }
    }

    makeError();

    function customError (message) {
        this.message = message;
        this.name = "customError";
        this.stack = `${this.name}: ${this.message}`;

    }

    const makeError2 = () => {
        try {
        throw new Error("This is a generic error");
        } catch(e){
            console.error(e); /**console log or console.table */
        }
        finally {
            const h1 = document.getElementById('h1');
            h1.innerText = 'Finnaly i wrote this without chatgtp';
        }
    }

    makeError2();
});