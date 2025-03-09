/**type variables */
import users from "./users.js";
let username = "Foufke";
let a = 12;
let b = 6;
let c = 2;
let album;
album = '6';
let albumLabel;
albumLabel = 6;
const sum = (a, b) => {
    return a + b;
};
let postId;
let isActive;
let re = /\w+/g;
/**type objects  */
let stringArr = ['imtem1', 'imtem2'];
let guitars = ['Strat', 'Les Paul', 5150];
let mixedData = ['EVH', 1984, true];
let bands = [];
let myTuple = ['Dave', 4, true];
let mixed = ['John', 1, false]; //this mix type is of type (string | number | bolean)[]
// objects
let myObj;
myObj = {
    name: "Kevin",
    age: 35
};
let myObj2 = [];
const exampleObj = {
    name: "maarten",
    age: 24,
    sex: "non-binair"
};
let evh = {
    name: "eddie",
    active: false,
    albums: [1984, 5150, "OUB12"]
};
let evh2 = {
    name: "Alko",
    albums: ['GFort Rocks']
};
const greetGuitarist = (guitarist) => {
    return `Hello ${guitarist.name}`;
};
let foufke = {
    name: "Alko",
    active: true,
    albums: ["excel for live", 69, "word in mc"]
};
const greetGuitaristInter = (guitarist) => {
    var _a;
    return `Hello ${(_a = guitarist.name) === null || _a === void 0 ? void 0 : _a.trim()}`;
};
const greetGuitaristInter2 = (guitarist) => {
    var _a;
    if (guitarist.name) {
        return `Hello ${(_a = guitarist.name) === null || _a === void 0 ? void 0 : _a.trim()}`;
    }
    return 'Hello Guitarist without no name';
};
//enums 
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 0] = "U";
    Grade[Grade["D"] = 1] = "D";
    Grade[Grade["C"] = 2] = "C";
    Grade[Grade["B"] = 3] = "B";
    Grade[Grade["A"] = 4] = "A";
})(Grade || (Grade = {}));
//grade.U = 0
var Grade2;
(function (Grade2) {
    Grade2[Grade2["U"] = 1] = "U";
    Grade2[Grade2["D"] = 2] = "D";
    Grade2[Grade2["C"] = 3] = "C";
    Grade2[Grade2["B"] = 4] = "B";
    Grade2[Grade2["A"] = 5] = "A";
})(Grade2 || (Grade2 = {}));
//With inferfaces this alias usage is not posible
let myName; // explicit type 'Dave'
let userName; //literal union type
const add = (a, b) => {
    return a + b;
};
const logMsg = (message) => {
    console.log(message);
};
let multypy = (a, b) => { return a * b; };
const addAll = (a, b, c) => {
    return a + b + c;
};
const addAll2 = (a, b, c) => { return a + b + c; };
const add3numbers = (a, b, c) => {
    if (!a && !b && !c)
        return;
    return [a, b, c]
        .filter((num) => typeof num === "number")
        .reduce((sum, num) => sum + num, 0);
};
const total = (...nums) => {
    return nums.reduce((prev, curr) => prev + curr);
};
/**
 * !the ... is not a spread operator here,
 * *but a rest operator
 * this is so cuz is used inside the paramslist
 *
 * */
const createError = (errMsg) => {
    throw new Error(errMsg);
};
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100)
            break;
    }
};
const numberOrString = (value) => {
    if (typeof value === 'string') {
        return 'string';
    }
    else if (typeof value === 'number') {
        return 'number';
    }
    else {
        return "pass in a number or string, but nothing else";
    }
};
const numberOrString2 = (value) => {
    if (typeof value === 'string') {
        return 'string';
    }
    else if (isNumber(value)) {
        return 'number';
    }
    else {
        throw new Error('Please provide a number or string');
    }
};
const isNumber = (value) => {
    return typeof value === 'number' ? true : false;
};
// convert to more ore less specific
let a1 = 'hello';
let b2 = a1;
let c3 = a1;
// this type of syntax is not avaliable in react
let d = 'world';
let d2 = 6;
const addOrConcat = (a, b, c) => {
    if (c === 'add') {
        return a + b;
    }
    else if (c === 'concat') {
        return "" + a + b;
    }
    else {
        throw new Error('please make use of add of concat');
    }
};
10; //double casting (however this overrruling is no recommended)
//assertion are usefull in the dom
const img = document.querySelector('img'); //non null assertion
const myImg = document.getElementById('#img');
img === null || img === void 0 ? void 0 : img.src;
class coder {
    constructor(name, music, age, lang) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
//visibily modifiers
class Coder2 {
    constructor(name, music, age, lang = "") {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    getAge() {
        return `Hello, I'm ${this.age}`;
    }
}
const Dave = new Coder2('Dave', 'Rock', 42, 'TypeScript');
/**
 * private means it can only be accesed troughh class
 * protected means it can be accesed trough the class and sub extended classes
 */
Dave.getAge(); // this is trough class
// Dave.age // this is not possible cuz of privagte
class WebDev extends Coder2 {
    constructor(computer, name, music, age) {
        //super most come first
        super(name, music, age);
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        return this.lang
            ? `I write ${this.lang}`
            : 'No language was provided';
    }
}
const Sara = new WebDev('Mac', 'Sara', 'Vieze Asbak', 25);
console.log(Sara.getLang());
class myGuitarist {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    play(action = "play") {
        return `I ${action} my ${this.instrument}`;
    }
}
class counter {
    static getCount() {
        return counter.count;
    }
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++counter.count; //this will ensure dat counter.count goes + 1 first before id is assigned
    }
}
class bands2 {
    constructor() {
        this.dataState = [];
    }
    get data() {
        return this.dataState;
    }
    //setters most be a void return
    set data(value) {
        if (Array.isArray(value) && value.every((data) => typeof data === 'string')) {
            value.forEach((data) => this.dataState.push(data));
            return;
        }
        else {
            throw new Error('this needs to be array full of strings');
        }
    }
}
const myBand = new bands2();
myBand.data = ['vieze asbak', 'lil kleine'];
myBand.data = [...myBand.data, 'klein orkest'];
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
//-----------[dynamic acces]--------------///
let prop = 'Pizza';
/*
*console.log(todaysTransactions[prop])
!wont work no index signature
*/
const todaysNet = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        total += transactions[transaction];
    }
    return total;
};
const todaysTransactions2 = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
const todaysNet2 = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        total += transactions[transaction];
    }
    return total;
};
const student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
};
for (const key in student) {
    console.log(`${key} : ${student[key]}`);
}
const studenttwo = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
};
for (const key in studenttwo) {
    console.log(`${key} : ${studenttwo[key]}`);
}
/**as keyof creates a union type of the keys */
Object.keys(studenttwo).map(key => {
    console.log(`${key} : ${studenttwo[key]}`);
});
/**get the type with typeof */
const logStudentKey = (student, key) => {
    console.log(`Student ${key} : ${student[key]}`);
};
/**
 * * Benefit: using string literal type for shorter syntax
 * !less flexibilty to declare a new prop that allways be string or something else
 */
const monthlyIncomes = {
    'salary': 5,
    'bonus': 6,
    'sidehustle': 0
};
for (const income in monthlyIncomes) {
    console.log(`${income} : ${monthlyIncomes[income]}`);
}
/**-------[generics]----------------- */
const stringEcho = (arg) => arg;
const echo = (arg) => arg;
/**
 * T is een generiek type par4ameter
 * T zit vast aan de functie en dus function scoped
 * T wordt bepaalde als de functie wordt aangeroepen op  basis van de arg
 */
const isObj = (arg) => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null);
};
const isTrue = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false };
    }
    if (isObj(arg) && arg !== null && !Object.keys(arg).length) {
        return { arg, is: false };
    }
    return { arg, is: !!arg };
};
const checkBoolValue = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { value: arg, is: false };
    }
    if (isObj(arg) && arg !== null && !Object.keys(arg).length) {
        return { value: arg, is: false };
    }
    return { value: arg, is: !!arg };
};
const processUser = (user) => {
    return user;
};
/**
 * important note the {} in a interface belonngs to the interface and not to defiing a object
 * however interfaces only works with object
 * So a interface is a blueprint voor object en works only with objects
 * a array can aslo pass ass a object
 *
 */
const getUsersProperty = (users, key) => {
    return users.map(user => user[key]);
};
console.log(getUsersProperty(users, "email"));
console.log(getUsersProperty(users, "username"));
class StateObject {
    constructor(value) {
        this.data = value;
    }
    set state(value) {
        this.data = value;
    }
    get state() {
        return this.data;
    }
}
const store = new StateObject("John");
store.state = "Dave";
const myNewState = new StateObject([1, 2, 3, "four"]);
myNewState.state = [...myNewState.state, 5];
console.log(myNewState.state);
