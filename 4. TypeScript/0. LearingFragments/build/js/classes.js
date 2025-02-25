"use strict";
class Coder {
    name;
    music;
    age;
    lang;
    constructor(name, music, age, lang = 'Typescript' //can get acces also trough derived classes
    ) {
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
        return `Hello, I'm ${this.age} year's old`;
    }
}
const Dave = new Coder('Dave', 'Rock', 42);
class WebDev extends Coder {
    computer;
    constructor(computer, name, music, age) {
        super(name, music, age); // this has to be on the top
        this.computer = computer;
        this.computer = computer;
    }
    getLanquage() {
        return `My coding lanquage is ${this.lang}`;
    }
}
const chefke = new WebDev('Asus', 'Kevin', 'spot', 2);
console.log(chefke.getLanquage());
class Guitarist_interface {
    name;
    instrument;
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    play(action) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}
const Page = new Guitarist_interface('Jimmy', 'Guitar');
console.log(Page.play('eats'));
/******** */
class Peeps {
    name;
    static count = 0; // static means it belongs to the class
    static getCount() {
        return Peeps.count;
    }
    id;
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count; //count will we be added first and wil be 1, the plus ++ in front makes sure its is one
    }
}
const John = new Peeps('John');
const Steve = new Peeps('Steve');
const AmylovesEric = new Peeps('Grabbelton');
//************** */
class Bands {
    dataState;
    constructor() {
        this.dataState = [];
    }
    get data() {
        return this.dataState;
    }
    set data(value) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.dataState = value;
            return;
        }
        else
            throw new Error('Param is not an array of strings');
    }
}
const MyBands = new Bands();
MyBands.data = ['Niel Young', 'Led Zep'];
console.log(MyBands.data);
MyBands.data = [...MyBands.data, 'ZZ Top'];
