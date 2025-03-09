/**type variables */

import { getModeForUsageLocation } from "typescript";
import users from "./users.js"; 

let username: string = "Foufke";
let a: number = 12;
let b: number = 6;
let c: number = 2;

let album: any;
album = '6';

let albumLabel: string | number;
albumLabel = 6;

const sum = (a: number, b: number) => {
    return a + b
}

let postId: string | number;
let isActive: number | boolean;

let re: RegExp = /\w+/g

/**type objects  */

let stringArr = ['imtem1','imtem2'];

let guitars = ['Strat', 'Les Paul', 5150];

let mixedData = ['EVH', 1984, true];

let bands: string[] = [];

let myTuple: [string, number, boolean] = ['Dave', 4, true];

let mixed = ['John', 1, false] //this mix type is of type (string | number | bolean)[]

// objects
let myObj: object;

myObj = {
    name: "Kevin",
    age: 35
}

let myObj2: object = [];

const exampleObj = {
    name: "maarten",
    age: 24,
    sex: "non-binair"
}

type Guitarist = {
    name: string,
    active: boolean,
    albums: (string | number)[]

}

let evh: Guitarist = {
    name: "eddie",
    active: false,
    albums: [1984, 5150, "OUB12"]
}

type Guitarist2 = {
    name: string,
    active?: boolean,
    albums: (string | number)[]
}

let evh2: Guitarist2 = {
    name: "Alko",
    albums: ['GFort Rocks']
}

const greetGuitarist = (guitarist: Guitarist) => {
    return `Hello ${guitarist.name}`
}

let foufke: Guitarist = {
    name: "Alko",
    active: true,
    albums: ["excel for live", 69, "word in mc"]
}

interface GuitaristInter {
    name?: string,
    active: boolean,
    albums: (string | number)[]
}

const greetGuitaristInter = (guitarist: GuitaristInter) => {
    return `Hello ${guitarist.name?.trim()}`
}
const greetGuitaristInter2 = (guitarist: GuitaristInter) => {
    if (guitarist.name){
        return `Hello ${guitarist.name?.trim()}`
    }
    return 'Hello Guitarist without no name'
}

//enums 
enum Grade {
    U,
    D,
    C,
    B,
    A
} 

//grade.U = 0

enum Grade2 {
    U = 1,
    D,
    C,
    B,
    A
}

//grade2.D = 2

//Type Aliases
type stringOrNumber = string | number

type stringOrNumberArray = (string | number)[]

type GuitaristAlias = {
    name?: string,
    active: boolean,
    albums: stringOrNumberArray
}

//With inferfaces this alias usage is not posible

let myName: 'Dave' // explicit type 'Dave'

let userName: 'Dave' | 'John' | 'Amy' //literal union type

const add = (a: number, b: number): number => {
    return a + b
}

const logMsg = (message: any): void => {
    console.log(message)
}

type mathFunction = (a: number, b: number) => number
interface mathFunctionInter {
    (a: number, b: number): number
}

let multypy: mathFunction = (a, b) => {return a * b};

type mathFunction2 = (a: number, b: number, c: number) => number;

const addAll = (a: number, b:number, c:number): number => {
    return a + b + c
};

const addAll2: mathFunction2 = (a, b, c) => {return a + b + c}

type mathFunction3 = (a?: number, b?:number, c?: number) => (void | number)

const add3numbers: mathFunction3 = (a?, b?, c?) => {
    if (!a && !b && !c) return

    return [a, b, c]
    .filter((num): num is number => typeof num === "number")
    .reduce((sum, num) => sum + num, 0)
}

const total = (...nums: number[]): number => {
    return nums.reduce((prev, curr) => prev + curr)
}

/**
 * !the ... is not a spread operator here, 
 * *but a rest operator
 * this is so cuz is used inside the paramslist
 * 
 * */

const createError = (errMsg: string): never => {
    throw new Error(errMsg)
}

const infinite = () => {
    let i: number = 1
    while (true) {
        i++
        if (i > 100) break
    }
}

const numberOrString = (value: (number | string)): string => {
        if (typeof value === 'string'){
            return 'string'} 
        else if (typeof value === 'number'){
            return 'number'
        } else {
            return "pass in a number or string, but nothing else"
        }
}
const numberOrString2 = (value: (number | string)): string => {
        if (typeof value === 'string'){
            return 'string'} 
        else if (isNumber(value)){
            return 'number'
        } else {
            throw new Error ('Please provide a number or string')
        }
}

const isNumber = (value: any): boolean => {
    return typeof value === 'number' ? true : false
}

type One = string
type Two = string | number
type Three = 'hello'

// convert to more ore less specific

let a1: One = 'hello'
let b2 = a1 as Two
let c3 = a1 as Three 


// this type of syntax is not avaliable in react
let d = <One>'world'
let d2 = <Two> 6

const addOrConcat = (a: number, b: number, c: ('add' | 'concat')): (number | string) => {
    if (c === 'add'){
        return a + b
    } else if (c === 'concat'){
        return "" + a + b
    } else {
        throw new Error('please make use of add of concat')
    }
}


(10 as unknown) as string //double casting (however this overrruling is no recommended)

//assertion are usefull in the dom
const img: (HTMLImageElement | null) = document.querySelector('img')  //non null assertion
const myImg = document.getElementById('#img') as HTMLImageElement 

img?.src


class coder {
    name: string
    music: string
    age: number
    lang: string

    constructor(
        name: string,
        music: string,
        age: number,
        lang: string

    ){
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;

    }
}

//visibily modifiers

class Coder2 {
    secondLang!: string //non null assertion

    constructor(
        public readonly name: string,
        public music: string,
        private age: number,
        protected lang: string = ""
    ){
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }

    public getAge(){
        return `Hello, I'm ${this.age}`
    }
}

const Dave = new Coder2('Dave', 'Rock', 42, 'TypeScript')

/**
 * private means it can only be accesed troughh class
 * protected means it can be accesed trough the class and sub extended classes
 */

Dave.getAge() // this is trough class
// Dave.age // this is not possible cuz of privagte

class WebDev extends Coder2 {
    constructor(
        public computer: string,
        name: string,
        music: string,
        age: number,
    ){
        //super most come first
        super(name, music, age)
        this.computer = computer
    }
    public getLang(){
        return this.lang
        ? `I write ${this.lang}`
        : 'No language was provided'
    }

}

const Sara = new WebDev('Mac', 'Sara', 'Vieze Asbak', 25)
console.log(Sara.getLang())

interface Musician {
    name: string,
    instrument: string,
    play(action: string): string
}

class myGuitarist implements Musician {
    name: string
    instrument: string;

    constructor(name: string, instrument:string){
        this.name = name;
        this.instrument = instrument;
    }

    public play(action: string = "play"){
        return `I ${action} my ${this.instrument}`
        
    }
}

class counter {
    static count: number

    static getCount(){
        return counter.count
    }

    public id: number
    
    constructor(public name: string) {
        this.name = name
        this.id = ++counter.count //this will ensure dat counter.count goes + 1 first before id is assigned
        
    }
}

class bands2 {
    private dataState: string[]

    constructor(){
        this.dataState = []
    }

    public get data (): string[]{
        return this.dataState
    }
    //setters most be a void return
    public set data(value: string[]){
        if (Array.isArray(value) && value.every((data) => typeof data === 'string')){
            value.forEach((data) => this.dataState.push(data))
            return;
        } else {
            throw new Error('this needs to be array full of strings')
        }
    }
}

const myBand = new bands2();
myBand.data = ['vieze asbak', 'lil kleine'];
myBand.data = [...myBand.data, 'klein orkest']


interface TransactionObj {
    Pizza: number,
    Books: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50
}

//-----------[dynamic acces]--------------///

let prop: string = 'Pizza'
/*
*console.log(todaysTransactions[prop])
!wont work no index signature
*/

const todaysNet = (transactions: TransactionObj): number => {
    let total = 0;
    for (const transaction in transactions){
        total +=transactions[transaction as keyof TransactionObj]
    }
    return total

}

/**with index signature */

interface TransactionObj2 {
    [index: string]: number
}

const todaysTransactions2: TransactionObj2 = {
    Pizza: -10,
    Books: -5,
    Job: 50
}

const todaysNet2 = (transactions: TransactionObj2): number => {
    let total = 0;
    for (const transaction in transactions){
        total +=transactions[transaction]
    }
    return total
}

/**both index signature and define of keys */

interface TransactionObj3 {
    [index: string]: number

    Pizza: -10,
    Books: -5,
    Job: 50
}

/**-------------[]------------------- */

interface Student {
    //index signature
    [key: string]: string | number | number[] | undefined
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
};

for (const key in student){
    console.log(`${key} : ${student[key]}`);
}

interface Student2{
    name: string,
    GPA: number,
    classes?: number[]

}
const studenttwo: Student2 = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
};


for (const key in studenttwo){
    console.log(`${key} : ${studenttwo[key as keyof Student2]}`);
}

/**as keyof creates a union type of the keys */

Object.keys(studenttwo).map(key => {
    console.log(`${key} : ${studenttwo[key as keyof typeof studenttwo]}`)
})

/**get the type with typeof */

const logStudentKey = (student: Student2, key: keyof Student2): void => {
    console.log(`Student ${key} : ${student[key]}`);
};

/**--------------[]----------------- */

interface Incomes {
    [key: string]: number | undefined | 'regular' | 'freelance' | 'passive' 
    'salary': number,
    'bonus' : number,
    'sidehustle' : number,
    'Type'? : 'regular' | 'regular' | 'passive'

}

type Streams = 'salary' | 'bonus' | 'sidehustle'

type Incomes2 = Record<Streams, number> //index signatures with diff syntax

/**
 * * Benefit: using string literal type for shorter syntax
 * !less flexibilty to declare a new prop that allways be string or something else
 */

const monthlyIncomes: Incomes2 = {
    'salary': 5,
    'bonus' : 6,
    'sidehustle' : 0

}

for (const income in monthlyIncomes) {
      console.log(`${income} : ${monthlyIncomes[income as keyof Incomes2]}`)
}

/**-------[generics]----------------- */
const stringEcho = (arg: string): string => arg

const echo = <T>(arg: T): T => arg

interface BoolCheck<T> {
    value: T,
    is: boolean
}

/**
 * T is een generiek type par4ameter
 * T zit vast aan de functie en dus function scoped
 * T wordt bepaalde als de functie wordt aangeroepen op  basis van de arg
 */

const isObj = <T>(arg: T): boolean => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}

const isTrue = <T>(arg: T): { arg: T, is: boolean } => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false}
    }

    if (isObj(arg) && arg !==null && !Object.keys(arg as object).length){
        return {arg, is: false}
    }
    return { arg, is: !!arg }
}
const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
    if (Array.isArray(arg) && !arg.length) {
        return { value: arg, is: false}
    }

    if (isObj(arg) && arg !==null && !Object.keys(arg as object).length){
        return {value: arg, is: false}
    }
    return { value: arg, is: !!arg }
}

/**
 * FE: empty array false will turn true en both condition in the if statement will be true so it wil return false
 * arg is shorthand for arg : arg
 * the !! makes sures your return a bookean so a empy string is considerd false zo you get first true en then agian false
 */



interface HasID {
    id: number
}

const processUser = <T extends HasID>(user: T): T => {
    return user

}



/**
 * important note the {} in a interface belonngs to the interface and not to defiing a object
 * however interfaces only works with object
 * So a interface is a blueprint voor object en works only with objects
 * a array can aslo pass ass a object
 * 
 */

const getUsersProperty = <T extends HasID, K extends keyof T> (users: T[], key: K): T[K][] => {
    return users.map(user => user[key])
}

console.log(getUsersProperty(users, "email"));
console.log(getUsersProperty(users, "username") );

class StateObject<T> {
    private data: T

    constructor(value: T){
        this.data = value
    }

    set state(value: T) {
        this.data = value
    }

    get state(){
        return this.data
    }
}

const store = new StateObject("John")
store.state = "Dave"

const myNewState = new StateObject<(string | number)[]>([1, 2, 3, "four"]);
myNewState.state = [...myNewState.state, 5];

console.log(myNewState.state)






