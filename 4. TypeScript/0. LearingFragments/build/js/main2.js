"use strict";
// Type alliases
// literal types
let myName = 'Kevin';
let username2;
// functions
const add = (a, b) => {
    return a + b;
};
// no return = void
const logMsg = (message) => {
    console.log(message);
};
//optional param
const addAll = (a, b, c) => {
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
let mulitply = function (c, d) {
    return c * d;
};
// Rest Parameters
const total = (...nums) => {
    return nums.reduce((prev, curr) => prev + curr);
};
const createError = (errMSG) => {
    throw new Error(errMSG); //the never type is used for Errors en infite loops
};
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100)
            break; //void whithout the break never (cuz ininite loop is a error)
    }
};
const numberOrstring = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (typeof value === 'number')
        return 'number';
    return createError('a number or string needs te be passed'); // this is important cuz the return value needs to be a string and when the huser passes something invalid, this cannot happen
};
const greetGuitarist2 = (guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toLocaleUpperCase()}`;
    }
    return "Bonjourkes!";
};
//enums 
var Grade2;
(function (Grade2) {
    Grade2[Grade2["U"] = 1] = "U";
    Grade2[Grade2["D"] = 2] = "D";
    Grade2[Grade2["C"] = 3] = "C";
    Grade2[Grade2["B"] = 4] = "B";
    Grade2[Grade2["A"] = 5] = "A";
})(Grade2 || (Grade2 = {}));
;
console.log(Grade2.U); // A would be 5 now;
//type can have alliases , interfaces not
let userName2;
const add2 = (a, b) => {
    return a + b;
};
const logMsg2 = (message) => {
    console.log(message);
};
logMsg(add(2, 3));
let substract = function (c, d) {
    return c - d;
};
let mulitply2 = function (c, d) {
    return c * d;
};
logMsg(mulitply2(2, 2));
// optional parameters
const addAll2 = (a, b, c) => {
    return a + b + c;
};
const addAll3 = (a, b, c) => {
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
    // optional params need te be add the end
};
const addAll4 = (a, b, c = 2) => {
    return a + b + c;
    // optional params need te be add the end
};
const addAll5 = (a = 10, b, c = 2) => {
    return a + b + c;
    // optional params need te be add the end
};
logMsg(addAll5(undefined, 3));
// Rest Parameters
const total_spread = (...nums) => {
    return nums.reduce((prev, curr) => prev + curr);
};
logMsg(total_spread(1, 2, 3, 4, 6));
const createError2 = (errMsg) => {
    throw new Error(errMsg);
};
const numberOrstring2 = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (isNUmber(value))
        return 'number';
    return createError('this to make a string return type definite');
};
const isNUmber = (value) => {
    return typeof value === 'number' ? true : false;
};
let a = 'hello';
let b = a;
let c = a;
let d = 'world';
let e = 'world';
const addOrConcat = (a, b, c) => {
    if (c === 'add')
        return a + b;
    return "" + a + b;
};
let myVal = addOrConcat(2, 2, 'concat');
// Be carefull here ts sees no problem but addOrconcat will return a string here
let nextVal = addOrConcat(2, 2, 'concat');
//forecasting
10;
const img = document.querySelector('img');
const myImg = document.getElementById('#img');
