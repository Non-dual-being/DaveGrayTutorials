/* window.alert(window.location);
alert(location);

 */
myObj = {
    name: "myName",
    logName: function () {
        console.log (this.name);
    },
    hobbies: ["eat", "sleep", "code"]
};

const myArray = Array.from({length: 8}, (_,x)=>x) /**array from uses de call back functie to iteratie trough de values of the object the frist parameter is the value en the seconde the position in the array */
const myArray2 = [...Array(8).keys()]; //**lege array van lengte 8 daarvan de sleutel (wat de indexen zijn ) en dan spread operator gebruik om elke waarde indivudeel te retourneren */

sessionStorage.setItem("mySessionStore", myObj);

const mySessionData = sessionStorage.getItem("mySessionStore");
console.log(mySessionData);

sessionStorage.setItem("myJSONSessionStorage", JSON.stringify(myObj));

const mySessionData2 = sessionStorage.getItem("myJSONSessionStorage");

console.log(typeof(mySessionData2), mySessionData2);

const mySessionData3 = JSON.parse( sessionStorage.getItem("myJSONSessionStorage"));

console.log(typeof(mySessionData3), mySessionData3);

localStorage.setItem("localStorageitem", JSON.stringify(myArray2));