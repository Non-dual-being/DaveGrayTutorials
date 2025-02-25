// Type alliases

type stringOrnumber = string | number;
type stringOrnumberArray = stringOrnumber [];

type Guitarist = {
    name? : string,
    active: boolean,
    albums: stringOrnumberArray
};

type UserId = stringOrnumber

// literal types

let myName = 'Kevin';

let username2: 'Kevin'  |'Koen'| 'nobody' | undefined

// functions
const add = (a: number, b: number): number => {
    return a + b
}

// no return = void
const logMsg = (message: any): void => {
    console.log (message)
}

//optional param

const addAll = (a: number, b: number, c?: number): number => {
    if (typeof c !== 'undefined') {
            return a + b + c}
    return a + b

}


type mathFunction = (a: number, b: number) => number;

let mulitply: mathFunction = function (c,d) {
    return c*d
}

// Rest Parameters

const total = (...nums: number[]): number => {
    return nums.reduce((prev, curr) => prev + curr)
}

const createError = (errMSG: string):never => {
    throw new Error (errMSG) //the never type is used for Errors en infite loops
}

const infinite = () => {
    let i: number = 1
    while (true) {
        i++
        if (i >100) break //void whithout the break never (cuz ininite loop is a error)
    }
}

const numberOrstring = (value: number | string): string => {
    if (typeof value === 'string') return 'string'
    if (typeof value === 'number') return 'number'
    return createError ('a number or string needs te be passed') // this is important cuz the return value needs to be a string and when the huser passes something invalid, this cannot happen
    
}

const greetGuitarist2 = (guitarist: Guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toLocaleUpperCase()!}`
    }
    return "Bonjourkes!"
}

//enums 

enum Grade2 {
    U = 1,
    D,
    C,
    B,
    A
};

console.log(Grade2.U); // A would be 5 now;


//type can have alliases , interfaces not

let userName2: 'Dave' | 'Eric Bol' | 'Patrick';

const add2 = (a: number, b: number): number => {
    return a + b
}

const logMsg2 = (message: any): void => {
    console.log(message);
}

logMsg(add(2,3));

let substract = function (c: number, d:number): number {
    return c-d;
}

type mathFunction2 = (a: number, b: number) => number

let mulitply2: mathFunction2 = function (c,d) {
    return c * d
}

logMsg(mulitply2(2,2));

interface mathFunction3 {
    (a: number, b:  number): number
}

// optional parameters

const addAll2 = (a: number, b:number, c:number): number => {
    return a + b + c
}

const addAll3 = (a: number, b:number, c?:number): number => {
    if (typeof c !== 'undefined') {
        return a + b + c
    }

    return a + b;

    // optional params need te be add the end
}

const addAll4 = (a: number, b:number, c: number = 2): number => {

    return a + b + c;

    // optional params need te be add the end
}


const addAll5 = (a: number = 10, b:number, c: number = 2): number => {

    return a + b + c;

    // optional params need te be add the end
}


logMsg(addAll5(undefined, 3));

// Rest Parameters
const total_spread = (...nums:number[]):number => {
    return nums.reduce((prev, curr) => prev + curr)
}

logMsg(total_spread(1,2,3,4,6));

const createError2 = (errMsg: string): never => {
    throw new Error(errMsg)
}

const numberOrstring2 = (value: number | string): string => {
    if (typeof value === 'string') return 'string';
    if (isNUmber(value)) return 'number';
    return createError ('this to make a string return type definite')
    
}

const isNUmber = (value: any): boolean => {
    return typeof value === 'number' ? true : false
}

type One = string;
type Two = string | number;
type Three = 'hello'

let a: One = 'hello'
let b = a as Two
let c = a as Three

let d = <One> 'world'
let e = <string | number> 'world'

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): (number | string) => {
    if (c === 'add') return a + b
    return "" + a + b
}

let myVal: string = addOrConcat(2,2, 'concat') as string

// Be carefull here ts sees no problem but addOrconcat will return a string here
let nextVal: number = addOrConcat(2,2, 'concat') as number

//forecasting
(10 as unknown) as string

const img = document.querySelector('img') as HTMLImageElement
const myImg = document.getElementById('#img') as HTMLImageElement

