"use strict";
//calback hell
if (false){
    function firstFunction (para, callback) {
        //do stuff
        callback();
    }

    // CALLBACKHELL
    firstFunction(para, function() {
        //do stuff
        secondFunction(para, function () {
            thirdFunction(para, function (){

            });

        });
    });

};

// 3 states Pending, Fulfilled, Rejected. 
// JS is normaly sync code, 1 line at a time
// promises however is async code. Which means that a promise could be pending, while other code is begin excuted
const body  = document.querySelector('body');
body.style.backgroundColor = "#222";
function someMyPromises () {
    const myPromise = new Promise( (resolve, reject) => {
        const error = false;
        if (!error) {
            resolve("Yes received the promise");
        } else {
            reject("No! Promise rejected");
        }
    });

    console.log(myPromise);

    // new Promise is een nieuwe instantie van een klasse
    // Promise is bedoeld om asynchorne code te beheren
    // Een promise staat voor een waarde die beschikbaar is nu , toekomst of nooit
    // Een promise kent drie staten, pending, fulfilled of rejected
    // De initiatie van het Promise object gebeurt via de constructor
    // De constructeur accepterteert een callback functie als paramter
    // De callback ontvangt twee ingebouwde functie als parameters resolve en reject
    // hier wordt de staat fulfiled met as waarde wat als para is gegeven in resolved

    myPromise.then(
        value => {
            return value + 1;
        }
    ).then(newValue =>{
        console.log(newValue);
    })



    const myPromiseRejected = new Promise( (resolve, reject) => {
        const error = true;
        if (!error) {
            resolve("Yes received the promise");
        } else {
            reject("No! Promise rejected");
        }
    });

    myPromiseRejected.then(
        value => {
            return value + 1;
        }
    ).then(newValue =>{
        console.log(newValue);
    }).catch(err => {
        console.error(err);
    })

    const myNextPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve("MyNexPromise resolved");
    }, 4000);

    });

    myNextPromise.then(value => {
        console.log(value);
    });

    myPromise.then(value =>{
        console.log(value);

    });
};

if (false) {

    const users = fetch("https://jsonplaceholder.typicode.com/users");

    console.log(users); //will display pending

    const newusers = fetch("https://jsonplaceholder.typicode.com/users").then(response => {
            return response.json(); //this returns a promise
        }
    ).then(data => {
        data.forEach(user => {
            console.log(user);
        })
    });

    console.log('This wil execute will the Promise is pending');
}


const url = "https://jsonplaceholder.typicode.com/users"
const url2 = "https://icanhazdadjoke.com/";

const myUsers = {
    userList : [], 
    userList2: [],
    userList3: [],
    userList4: []
}

const myCoolFunction = async () => {
    const response = await fetch (url);
    const jsonUserData = await response.json();
    console.log("fetched data: ", jsonUserData);
    return jsonUserData;
}

const loadData = async () => {
    const myUserData = await myCoolFunction ();
    console.log("logging my user data", myUserData);

    Object.entries(myUserData).forEach(([key,value]) => {
        myUsers.userList.push({id: key, ...value}); //here de spread operator work kuz key is not a key itsself but the value of id en values can be spread cuz is spredas outs within the outer object as key value pairs
    });


    Object.entries(myUserData).forEach(([key, value]) => {
        myUsers.userList2.push({[key]:value}); //cannot use the spread operator here becauze the key expects ome value, which needs te a object
    });

    console.table(myUsers);


};

loadData();

const getAllUserEmails = async () => {
    const response = await fetch(url);
    const jsonUserData = await response.json();
    const userEmailArray = jsonUserData.map(user => {
        return user.email;
    });
    console.log("The email usersarray: ", userEmailArray);
    const emailContainer = document.createElement('section');
    body.appendChild(emailContainer);
    emailContainer.classList.add('emailContainer')
    userEmailArray.forEach(email => {
        const myEmailDiv = document.createElement('div');
        myEmailDiv.classList.add('emaildiv');
        myEmailDiv.textContent = email;
        emailContainer.appendChild(myEmailDiv);     
    });

}

const getDadJoke = async () => {
    try {
        const response = await fetch(url2, {
            method: "GET",
            headers: {
                Accept: "application/json" // Corrigeer de headernaam en waarde
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP-fout! Status: ${response.status}`);
        }

        const myJokeData = await response.json();
        return myJokeData;
    } catch (error) {
        console.error("Er is een probleem met het ophalen van de grap:", error.message);
    }
   
};

 const loadJokes = async () => {
    const myJokes = [];
    for (let i = 0; i < 10; i++ ) {
        const joke = await getDadJoke();
        console.log(joke);
        myJokes.push(joke);
    }

    const emailContainer = document.createElement('section');
    body.appendChild(emailContainer);
    emailContainer.classList.add('emailContainer');

    for (const joke in myJokes) {
        
        const myEmailDiv = document.createElement('div');
        myEmailDiv.classList.add('emaildiv');
        myEmailDiv.textContent = myJokes[joke].joke
        emailContainer.appendChild(myEmailDiv);     

    }

 }

const getDadJokeText = async () => {
    try {
        const response = await fetch(url2, {
            method:"GET",
            headers: {
                Accept:"text/plain"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP FOUT STATUS: ${response.status}`);
        }

        const myJokeText = await response.text();
        console.log(myJokeText);
        return myJokeText;
} catch (e) {
    console.error(`fout: ${e}`);
}
}


const jokeObject = {
    id: "OoO71TSv4ED",
    joke: "Why was it called the dark ages? Because of all the knights"
}


const postDadJoke = async (jokeObj) => {
    const response = await fetch("https://httpbin.org/post",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObj)
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse.headers);

}

const requestJoke = async (category = "Programming", type = "single") => {
    try {
        // Bouw de URL op
        const apiUrl = buildRequestUrl(category, type);

        // Maak het fetch-verzoek
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        // Controleer op fouten in de response
        if (!response.ok) {
            throw new Error(`HTTP FOUT STATUS: ${response.status}`);
        }

        // Haal de grapdata op
        const jokeData = await response.json();

        // Controleer welk type grap het is en log deze
        if (type === "single") {
            console.log(jokeData.joke); // Log de grap zelf
            return jokeData.joke; // Retourneer de grap
        } else if (type === "twopart") {
            console.log(`${jokeData.setup} - ${jokeData.delivery}`); // Combineer setup en delivery
            return `${jokeData.setup} - ${jokeData.delivery}`; // Retourneer gecombineerde grap
        }
    } catch (e) {
        console.error(`Fout: ${e.message}`);
    }
};

const buildRequestUrl = (category, type) => {
    const getDataFromForm = (category, type) => {
        const requestObj = {
            category: category,
            type: type
        };
        return requestObj;
    };

    const myURLData = getDataFromForm(category, type);

    // Bouw de URL
    return `https://v2.jokeapi.dev/joke/${myURLData.category}?type=${encodeURIComponent(myURLData.type)}`;
};

// Vraag een grap op
requestJoke("Any", "twopart");








    /**
     * Uitleg over de URL-structuur:
     *
     * 1. Basis-URL (Base Path):
     *    - De basis-URL is het vaste gedeelte van de API: `https://v2.jokeapi.dev/joke/`.
     *    - Dit is het deel dat altijd hetzelfde blijft en aangeeft welke API je wilt benaderen.
     *
     * 2. Padparameter (`category`):
     *    - De `category` wordt opgenomen in het pad na de basis-URL, bijvoorbeeld:
     *      `https://v2.jokeapi.dev/joke/Programming`.
     *    - Dit is specifiek voor deze API, omdat de categorie deel uitmaakt van het pad. 
     *      Dit is door de API-ontwikkelaars zo bepaald, waardoor het niet als queryparameter kan worden gebruikt.
     *    - Als je `category` als queryparameter zou toevoegen (bijv. `?category=Programming`), zou de API dit niet herkennen.
     *      Dit komt omdat de API verwacht dat de categorie direct in het pad staat.
     *
     * 3. Queryparameters (`type`):
     *    - Na het pad volgt het vraagteken (`?`), dat aangeeft dat de query string begint.
     *    - Queryparameters worden gebruikt om aanvullende informatie aan de API mee te geven. 
     *      In dit geval geeft `type=single` aan dat we een grap willen in het "single" formaat.
     *    - Queryparameters worden geschreven in het formaat `key=value` (bijvoorbeeld `type=single`).
     *    - Meerdere queryparameters kunnen worden toegevoegd door ze met een ampersand (`&`) te scheiden, bijvoorbeeld:
     *      `?type=single&lang=en`.
     *
     * 4. `encodeURIComponent`:
     *    - Waarden in queryparameters moeten worden geëncodeerd met `encodeURIComponent` om problemen met speciale tekens 
     *      te voorkomen (bijvoorbeeld spaties, &, =, enz.).
     *    - Dit zorgt ervoor dat waarden correct worden geïnterpreteerd door de API.
     *
     * Samengevat:
     * - De categorie (`category`) moet in het pad staan omdat de API dit vereist.
     * - De `type` wordt toegevoegd als een queryparameter omdat dit de juiste structuur is voor deze specifieke API.
     * - Als je categorie als een queryparameter zou gebruiken, werkt de API niet zoals verwacht, omdat deze is ontworpen om de categorie in het pad te ontvangen.
     */



   

